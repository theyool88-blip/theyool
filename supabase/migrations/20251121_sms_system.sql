-- SMS 시스템 마이그레이션
-- 실행일: 2025-11-21

-- 1. SMS 템플릿 테이블 생성
CREATE TABLE IF NOT EXISTS sms_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  office VARCHAR(20) NOT NULL CHECK (office IN ('천안', '평택', '공통')),
  type VARCHAR(50) NOT NULL,
  subject VARCHAR(100),
  content TEXT NOT NULL,
  variables JSONB DEFAULT '[]'::jsonb,
  is_active BOOLEAN DEFAULT true,
  message_type VARCHAR(10) DEFAULT 'SMS' CHECK (message_type IN ('SMS', 'LMS')),
  version INT DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID,

  -- 활성화된 템플릿은 사무소별 타입별로 하나만
  CONSTRAINT unique_active_template UNIQUE(office, type, is_active)
    DEFERRABLE INITIALLY DEFERRED
);

-- 인덱스 생성
CREATE INDEX idx_sms_templates_office_type ON sms_templates(office, type);
CREATE INDEX idx_sms_templates_active ON sms_templates(is_active) WHERE is_active = true;

-- 2. SMS 발송 로그 테이블
CREATE TABLE IF NOT EXISTS sms_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
  template_id UUID REFERENCES sms_templates(id) ON DELETE SET NULL,
  recipient_phone VARCHAR(20) NOT NULL,
  recipient_name VARCHAR(50),
  message_type VARCHAR(10) NOT NULL,
  content TEXT NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'pending',
  provider VARCHAR(20) DEFAULT 'solapi',
  provider_message_id VARCHAR(100),
  error_message TEXT,
  cost DECIMAL(10, 2),
  sent_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::jsonb,

  CONSTRAINT sms_logs_status_check
    CHECK (status IN ('pending', 'sent', 'failed', 'delivered'))
);

-- 인덱스 생성
CREATE INDEX idx_sms_logs_booking ON sms_logs(booking_id);
CREATE INDEX idx_sms_logs_status ON sms_logs(status);
CREATE INDEX idx_sms_logs_created ON sms_logs(created_at DESC);

-- 3. Bookings 테이블 수정
-- 새로운 컬럼 추가
ALTER TABLE bookings
ADD COLUMN IF NOT EXISTS payment_status VARCHAR(20) DEFAULT 'none'
  CHECK (payment_status IN ('none', 'pending', 'partial', 'completed')),
ADD COLUMN IF NOT EXISTS payment_amount DECIMAL(10, 2),
ADD COLUMN IF NOT EXISTS payment_due_date DATE,
ADD COLUMN IF NOT EXISTS payment_confirmed_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS payment_method VARCHAR(50),
ADD COLUMN IF NOT EXISTS office_location VARCHAR(20)
  CHECK (office_location IN ('천안', '평택'));

-- status 컬럼 제약조건 수정 (기존 제약조건 삭제 후 재생성)
DO $$
BEGIN
    -- 기존 제약조건이 있으면 삭제
    ALTER TABLE bookings DROP CONSTRAINT IF EXISTS bookings_status_check;

    -- 새로운 제약조건 추가
    ALTER TABLE bookings ADD CONSTRAINT bookings_status_check
      CHECK (status IN ('pending', 'payment_pending', 'confirmed', 'completed', 'cancelled', 'no_show'));
END $$;

-- 4. 기본 SMS 템플릿 데이터 삽입
INSERT INTO sms_templates (name, office, type, subject, content, variables, message_type) VALUES
-- 천안 사무소 템플릿
('입금안내_천안', '천안', 'payment_pending', '상담료 입금 안내',
'[법무법인 더율 천안]
{{customerName}}님, 상담 예약이 접수되었습니다.

일시: {{bookingDate}} {{bookingTime}}
변호사: {{lawyerName}}
상담료: {{paymentAmount}}원

입금계좌: 농협 123-456-789012
입금기한: {{paymentDueDate}}까지

입금 확인 후 예약이 확정됩니다.
문의: 041-555-1234',
'["customerName", "bookingDate", "bookingTime", "lawyerName", "paymentAmount", "paymentDueDate"]'::jsonb,
'LMS'),

('예약확정_천안', '천안', 'confirmed', '상담 예약 확정',
'[법무법인 더율]
{{customerName}}님 예약확정!
{{bookingDate}} {{bookingTime}}
천안사무소에서 뵙겠습니다.
주소확인→ theyool.com/contact',
'["customerName", "bookingDate", "bookingTime"]'::jsonb,
'SMS'),

