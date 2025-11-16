const { Client } = require('@notionhq/client');
const { createClient } = require('@supabase/supabase-js');

// Notion 클라이언트
const notion = new Client({ auth: process.env.NOTION_API_KEY });
const INSTAGRAM_DB_ID = process.env.NOTION_INSTAGRAM_DB;

// Supabase 클라이언트
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Notion 속성 파싱
function parseInstagramPost(page) {
  const properties = page.properties;

  const title = properties.제목?.title?.[0]?.plain_text || '';
  const type = properties.타입?.select?.name || '일반';
  const linkedCaseId = properties.성공사례?.relation?.[0]?.id;
  const linkedBlogId = properties.변호사칼럼?.relation?.[0]?.id;

  // 모든 이미지를 배열로 가져오기
  const allFiles = properties.썸네일?.files || [];
  const images = allFiles
    .map(file => file?.file?.url || file?.external?.url)
    .filter(url => !!url);

  const thumbnail = images[0] || null;
  const caption = properties.캡션?.rich_text?.[0]?.plain_text || '';
  const views = properties.조회수?.number || 0;
  const likes = properties.좋아요수?.number || 0;
  const published = properties.공개?.checkbox || false;
  const postDate = properties.게시일?.date?.start || null;

  return {
    notion_id: page.id,
    title,
    post_type: type, // 'type' 대신 'post_type' 사용
    linked_case_id: linkedCaseId || null,
    linked_blog_id: linkedBlogId || null,
    thumbnail,
    images,
    caption,
    views,
    likes,
    published,
    post_date: postDate,
  };
}

async function migrateInstagramPosts() {
  console.log('🚀 Instagram 데이터 마이그레이션 시작...\n');

  try {
    // 1. Notion에서 모든 Instagram 게시물 가져오기
    console.log('📥 Notion에서 데이터 가져오는 중...');
    const response = await notion.databases.query({
      database_id: INSTAGRAM_DB_ID,
    });

    const posts = response.results.map(parseInstagramPost);
    console.log(`✅ ${posts.length}개의 게시물을 가져왔습니다.\n`);

    if (posts.length === 0) {
      console.log('⚠️  마이그레이션할 데이터가 없습니다.');
      return;
    }

    // 2. Supabase에 데이터 삽입 (upsert)
    console.log('💾 Supabase에 데이터 저장 중...');

    const { data, error } = await supabase
      .from('instagram_posts')
      .upsert(posts, {
        onConflict: 'notion_id', // notion_id가 같으면 업데이트
        ignoreDuplicates: false,
      })
      .select();

    if (error) {
      console.error('❌ Supabase 저장 실패:', error);
      throw error;
    }

    console.log(`✅ ${data?.length || posts.length}개의 게시물이 저장되었습니다.\n`);

    // 3. 마이그레이션 결과 요약
    console.log('📊 마이그레이션 결과:');
    console.log(`   총 게시물: ${posts.length}개`);
    console.log(`   공개 게시물: ${posts.filter(p => p.published).length}개`);
    console.log(`   비공개 게시물: ${posts.filter(p => !p.published).length}개`);
    console.log('\n타입별 분포:');
    const typeCount = posts.reduce((acc, post) => {
      acc[post.post_type] = (acc[post.post_type] || 0) + 1;
      return acc;
    }, {});
    Object.entries(typeCount).forEach(([type, count]) => {
      console.log(`   ${type}: ${count}개`);
    });

    console.log('\n✅ 마이그레이션 완료!');

  } catch (error) {
    console.error('❌ 마이그레이션 실패:', error);
    process.exit(1);
  }
}

// 실행
migrateInstagramPosts();
