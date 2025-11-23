-- 15개 카테고리 지원을 위한 FAQ 테이블 업데이트
-- 2025-11-19

-- 기존 CHECK 제약조건 제거 (존재하는 경우)
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

-- 새로운 15개 카테고리 CHECK 제약조건 추가
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

-- 인덱스 재구축 (카테고리 필터링 성능 최적화)
REINDEX INDEX idx_faqs_category;

-- 확인
COMMENT ON CONSTRAINT faqs_category_check ON public.faqs IS
  '15개 카테고리 제약조건: emergency, domestic-violence, divorce-process, separation-expense, evidence-collection, adultery, alimony, custody, child-support, visitation, property-division, paternity, post-divorce, international-divorce, legal-support';
