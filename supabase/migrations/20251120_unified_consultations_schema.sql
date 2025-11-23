-- ============================================================================
-- UNIFIED CONSULTATIONS TABLE
-- Date: 2025-11-20
-- Description: Single table for all consultation types (callback, visit, video, info)
-- Supports: scheduled consultations, payment tracking, SMS notifications
-- ============================================================================

BEGIN;

-- ============================================================================
-- STEP 1: Create unified consultations table
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.consultations_unified (
  -- Primary key and timestamps
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,

  -- ========== REQUEST TYPE DISCRIMINATOR ==========
  request_type TEXT NOT NULL CHECK (request_type IN (
    'callback',      -- Simple callback request (legacy consultations)
    'visit',         -- Scheduled visit consultation
    'video',         -- Scheduled video consultation
    'info'           -- Information request only (no follow-up)
  )),

  -- ========== STATUS WORKFLOW ==========
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN (
    'pending',           -- New request, awaiting admin review
    'contacted',         -- Admin has contacted customer
    'confirmed',         -- Appointment confirmed (visit/video only)
    'payment_pending',   -- Awaiting payment (future use)
    'payment_completed', -- Payment received (future use)
    'in_progress',       -- Consultation in progress
    'completed',         -- Consultation completed
    'cancelled',         -- Cancelled by customer or admin
    'no_show'            -- Customer didn't show up (visit/video only)
  )),

  -- ========== CUSTOMER INFORMATION ==========
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,

  -- ========== CONSULTATION DETAILS ==========
  category TEXT,  -- e.g., '재산분할', '양육권', '위자료', '상간사건'
  message TEXT,

  -- ========== SCHEDULING (nullable for callback/info types) ==========
  preferred_date DATE,
  preferred_time TEXT,        -- HH:MM format
  confirmed_date DATE,        -- Final confirmed date
  confirmed_time TEXT,        -- Final confirmed time

  -- ========== VISIT CONSULTATION SPECIFIC ==========
  office_location TEXT CHECK (office_location IN ('천안', '평택', NULL)),

  -- ========== VIDEO CONSULTATION SPECIFIC ==========
  video_link TEXT,

  -- ========== LAWYER ASSIGNMENT ==========
  preferred_lawyer TEXT CHECK (preferred_lawyer IN ('육심원', '임은지', NULL)),
  assigned_lawyer TEXT CHECK (assigned_lawyer IN ('육심원', '임은지', NULL)),

  -- ========== PAYMENT TRACKING (future use) ==========
  consultation_fee INTEGER DEFAULT 0,  -- Amount in KRW (0 = free)
  payment_method TEXT CHECK (payment_method IN ('card', 'transfer', 'cash', 'free', NULL)),
  payment_status TEXT CHECK (payment_status IN ('pending', 'completed', 'refunded', 'free', NULL)),
  paid_at TIMESTAMP WITH TIME ZONE,
  payment_transaction_id TEXT,

  -- ========== ADMIN FIELDS ==========
  admin_notes TEXT,
  contacted_at TIMESTAMP WITH TIME ZONE,
  confirmed_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  cancelled_at TIMESTAMP WITH TIME ZONE,
  cancellation_reason TEXT,

  -- ========== METADATA ==========
  source TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  lead_score INTEGER DEFAULT 0,

  -- ========== CONSTRAINTS ==========
  CONSTRAINT visit_must_have_location CHECK (
    request_type != 'visit' OR office_location IS NOT NULL
  ),
  CONSTRAINT scheduled_must_have_datetime CHECK (
    request_type NOT IN ('visit', 'video') OR (preferred_date IS NOT NULL AND preferred_time IS NOT NULL)
  ),
  CONSTRAINT payment_consistency CHECK (
    (payment_status IS NULL AND payment_method IS NULL) OR
    (payment_status IS NOT NULL AND payment_method IS NOT NULL)
  )
);

-- ============================================================================
-- STEP 2: Create indexes
-- ============================================================================

CREATE INDEX idx_consultations_uni_status ON public.consultations_unified(status)
  WHERE status NOT IN ('completed', 'cancelled');

CREATE INDEX idx_consultations_uni_request_type ON public.consultations_unified(request_type);

CREATE INDEX idx_consultations_uni_created_at ON public.consultations_unified(created_at DESC);

CREATE INDEX idx_consultations_uni_status_type ON public.consultations_unified(status, request_type);

CREATE INDEX idx_consultations_uni_status_date ON public.consultations_unified(status, preferred_date)
  WHERE preferred_date IS NOT NULL;

