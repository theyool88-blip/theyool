const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function clearTables() {
  console.log('🗑️  모든 테이블 데이터 삭제 중...\n');

  // Cases 테이블 비우기
  const { error: casesError } = await supabase
    .from('cases')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000');

  if (casesError) {
    console.error('❌ Cases 삭제 실패:', casesError.message);
  } else {
    console.log('✅ Cases 테이블 비우기 완료');
  }

  // Blog 테이블 비우기
  const { error: blogError } = await supabase
    .from('blog_posts')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000');

  if (blogError) {
    console.error('❌ Blog 삭제 실패:', blogError.message);
  } else {
    console.log('✅ Blog 테이블 비우기 완료');
  }

  // Instagram 테이블 비우기
  const { error: instagramError } = await supabase
    .from('instagram_posts')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000');

  if (instagramError) {
    console.error('❌ Instagram 삭제 실패:', instagramError.message);
  } else {
    console.log('✅ Instagram 테이블 비우기 완료');
  }

  console.log('\n✅ 모든 테이블 삭제 완료!\n');
}

clearTables().catch(console.error);
