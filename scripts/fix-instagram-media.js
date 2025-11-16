const { createClient } = require('@supabase/supabase-js');
const { Client } = require('@notionhq/client');
const https = require('https');
const http = require('http');
const fs = require('fs');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const notion = new Client({ auth: process.env.NOTION_TOKEN });

// Download file with proper error handling
async function downloadFile(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(filepath);
    let downloadedBytes = 0;

    const request = protocol.get(url, (response) => {
      // Handle redirects
      if (response.statusCode === 302 || response.statusCode === 301) {
        file.close();
        fs.unlinkSync(filepath);
        return downloadFile(response.headers.location, filepath)
          .then(resolve)
          .catch(reject);
      }

      if (response.statusCode !== 200) {
        file.close();
        fs.unlinkSync(filepath);
        return reject(new Error(`HTTP ${response.statusCode}: ${url}`));
      }

      response.on('data', (chunk) => {
        downloadedBytes += chunk.length;
      });

      response.pipe(file);

      file.on('finish', () => {
        file.close();
        console.log(`    ✓ Downloaded ${(downloadedBytes / 1024).toFixed(1)} KB`);

        // Verify file size
        if (downloadedBytes < 1000) {
          fs.unlinkSync(filepath);
          reject(new Error(`File too small: ${downloadedBytes} bytes`));
        } else {
          resolve(downloadedBytes);
        }
      });

      file.on('error', (err) => {
        file.close();
        fs.unlinkSync(filepath);
        reject(err);
      });
    });

    request.on('error', (err) => {
      file.close();
      fs.unlinkSync(filepath);
      reject(err);
    });

    request.setTimeout(30000, () => {
      request.destroy();
      file.close();
      fs.unlinkSync(filepath);
      reject(new Error('Download timeout'));
    });
  });
}

// Get file extension from URL
function getExtension(url) {
  const match = url.match(/\.(mp4|webm|mov|jpg|jpeg|png|gif)(\?|$)/i);
  return match ? match[1] : 'jpg';
}

// Fetch fresh URLs from Notion
async function fetchNotionImageUrls(notionId) {
  try {
    const page = await notion.pages.retrieve({ page_id: notionId });

    if (!('properties' in page)) {
      return [];
    }

    const properties = page.properties;
    const fileProps = [
      properties.썸네일?.files,
      properties.이미지?.files,
      properties.thumbnail?.files,
      properties.images?.files,
    ].filter(Boolean);

    const files = fileProps.flat();

    return files
      .map((file) => file?.file?.url || file?.external?.url)
      .filter((url) => Boolean(url));
  } catch (error) {
    console.error('    ❌ Notion API error:', error.message);
    return [];
  }
}

async function fixMedia() {
  console.log('🔧 Instagram 미디어 복구 시작...\n');

  // Fetch all posts with notion_id
  const { data: posts, error } = await supabase
    .from('instagram_posts')
    .select('*')
    .not('notion_id', 'is', null)
    .eq('published', true);

  if (error) {
    console.error('❌ Error fetching posts:', error);
    return;
  }

  console.log(`총 ${posts.length}개 게시물 처리 중...\n`);

  let successCount = 0;
  let failCount = 0;

  for (const post of posts) {
    console.log(`\n🔄 [${post.slug}] 처리 중...`);
    console.log(`  Notion ID: ${post.notion_id}`);

    try {
      // Fetch fresh URLs from Notion
      const notionUrls = await fetchNotionImageUrls(post.notion_id);

      if (notionUrls.length === 0) {
        console.log('  ⚠️  Notion에서 이미지를 찾을 수 없습니다.');
        failCount++;
        continue;
      }

      console.log(`  📥 ${notionUrls.length}개 이미지 발견`);

      const updates = {};
      let needsUpdate = false;

      // Process thumbnail (first image)
      const thumbnailUrl = notionUrls[0];
      try {
        const ext = getExtension(thumbnailUrl);
        const filename = `${post.slug}-thumb.${ext}`;
        const tempPath = `/tmp/${filename}`;

        console.log(`  📥 Thumbnail 다운로드 중...`);
        await downloadFile(thumbnailUrl, tempPath);

        // Upload to Supabase
        const fileBuffer = fs.readFileSync(tempPath);
        const { error: uploadError } = await supabase.storage
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

        fs.unlinkSync(tempPath);
      } catch (err) {
        console.error('  ❌ Thumbnail 처리 실패:', err.message);
      }

      // Process all images
      const newImages = [];

      for (let i = 0; i < notionUrls.length; i++) {
        const imageUrl = notionUrls[i];

        try {
          const ext = getExtension(imageUrl);
          const filename = `${post.slug}-${i}.${ext}`;
          const tempPath = `/tmp/${filename}`;

          console.log(`  📥 Image ${i + 1}/${notionUrls.length} 다운로드 중...`);
          await downloadFile(imageUrl, tempPath);

          const fileBuffer = fs.readFileSync(tempPath);
          const { error: uploadError } = await supabase.storage
            .from('instagram-media')
            .upload(filename, fileBuffer, {
              contentType: ext === 'mp4' ? 'video/mp4' : `image/${ext}`,
              upsert: true
            });

          if (uploadError) {
            console.error(`  ❌ Image ${i} upload error:`, uploadError);
          } else {
            const { data: { publicUrl } } = supabase.storage
              .from('instagram-media')
              .getPublicUrl(filename);

            newImages.push(publicUrl);
            console.log(`  ✅ Image ${i + 1} 업로드 완료`);
          }

          fs.unlinkSync(tempPath);
        } catch (err) {
          console.error(`  ❌ Image ${i} 처리 실패:`, err.message);
        }
      }

      if (newImages.length > 0) {
        updates.images = newImages;
        needsUpdate = true;
      }

      // Update database
      if (needsUpdate) {
        const { error: updateError } = await supabase
          .from('instagram_posts')
          .update(updates)
          .eq('id', post.id);

        if (updateError) {
          console.error('  ❌ Database update failed:', updateError);
          failCount++;
        } else {
          console.log('  💾 데이터베이스 업데이트 완료');
          successCount++;
        }
      } else {
        failCount++;
      }
    } catch (err) {
      console.error('  ❌ 전체 프로세스 실패:', err.message);
      failCount++;
    }
  }

  console.log('\n\n✅ 복구 완료!');
  console.log(`  성공: ${successCount}개`);
  console.log(`  실패: ${failCount}개`);
}

fixMedia().catch(console.error);
