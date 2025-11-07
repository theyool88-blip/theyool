-- 법무법인 더율 - 초기 데이터베이스 스키마
-- 이 SQL 파일을 Supabase SQL Editor에서 실행하세요

-- 1. consultations 테이블 (상담 신청)
CREATE TABLE IF NOT EXISTS consultations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  category TEXT, -- 'alimony', 'property', 'custody', 'adultery', 'consultation', 'other'
  message TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed')),
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스
CREATE INDEX idx_consultations_status ON consultations(status);
CREATE INDEX idx_consultations_created_at ON consultations(created_at DESC);
CREATE INDEX idx_consultations_category ON consultations(category);

-- RLS (Row Level Security) 정책
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;

-- 누구나 상담 신청 가능 (INSERT)
CREATE POLICY "Anyone can create consultations"
  ON consultations FOR INSERT
  WITH CHECK (true);

-- 인증된 사용자만 조회 가능 (관리자)
CREATE POLICY "Only authenticated users can view consultations"
  ON consultations FOR SELECT
  USING (auth.role() = 'authenticated');

-- 인증된 사용자만 수정 가능 (관리자)
CREATE POLICY "Only authenticated users can update consultations"
  ON consultations FOR UPDATE
  USING (auth.role() = 'authenticated');

-- 자동 updated_at 업데이트 트리거
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER consultations_updated_at
  BEFORE UPDATE ON consultations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 2. cases 테이블 (성공사례) - 나중에 추가
-- 3. blog_posts 테이블 (칼럼) - 나중에 추가

-- 초기 데이터 확인
SELECT 'Initial schema created successfully!' AS message;
