/**
 * FAQ 테이블 스키마 업데이트 - 15개 카테고리 지원
 */

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function updateSchema() {
  console.log('🔧 FAQ 테이블 스키마 업데이트 시작\n');

  try {
    // 1. 기존 제약조건 제거
    console.log('1️⃣ 기존 CHECK 제약조건 제거 중...');
    const { error: dropError } = await supabase.rpc('exec_sql', {
      sql: `
        DO $$
        BEGIN
            IF EXISTS (
                SELECT 1
                FROM pg_constraint
                WHERE conname = 'faqs_category_check'
                AND conrelid = 'public.faqs'::regclass
            ) THEN
                ALTER TABLE public.faqs DROP CONSTRAINT faqs_category_check;
                RAISE NOTICE 'Dropped existing faqs_category_check constraint';
            END IF;
        END $$;
      `
    });

    if (dropError) {
      console.warn('⚠️  제약조건 제거 중 경고:', dropError.message);
    } else {
      console.log('✅ 기존 제약조건 제거 완료\n');
    }

    // 2. 새로운 15개 카테고리 제약조건 추가
    console.log('2️⃣ 새로운 15개 카테고리 제약조건 추가 중...');

    // SQL을 직접 실행할 수 없으므로, Supabase Studio에서 실행하도록 안내
    console.log('\n⚠️  Supabase에서는 ALTER TABLE을 직접 실행할 수 없습니다.');
    console.log('📝 Supabase Studio SQL Editor에서 다음 SQL을 실행하세요:\n');
    console.log('─'.repeat(60));
    console.log(`
-- 기존 제약조건 제거
ALTER TABLE public.faqs DROP CONSTRAINT IF EXISTS faqs_category_check;

-- 새로운 15개 카테고리 제약조건 추가
ALTER TABLE public.faqs
ADD CONSTRAINT faqs_category_check CHECK (
  category IN (
    'emergency',
    'domestic-violence',
    'divorce-process',
    'separation-expense',
    'evidence-collection',
    'adultery',
    'alimony',
    'custody',
    'child-support',
    'visitation',
    'property-division',
    'paternity',
    'post-divorce',
    'international-divorce',
    'legal-support'
  )
);

-- 인덱스 재구축
REINDEX INDEX idx_faqs_category;
    `);
    console.log('─'.repeat(60) + '\n');

    console.log('💡 Supabase Studio URL:');
    console.log('   https://supabase.com/dashboard/project/kqqyipnlkmmprfgygauk/sql/new\n');

    console.log('✅ SQL 스크립트가 준비되었습니다.');
    console.log('   위 SQL을 복사하여 Supabase Studio에서 실행하세요.\n');

  } catch (error) {
    console.error('❌ 스키마 업데이트 실패:', error);
    process.exit(1);
  }
}

updateSchema();
