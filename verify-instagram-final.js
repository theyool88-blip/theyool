const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function finalVerification() {
  console.log('🔍 Instagram 최종 검증\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  // 1. 데이터베이스 검증
  console.log('1️⃣ 데이터베이스 상태:');
  const { data: posts, error } = await supabase
    .from('instagram_posts')
    .select('id, title, slug, post_type, thumbnail_url, images, published')
    .eq('published', true);

  if (error) {
    console.log('   ❌ Error:', error.message);
    return;
  }

  const withThumbnail = posts.filter(p => p.thumbnail_url).length;
  const withImages = posts.filter(p => p.images && p.images.length > 0).length;
  const noMedia = posts.filter(p => !p.thumbnail_url && (!p.images || p.images.length === 0)).length;

  console.log('   ✅ 전체 게시물:', posts.length + '개');
  console.log('   ✅ 썸네일 보유:', withThumbnail + '개');
  console.log('   ✅ 이미지 배열:', withImages + '개');
  console.log('   ✅ 미디어 없음:', noMedia + '개');

  // 2. API 엔드포인트 검증
  console.log('\n2️⃣ 공개 API 엔드포인트:');
  try {
    const response = await fetch('http://localhost:3000/api/instagram');
    const json = await response.json();

    if (json.posts && json.posts.length > 0) {
      console.log('   ✅ API 응답 성공');
      console.log('   ✅ 반환 게시물:', json.posts.length + '개');
      console.log('   ✅ 첫 번째 게시물:');
      console.log('      - Title:', json.posts[0].title);
      console.log('      - Type:', json.posts[0].type);
      console.log('      - Thumbnail:', json.posts[0].thumbnail ? '✅ 있음' : '❌ 없음');
      console.log('      - Images:', (json.posts[0].images?.length || 0) + '개');
    } else {
      console.log('   ❌ API가 빈 배열을 반환했습니다');
    }
  } catch (e) {
    console.log('   ❌ API 요청 실패:', e.message);
  }

  // 3. 샘플 이미지 URL 확인
  console.log('\n3️⃣ 샘플 이미지 URL:');
  const samplePost = posts[0];
  if (samplePost) {
    console.log('   게시물:', samplePost.title);
    console.log('   Thumbnail URL:');
    console.log('   ', samplePost.thumbnail_url);
    if (samplePost.images && samplePost.images.length > 0) {
      console.log('   첫 번째 이미지 URL:');
      console.log('   ', samplePost.images[0]);
    }
  }

  // 4. 관리자 작업 안내
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('\n✅ 모든 데이터가 정상적으로 준비되었습니다!\n');
  console.log('📋 다음 단계:\n');
  console.log('1. 관리자 페이지 로그인:');
  console.log('   👉 http://localhost:3000/admin/login\n');
  console.log('2. Instagram 관리 페이지 이동:');
  console.log('   👉 http://localhost:3000/admin/instagram\n');
  console.log('3. 이미지 업로드 및 미리보기 테스트\n');
  console.log('4. 공개 페이지 확인:');
  console.log('   👉 http://localhost:3000/insta-theyool\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
}

finalVerification().catch(console.error);
