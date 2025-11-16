const { createClient } = require('@supabase/supabase-js');
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Download file from URL
async function downloadFile(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(filepath);

    protocol.get(url, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        // Follow redirect
        file.close();
        fs.unlinkSync(filepath);
        return downloadFile(response.headers.location, filepath)
          .then(resolve)
          .catch(reject);
      }

      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

// Get file extension from URL
function getExtension(url) {
  const match = url.match(/\.(mp4|webm|mov|jpg|jpeg|png|gif)(\?|$)/i);
  return match ? match[1] : 'jpg';
}

async function migrateMedia() {
  console.log('📦 Instagram 미디어 마이그레이션 시작...\n');

  // Fetch all posts
  const { data: posts, error } = await supabase
    .from('instagram_posts')
    .select('*')
    .eq('published', true);

  if (error) {
    console.error('❌ Error fetching posts:', error);
    return;
  }

  console.log(`총 ${posts.length}개 게시물 처리 중...\n`);

  for (const post of posts) {
    console.log(`\n🔄 [${post.slug}] 처리 중...`);

    const updates = {};
    let needsUpdate = false;

    // Process thumbnail
    if (post.thumbnail_url && post.thumbnail_url.includes('prod-files-secure.s3')) {
      console.log('  📥 Thumbnail 다운로드 중...');

      try {
        const ext = getExtension(post.thumbnail_url);
        const filename = `${post.slug}-thumb.${ext}`;
        const tempPath = `/tmp/${filename}`;

        await downloadFile(post.thumbnail_url, tempPath);

        // Upload to Supabase Storage
        const fileBuffer = fs.readFileSync(tempPath);
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('instagram-media')
          .upload(filename, fileBuffer, {
            contentType: ext === 'mp4' ? 'video/mp4' : `image/${ext}`,
            upsert: true
          });

        if (uploadError) {
          console.error('  ❌ Upload error:', uploadError);
        } else {
          const { data: { publicUrl } } = supabase.storage
            .from('instagram-media')
            .getPublicUrl(filename);

          updates.thumbnail_url = publicUrl;
          needsUpdate = true;
          console.log('  ✅ Thumbnail 업로드 완료');
        }

        // Clean up
        fs.unlinkSync(tempPath);
      } catch (err) {
        console.error('  ❌ Thumbnail 처리 실패:', err.message);
      }
    }

    // Process images array
    if (post.images && Array.isArray(post.images) && post.images.length > 0) {
      console.log(`  📥 ${post.images.length}개 이미지 처리 중...`);

      const newImages = [];

      for (let i = 0; i < post.images.length; i++) {
        const imageUrl = post.images[i];

        if (imageUrl && imageUrl.includes('prod-files-secure.s3')) {
          try {
            const ext = getExtension(imageUrl);
            const filename = `${post.slug}-${i}.${ext}`;
            const tempPath = `/tmp/${filename}`;

            await downloadFile(imageUrl, tempPath);

            const fileBuffer = fs.readFileSync(tempPath);
            const { data: uploadData, error: uploadError } = await supabase.storage
              .from('instagram-media')
              .upload(filename, fileBuffer, {
                contentType: ext === 'mp4' ? 'video/mp4' : `image/${ext}`,
                upsert: true
              });

            if (uploadError) {
              console.error(`  ❌ Image ${i} upload error:`, uploadError);
              newImages.push(imageUrl); // Keep original
            } else {
              const { data: { publicUrl } } = supabase.storage
                .from('instagram-media')
                .getPublicUrl(filename);

              newImages.push(publicUrl);
              console.log(`  ✅ Image ${i} 업로드 완료`);
            }

            fs.unlinkSync(tempPath);
          } catch (err) {
            console.error(`  ❌ Image ${i} 처리 실패:`, err.message);
            newImages.push(imageUrl); // Keep original
          }
        } else {
          newImages.push(imageUrl); // Keep as is
        }
      }

      if (newImages.length > 0) {
        updates.images = newImages;
        needsUpdate = true;
      }
    }

    // Update database
    if (needsUpdate) {
      const { error: updateError } = await supabase
        .from('instagram_posts')
        .update(updates)
        .eq('id', post.id);

      if (updateError) {
        console.error('  ❌ Database update failed:', updateError);
      } else {
        console.log('  💾 데이터베이스 업데이트 완료');
      }
    } else {
      console.log('  ⏭️  업데이트 불필요');
    }
  }

  console.log('\n\n✅ 마이그레이션 완료!');
}

migrateMedia().catch(console.error);