CREATE INDEX idx_consultations_uni_scheduling ON public.consultations_unified(request_type, preferred_date, preferred_time)
  WHERE request_type IN ('visit', 'video') AND status NOT IN ('cancelled', 'no_show');

CREATE INDEX idx_consultations_uni_assigned_lawyer ON public.consultations_unified(assigned_lawyer, status)
  WHERE assigned_lawyer IS NOT NULL;

CREATE INDEX idx_consultations_uni_payment ON public.consultations_unified(payment_status, paid_at)
  WHERE payment_status IS NOT NULL;

CREATE INDEX idx_consultations_uni_phone ON public.consultations_unified(phone);

CREATE INDEX idx_consultations_uni_email ON public.consultations_unified(email)
  WHERE email IS NOT NULL;

-- ============================================================================
-- STEP 3: Enable Row Level Security
-- ============================================================================

ALTER TABLE public.consultations_unified ENABLE ROW LEVEL SECURITY;

-- Public: Allow INSERT only
CREATE POLICY "Allow public to create consultations_unified"
  ON public.consultations_unified
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Admin: Full access for authenticated users
CREATE POLICY "Allow admin to read all consultations_unified"
  ON public.consultations_unified
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow admin to update consultations_unified"
  ON public.consultations_unified
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow admin to delete consultations_unified"
  ON public.consultations_unified
  FOR DELETE
  TO authenticated
  USING (true);

-- ============================================================================
-- STEP 4: Create triggers
-- ============================================================================

-- Auto-update updated_at timestamp
CREATE TRIGGER set_consultations_unified_updated_at
  BEFORE UPDATE ON public.consultations_unified
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Auto-set status timestamp fields
CREATE OR REPLACE FUNCTION public.handle_consultation_status_timestamps()
RETURNS TRIGGER AS $$
BEGIN
  -- Set contacted_at when status changes to 'contacted'
  IF NEW.status = 'contacted' AND (OLD.status IS NULL OR OLD.status != 'contacted') THEN
    NEW.contacted_at = timezone('utc'::text, now());
  END IF;

  -- Set confirmed_at when status changes to 'confirmed'
  IF NEW.status = 'confirmed' AND (OLD.status IS NULL OR OLD.status != 'confirmed') THEN
    NEW.confirmed_at = timezone('utc'::text, now());
  END IF;

  -- Set completed_at when status changes to 'completed'
  IF NEW.status = 'completed' AND (OLD.status IS NULL OR OLD.status != 'completed') THEN
    NEW.completed_at = timezone('utc'::text, now());
  END IF;

  -- Set cancelled_at when status changes to 'cancelled' or 'no_show'
  IF NEW.status IN ('cancelled', 'no_show') AND (OLD.status IS NULL OR OLD.status NOT IN ('cancelled', 'no_show')) THEN
    NEW.cancelled_at = timezone('utc'::text, now());
  END IF;

  -- Set paid_at when payment_status changes to 'completed'
  IF NEW.payment_status = 'completed' AND (OLD.payment_status IS NULL OR OLD.payment_status != 'completed') THEN
    NEW.paid_at = timezone('utc'::text, now());
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_consultations_unified_status_timestamps
  BEFORE UPDATE ON public.consultations_unified
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_consultation_status_timestamps();

-- ============================================================================
-- STEP 5: Add table comments
-- ============================================================================

COMMENT ON TABLE public.consultations_unified IS 'Unified table for all consultation requests: callback, visit, video, and info';
COMMENT ON COLUMN public.consultations_unified.request_type IS 'Type of consultation request';
COMMENT ON COLUMN public.consultations_unified.status IS 'Current status in the consultation workflow';
COMMENT ON COLUMN public.consultations_unified.consultation_fee IS 'Consultation fee in KRW (0 = free consultation)';
COMMENT ON COLUMN public.consultations_unified.lead_score IS 'Auto-calculated score for prioritization (higher = more urgent)';
COMMENT ON COLUMN public.consultations_unified.source IS 'Traffic source: website, landing_page, phone, referral, etc.';

COMMIT;

-- ============================================================================
-- SMS TEMPLATES TABLE
-- ============================================================================

BEGIN;

CREATE TABLE IF NOT EXISTS public.sms_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,

  -- Template identification
  template_key TEXT UNIQUE NOT NULL,
  template_name TEXT NOT NULL,
  description TEXT,

  -- Template content
  message_template TEXT NOT NULL,

  -- Usage conditions
  request_types TEXT[] NOT NULL,
  trigger_status TEXT,
  trigger_event TEXT,

  -- Metadata
  is_active BOOLEAN DEFAULT true,
  send_to TEXT NOT NULL CHECK (send_to IN ('customer', 'admin', 'both')),
  priority INTEGER DEFAULT 0,
  variables JSONB
);

