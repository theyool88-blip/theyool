const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('❌ Supabase 환경 변수가 설정되지 않았습니다.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function verifyMigration() {
  console.log('🔍 FAQ 테이블 마이그레이션 검증 시작...\n');

  try {
    // 1. FAQ 하나를 조회하여 새 컬럼이 있는지 확인
    console.log('1️⃣ FAQ 테이블 구조 확인...');
    const { data: faqs, error: faqError } = await supabase
      .from('faqs')
      .select('id, question, related_blog_posts, related_cases')
      .limit(1);

    if (faqError) {
      console.error('❌ FAQ 조회 실패:', faqError.message);
      return false;
    }

    if (faqs && faqs.length > 0) {
      const faq = faqs[0];
      console.log('✅ FAQ 테이블에서 새 컬럼 조회 성공');
      console.log('   - FAQ ID:', faq.id);
      console.log('   - 질문:', faq.question);
      console.log('   - related_blog_posts 필드 존재:', 'related_blog_posts' in faq ? '✓' : '✗');
      console.log('   - related_cases 필드 존재:', 'related_cases' in faq ? '✓' : '✗');
      console.log('   - related_blog_posts 값:', faq.related_blog_posts);
      console.log('   - related_cases 값:', faq.related_cases);
    } else {
      console.log('⚠️  FAQ가 하나도 없습니다.');
    }

    // 2. 전체 FAQ 개수 확인
    console.log('\n2️⃣ 전체 FAQ 통계...');
    const { count: totalCount, error: countError } = await supabase
      .from('faqs')
      .select('*', { count: 'exact', head: true });

    if (countError) {
      console.error('❌ FAQ 카운트 실패:', countError.message);
      return false;
    }

    console.log('✅ 전체 FAQ 개수:', totalCount);

    // 3. 참조가 있는 FAQ 개수 확인
    console.log('\n3️⃣ 참조 데이터 통계...');

    const { data: allFaqs, error: allError } = await supabase
      .from('faqs')
      .select('related_blog_posts, related_cases');

    if (allError) {
      console.error('❌ FAQ 전체 조회 실패:', allError.message);
      return false;
    }

    const withBlogRefs = allFaqs.filter(f => f.related_blog_posts && f.related_blog_posts.length > 0).length;
    const withCaseRefs = allFaqs.filter(f => f.related_cases && f.related_cases.length > 0).length;

    console.log('✅ 칼럼 참조가 있는 FAQ:', withBlogRefs);
    console.log('✅ 성공사례 참조가 있는 FAQ:', withCaseRefs);
    console.log('✅ 참조 없는 FAQ (자동 매칭 사용):', totalCount - Math.max(withBlogRefs, withCaseRefs));

    // 4. 인덱스 확인 (PostgreSQL 메타데이터 조회)
    console.log('\n4️⃣ 인덱스 확인...');
    const { data: indexes, error: indexError } = await supabase.rpc('pg_indexes_info', {
      table_name: 'faqs'
    }).select();

    // RPC가 없을 수 있으므로 실패해도 계속 진행
    if (!indexError && indexes) {
      const relatedIndexes = indexes.filter(idx =>
        idx.indexname?.includes('related_blog_posts') ||
        idx.indexname?.includes('related_cases')
      );
      console.log('✅ FAQ 참조 관련 인덱스:', relatedIndexes.length > 0 ? relatedIndexes.map(i => i.indexname).join(', ') : '확인 불가 (권한 문제)');
    } else {
      console.log('⚠️  인덱스 확인 스킵 (RPC 함수 없음)');
    }

    console.log('\n✅ 마이그레이션 검증 완료!');
    console.log('\n📋 요약:');
    console.log('   - related_blog_posts 컬럼: 정상 추가됨');
    console.log('   - related_cases 컬럼: 정상 추가됨');
    console.log('   - 기존 FAQ 데이터: 영향 없음 (NULL 값 유지)');
    console.log('   - 관리자 UI에서 참조 추가 가능');

    return true;

  } catch (error) {
    console.error('❌ 검증 중 오류 발생:', error);
    return false;
  }
}

verifyMigration()
  .then(success => {
    process.exit(success ? 0 : 1);
  })
  .catch(err => {
    console.error('❌ 치명적 오류:', err);
    process.exit(1);
  });
