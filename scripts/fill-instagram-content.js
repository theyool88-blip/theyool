const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function fillEmptyFields() {
  console.log('📋 Instagram 게시물 확인 중...\n');

  const { data: posts, error } = await supabase
    .from('instagram_posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('❌ Error fetching posts:', error);
    return;
  }

  let updatedCount = 0;

  for (const post of posts) {
    const updates = {};
    let needsUpdate = false;

    // 빈 제목 채우기
    if (!post.title || post.title.trim() === '') {
      if (post.post_type === '릴스') {
        updates.title = '더율 릴스';
      } else if (post.post_type === '일상') {
        updates.title = '법무법인 더율';
      } else {
        updates.title = post.post_type || '법무법인 더율';
      }
      needsUpdate = true;
      console.log(`[제목 추가] ${post.slug}: ${updates.title}`);
    }

    // 빈 캡션 채우기
    if (!post.caption || post.caption.trim() === '') {
      if (post.post_type === '릴스') {
        updates.caption = '법무법인 더율의 릴스 영상입니다. 이혼 전문 변호사의 법률 정보를 확인하세요.';
      } else {
        updates.caption = '법무법인 더율의 게시물입니다. 이혼 전문 변호사의 법률 정보와 성공사례를 공유합니다.';
      }
      needsUpdate = true;
      console.log(`[캡션 추가] ${post.slug}`);
    }

    if (needsUpdate) {
      const { error: updateError } = await supabase
        .from('instagram_posts')
        .update(updates)
        .eq('id', post.id);

      if (updateError) {
        console.error(`❌ Failed to update ${post.slug}:`, updateError);
      } else {
        updatedCount++;
      }
    }
  }

  console.log(`\n✅ ${updatedCount}개 게시물 업데이트 완료`);

  // 결과 확인
  const { data: updated } = await supabase
    .from('instagram_posts')
    .select('id, slug, title, caption, post_type')
    .eq('published', true)
    .limit(5);

  console.log('\n📊 업데이트된 게시물 샘플:');
  updated.forEach((p, i) => {
    console.log(`\n[${i+1}] ${p.slug}`);
    console.log(`  타입: ${p.post_type}`);
    console.log(`  제목: ${p.title}`);
    console.log(`  캡션: ${p.caption.substring(0, 50)}...`);
  });
}

fillEmptyFields().catch(console.error);