CREATE INDEX idx_sms_templates_key ON public.sms_templates(template_key);
CREATE INDEX idx_sms_templates_status ON public.sms_templates(trigger_status);
CREATE INDEX idx_sms_templates_active ON public.sms_templates(is_active);

ALTER TABLE public.sms_templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow admin to manage sms_templates"
  ON public.sms_templates
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert default templates
INSERT INTO public.sms_templates (template_key, template_name, message_template, request_types, trigger_status, send_to, variables) VALUES
  ('callback_received', '콜백 신청 접수 (고객)', '[법무법인 더율] {{name}}님의 상담 신청이 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.', ARRAY['callback'], 'pending', 'customer', '["name"]'),
  ('callback_admin_alert', '콜백 신청 알림 (관리자)', '[알림] {{name}}님 콜백 요청 ({{phone}}) - 카테고리: {{category}}', ARRAY['callback'], 'pending', 'admin', '["name", "phone", "category"]'),
  ('visit_confirmed', '방문 상담 확정 (고객)', '[법무법인 더율] {{name}}님의 방문 상담이 확정되었습니다.\n일시: {{date}} {{time}}\n장소: {{office_location}} 사무소\n문의: 02-1234-5678', ARRAY['visit'], 'confirmed', 'customer', '["name", "date", "time", "office_location"]'),
  ('video_confirmed', '화상 상담 확정 (고객)', '[법무법인 더율] {{name}}님의 화상 상담이 확정되었습니다.\n일시: {{date}} {{time}}\n링크는 이메일로 발송됩니다.', ARRAY['video'], 'confirmed', 'customer', '["name", "date", "time"]'),
  ('reminder_1day', '상담 1일 전 알림', '[법무법인 더율] 내일 {{time}} 상담 예정입니다. ({{office_location}} 사무소)', ARRAY['visit', 'video'], NULL, 'customer', '["time", "office_location"]'),
  ('completed_thanks', '상담 완료 감사', '[법무법인 더율] 상담해 주셔서 감사합니다. 추가 문의사항은 언제든 연락 주세요.', ARRAY['callback', 'visit', 'video'], 'completed', 'customer', '[]'),
  ('payment_pending', '결제 대기 알림', '[법무법인 더율] {{name}}님의 상담료 결제가 대기중입니다. 금액: {{fee}}원', ARRAY['callback', 'visit', 'video'], 'payment_pending', 'customer', '["name", "fee"]'),
  ('payment_completed', '결제 완료 알림', '[법무법인 더율] 결제가 완료되었습니다. 영수증은 이메일로 발송됩니다.', ARRAY['callback', 'visit', 'video'], 'payment_completed', 'customer', '[]')
ON CONFLICT (template_key) DO NOTHING;

COMMIT;

-- ============================================================================
-- SMS LOGS TABLE
-- ============================================================================

BEGIN;

CREATE TABLE IF NOT EXISTS public.sms_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,

  -- Reference to consultation
  consultation_id UUID REFERENCES public.consultations_unified(id) ON DELETE CASCADE,

  -- SMS details
  template_key TEXT,
  recipient_phone TEXT NOT NULL,
  recipient_type TEXT NOT NULL CHECK (recipient_type IN ('customer', 'admin')),
  message_content TEXT NOT NULL,

  -- Delivery status
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'delivered', 'failed')),
  sent_at TIMESTAMP WITH TIME ZONE,
  delivered_at TIMESTAMP WITH TIME ZONE,
  failed_at TIMESTAMP WITH TIME ZONE,
  failure_reason TEXT,

  -- Provider details
  provider TEXT NOT NULL DEFAULT 'solapi',
  provider_message_id TEXT,
  provider_response JSONB,

  -- Cost tracking
  cost INTEGER,

  -- Metadata
  metadata JSONB
);

CREATE INDEX idx_sms_logs_consultation ON public.sms_logs(consultation_id);
CREATE INDEX idx_sms_logs_status ON public.sms_logs(status);
CREATE INDEX idx_sms_logs_created_at ON public.sms_logs(created_at DESC);

ALTER TABLE public.sms_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow admin to view sms_logs"
  ON public.sms_logs
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow system to insert sms_logs"
  ON public.sms_logs
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

COMMIT;