-- 평택 사무소 템플릿
('입금안내_평택', '평택', 'payment_pending', '상담료 입금 안내',
'[법무법인 더율 평택]
{{customerName}}님, 상담 예약이 접수되었습니다.

일시: {{bookingDate}} {{bookingTime}}
변호사: {{lawyerName}}
상담료: {{paymentAmount}}원

입금계좌: 국민 987-654-321098
입금기한: {{paymentDueDate}}까지

입금 확인 후 예약이 확정됩니다.
문의: 031-555-5678',
'["customerName", "bookingDate", "bookingTime", "lawyerName", "paymentAmount", "paymentDueDate"]'::jsonb,
'LMS'),

('예약확정_평택', '평택', 'confirmed', '상담 예약 확정',
'[법무법인 더율]
{{customerName}}님 예약확정!
{{bookingDate}} {{bookingTime}}
평택사무소에서 뵙겠습니다.
주소확인→ theyool.com/contact',
'["customerName", "bookingDate", "bookingTime"]'::jsonb,
'SMS'),

-- 공통 템플릿
('리마인더_공통', '공통', 'reminder', '상담 하루 전 알림',
'[법무법인 더율]
{{customerName}}님, 내일 {{bookingTime}} 상담 예정입니다.
{{office}}사무소에서 기다리겠습니다.',
'["customerName", "bookingTime", "office"]'::jsonb,
'SMS'),

('취소안내_공통', '공통', 'cancelled', '예약 취소 안내',
'[법무법인 더율]
{{customerName}}님, 예약이 취소되었습니다.
재예약: theyool.com
문의: 02-1234-5678',
'["customerName"]'::jsonb,
'SMS');

-- 5. Row Level Security 정책
ALTER TABLE sms_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE sms_logs ENABLE ROW LEVEL SECURITY;

-- Admin만 SMS 템플릿 관리 가능
CREATE POLICY "Admin can manage SMS templates" ON sms_templates
  FOR ALL USING (true); -- Admin 인증은 애플리케이션 레벨에서 처리

-- SMS 로그는 읽기만 가능
CREATE POLICY "Admin can view SMS logs" ON sms_logs
  FOR SELECT USING (true);

-- 6. 트리거 함수: updated_at 자동 업데이트
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 트리거 생성
CREATE TRIGGER update_sms_templates_updated_at
    BEFORE UPDATE ON sms_templates
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 7. 유용한 뷰 생성
-- 최근 SMS 발송 현황
CREATE OR REPLACE VIEW v_recent_sms_activity AS
SELECT
    sl.id,
    sl.created_at,
    sl.recipient_name,
    sl.recipient_phone,
    sl.message_type,
    sl.status,
    sl.cost,
    st.name as template_name,
    st.office,
    b.id as booking_id,
    b.status as booking_status
FROM sms_logs sl
LEFT JOIN sms_templates st ON sl.template_id = st.id
LEFT JOIN bookings b ON sl.booking_id = b.id
ORDER BY sl.created_at DESC
LIMIT 100;

-- SMS 발송 통계
CREATE OR REPLACE VIEW v_sms_statistics AS
SELECT
    DATE(created_at) as date,
    COUNT(*) as total_sent,
    SUM(CASE WHEN status = 'delivered' THEN 1 ELSE 0 END) as delivered,
    SUM(CASE WHEN status = 'failed' THEN 1 ELSE 0 END) as failed,
    SUM(cost) as total_cost,
    AVG(cost) as avg_cost
FROM sms_logs
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- 8. 함수: SMS 비용 계산
CREATE OR REPLACE FUNCTION calculate_sms_cost(
    message_type VARCHAR,
    recipient_count INT DEFAULT 1
) RETURNS DECIMAL AS $$
BEGIN
    RETURN CASE
        WHEN message_type = 'SMS' THEN 20.0 * recipient_count
        WHEN message_type = 'LMS' THEN 60.0 * recipient_count
        ELSE 0
    END;
END;
$$ LANGUAGE plpgsql;

COMMENT ON TABLE sms_templates IS 'SMS 템플릿 관리 테이블';
COMMENT ON TABLE sms_logs IS 'SMS 발송 로그 테이블';
COMMENT ON COLUMN bookings.payment_status IS '결제 상태: none(없음), pending(대기), partial(부분), completed(완료)';
COMMENT ON COLUMN bookings.office_location IS '상담 사무소 위치: 천안, 평택';