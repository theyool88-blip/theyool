require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

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
    .replace(/[^\w\-가-힣]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

async function addSlugColumn() {
  console.log('🚀 Instagram slug 컬럼 추가 및 데이터 생성\n');

  // 1. 모든 게시물 가져오기
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

  // 2. 각 게시물의 ID를 slug로 임시 사용
  console.log('📝 Step 2: 각 게시물에 slug 값 할당...\n');

  const updates = posts.map((post, index) => {
    const slug = post.title
      ? slugify(post.title).substring(0, 50) + `-${index + 1}`
      : `instagram-post-${index + 1}`;

    console.log(`   [${index + 1}/${posts.length}] ${post.title || post.id} → ${slug}`);

    return {
      id: post.id,
      slug: slug
    };
  });

  console.log(`\n✅ ${updates.length}개 slug 생성 완료\n`);
  console.log('슬러그 목록:');
  updates.forEach(u => console.log(`  - ${u.slug}`));

  console.log('\n⚠️  Supabase 대시보드에서 다음 SQL을 실행해주세요:\n');
  console.log('----------------------------------------');
  console.log('ALTER TABLE instagram_posts ADD COLUMN slug TEXT;');
  console.log('CREATE INDEX idx_instagram_slug ON instagram_posts(slug);');
  console.log('----------------------------------------\n');

  console.log('그 다음 이 스크립트를 다시 실행하여 slug 값을 업데이트하세요.');
  console.log('또는 아래 UPDATE 문들을 직접 실행하세요:\n');

  updates.forEach(u => {
    console.log(`UPDATE instagram_posts SET slug = '${u.slug}' WHERE id = '${u.id}';`);
  });
}

addSlugColumn()
  .then(() => {
    console.log('\n✅ 스크립트 완료!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ 실패:', error);
    process.exit(1);
  });
