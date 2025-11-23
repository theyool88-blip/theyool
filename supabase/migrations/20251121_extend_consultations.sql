-- 기존 consultations 테이블 확장
-- Created: 2025-11-21
-- Description: 공개 홈페이지의 상담 신청 테이블에 관리 기능 추가

-- 컬럼 추가
ALTER TABLE consultations
ADD COLUMN IF NOT EXISTS assigned_to TEXT, -- 담당자 (변호사명)
ADD COLUMN IF NOT EXISTS scheduled_date TIMESTAMP WITH TIME ZONE, -- 상담 예정일
ADD COLUMN IF NOT EXISTS completed_at TIMESTAMP WITH TIME ZONE, -- 상담 완료일
ADD COLUMN IF NOT EXISTS converted_to_case_id UUID REFERENCES legal_cases(id) ON DELETE SET NULL; -- 사건으로 전환된 경우

-- 인덱스 추가
CREATE INDEX IF NOT EXISTS idx_consultations_assigned_to ON consultations(assigned_to);
CREATE INDEX IF NOT EXISTS idx_consultations_scheduled_date ON consultations(scheduled_date);
CREATE INDEX IF NOT EXISTS idx_consultations_converted_to_case_id ON consultations(converted_to_case_id);

-- 코멘트 추가
COMMENT ON COLUMN consultations.assigned_to IS '담당 변호사명';
COMMENT ON COLUMN consultations.scheduled_date IS '상담 예정 일시';
COMMENT ON COLUMN consultations.completed_at IS '상담 완료 일시';
COMMENT ON COLUMN consultations.converted_to_case_id IS '사건으로 전환된 경우 사건 ID';
