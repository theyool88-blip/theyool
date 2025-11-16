require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function slugify(text) {
  if (!text) return `instagram-${Date.now()}`;
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(filepath);

    protocol.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve(filepath);
        });
      } else {
        reject(new Error(`Failed to download: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

async function uploadToSupabase(localPath, storagePath) {
  const fileBuffer = fs.readFileSync(localPath);
  const ext = path.extname(localPath).toLowerCase();

  let contentType = 'image/jpeg';
  if (ext === '.png') contentType = 'image/png';
  else if (ext === '.gif') contentType = 'image/gif';
  else if (ext === '.webp') contentType = 'image/webp';
  else if (ext === '.mp4') contentType = 'video/mp4';
  else if (ext === '.webm') contentType = 'video/webm';

  const { data, error } = await supabase.storage
    .from('instagram-media')
    .upload(storagePath, fileBuffer, {
      contentType,
      cacheControl: '31536000', // 1 year
      upsert: true
    });

  if (error) {
    console.error(`   ❌ Upload failed:`, error.message);
    return null;
  }

  const { data: { publicUrl } } = supabase.storage
    .from('instagram-media')
    .getPublicUrl(storagePath);

  return publicUrl;
}

async function migrateInstagram() {
  console.log('🚀 Instagram 완전 마이그레이션 시작\n');

  // 1. 모든 Instagram 게시물 가져오기
  console.log('📊 Step 1: 현재 Instagram 게시물 가져오기...');
  const { data: posts, error: fetchError } = await supabase
    .from('instagram_posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (fetchError) {
    console.error('❌ 게시물 조회 실패:', fetchError);
    return;
  }

  console.log(`   ✅ 총 ${posts.length}개 게시물 발견\n`);

  // 2. 임시 다운로드 폴더 생성
  const tempDir = path.join(process.cwd(), 'temp-instagram');
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  let updated = 0;
  let skipped = 0;
  let errors = 0;

  for (const [index, post] of posts.entries()) {
    console.log(`\n[${index + 1}/${posts.length}] Processing: ${post.title || post.id}`);

    try {
      // Slug 생성
      const slug = post.slug || slugify(post.title || `instagram-post-${index + 1}`);
      console.log(`   📝 Slug: ${slug}`);

      let newThumbnailUrl = post.thumbnail_url;
      let newImages = post.images || [];

      // Notion URL인 경우에만 다운로드 & 업로드
      if (post.thumbnail_url && post.thumbnail_url.includes('notion')) {
        console.log(`   📥 Downloading thumbnail...`);
        try {
          const ext = post.thumbnail_url.includes('.mp4') ? '.mp4' : '.jpg';
          const tempPath = path.join(tempDir, `${slug}-thumb${ext}`);
          await downloadImage(post.thumbnail_url, tempPath);

          console.log(`   ☁️  Uploading to Supabase Storage...`);
          const storagePath = `${slug}/thumbnail${ext}`;
          newThumbnailUrl = await uploadToSupabase(tempPath, storagePath);

          if (newThumbnailUrl) {
            console.log(`   ✅ Thumbnail: ${newThumbnailUrl}`);
          }

          fs.unlinkSync(tempPath);
        } catch (err) {
          console.error(`   ⚠️  Thumbnail migration failed:`, err.message);
        }
      }

      // images 배열 처리
      if (post.images && Array.isArray(post.images)) {
        const migratedImages = [];
        for (const [imgIndex, imgUrl] of post.images.entries()) {
          if (imgUrl && imgUrl.includes('notion')) {
            try {
              console.log(`   📥 Downloading image ${imgIndex + 1}/${post.images.length}...`);
              const ext = imgUrl.includes('.mp4') ? '.mp4' : '.jpg';
              const tempPath = path.join(tempDir, `${slug}-img${imgIndex}${ext}`);
              await downloadImage(imgUrl, tempPath);

              const storagePath = `${slug}/image-${imgIndex}${ext}`;
              const newUrl = await uploadToSupabase(tempPath, storagePath);

              if (newUrl) {
                migratedImages.push(newUrl);
                console.log(`   ✅ Image ${imgIndex + 1}: ${newUrl}`);
              } else {
                migratedImages.push(imgUrl); // 실패 시 원본 유지
              }

              fs.unlinkSync(tempPath);
            } catch (err) {
              console.error(`   ⚠️  Image ${imgIndex + 1} migration failed:`, err.message);
              migratedImages.push(imgUrl); // 실패 시 원본 유지
            }
          } else {
            migratedImages.push(imgUrl);
          }
        }
        newImages = migratedImages;
      }

      // DB 업데이트
      const updateData = {
        slug,
        thumbnail_url: newThumbnailUrl,
        images: newImages,
        updated_at: new Date().toISOString()
      };

      const { error: updateError } = await supabase
        .from('instagram_posts')
        .update(updateData)
        .eq('id', post.id);

      if (updateError) {
        console.error(`   ❌ Update failed:`, updateError.message);
        errors++;
      } else {
        console.log(`   ✅ Updated successfully`);
        updated++;
      }

    } catch (err) {
      console.error(`   ❌ Error:`, err.message);
      errors++;
    }
  }

  // 임시 폴더 정리
  try {
    fs.rmdirSync(tempDir, { recursive: true });
  } catch (err) {
    // ignore
  }

  console.log('\n' + '='.repeat(50));
  console.log(`✅ Updated: ${updated} posts`);
  console.log(`⏭️  Skipped: ${skipped} posts`);
  console.log(`❌ Errors: ${errors} posts`);
  console.log(`📊 Total: ${posts.length} posts`);
  console.log('='.repeat(50));
}

migrateInstagram()
  .then(() => {
    console.log('\n✅ Instagram 마이그레이션 완료!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ 마이그레이션 실패:', error);
    process.exit(1);
  });
