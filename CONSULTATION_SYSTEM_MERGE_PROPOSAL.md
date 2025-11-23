# Consultation System: Merged Table Architecture

**Date**: 2025-11-20
**Author**: Claude (Backend & SEO Specialist)
**Status**: Proposal for Review

---

## Executive Summary

This document proposes merging the `bookings` and `consultations` tables into a single unified table called `consultations`. This design supports 4 consultation request types, future paid services, and flexible SMS notification strategy.

**Key Benefits**:
- Single source of truth for all customer interactions
- Simplified admin dashboard
- Future-proof for paid services
- Consistent status workflow
- Reduced code duplication

**Migration Risk**: LOW (zero-downtime, reversible)

---

## 1. Schema Design: Unified `consultations` Table

### Complete SQL Schema

```sql
-- ============================================================================
-- UNIFIED CONSULTATIONS TABLE
-- Supports: callback requests, scheduled visits, video consultations, paid services
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.consultations (
  -- Primary key and timestamps
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,

  -- ========== REQUEST TYPE DISCRIMINATOR ==========
  -- Determines which fields are required and workflow to follow
  request_type TEXT NOT NULL CHECK (request_type IN (
    'callback',      -- Simple callback request (legacy consultations)
    'visit',         -- Scheduled visit consultation
    'video',         -- Scheduled video consultation
    'info'           -- Information request only (no follow-up)
  )),

  -- ========== STATUS WORKFLOW ==========
  -- Unified status system for all request types
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
  category TEXT,  -- e.g., '재산분할', '양육권', '위자료', '상간사건', etc.
  message TEXT,   -- Customer's inquiry/message

  -- ========== SCHEDULING (nullable for callback/info types) ==========
  preferred_date DATE,        -- Required for visit/video
  preferred_time TEXT,        -- HH:MM format (e.g., '14:00')
  confirmed_date DATE,        -- Final confirmed date (may differ from preferred)
  confirmed_time TEXT,        -- Final confirmed time

  -- ========== VISIT CONSULTATION SPECIFIC ==========
  office_location TEXT CHECK (office_location IN ('천안', '평택', NULL)),

  -- ========== VIDEO CONSULTATION SPECIFIC ==========
  video_link TEXT,  -- Meeting URL (Zoom/Google Meet), set by admin after confirmation

  -- ========== LAWYER ASSIGNMENT ==========
  preferred_lawyer TEXT CHECK (preferred_lawyer IN ('육심원', '임은지', NULL)),
  assigned_lawyer TEXT CHECK (assigned_lawyer IN ('육심원', '임은지', NULL)),

  -- ========== PAYMENT TRACKING (future use) ==========
  consultation_fee INTEGER DEFAULT 0,  -- Amount in KRW (0 = free)
  payment_method TEXT CHECK (payment_method IN ('card', 'transfer', 'cash', 'free', NULL)),
  payment_status TEXT CHECK (payment_status IN ('pending', 'completed', 'refunded', 'free', NULL)),
  paid_at TIMESTAMP WITH TIME ZONE,
  payment_transaction_id TEXT,  -- External payment gateway transaction ID

  -- ========== ADMIN FIELDS ==========
  admin_notes TEXT,
  contacted_at TIMESTAMP WITH TIME ZONE,   -- When admin first contacted customer
  confirmed_at TIMESTAMP WITH TIME ZONE,   -- When appointment was confirmed
  completed_at TIMESTAMP WITH TIME ZONE,   -- When consultation was completed
  cancelled_at TIMESTAMP WITH TIME ZONE,
  cancellation_reason TEXT,

  -- ========== METADATA ==========
  source TEXT,  -- Where the request came from: 'website', 'landing_page', 'phone', etc.
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  lead_score INTEGER DEFAULT 0,  -- Calculated score for prioritization

  -- ========== CONSTRAINTS ==========
  -- Visit consultations must have office_location
  CONSTRAINT visit_must_have_location CHECK (
    request_type != 'visit' OR office_location IS NOT NULL
  ),

  -- Scheduled consultations must have date/time
  CONSTRAINT scheduled_must_have_datetime CHECK (
    request_type NOT IN ('visit', 'video') OR (preferred_date IS NOT NULL AND preferred_time IS NOT NULL)
  ),

  -- Payment fields consistency
  CONSTRAINT payment_consistency CHECK (
    (payment_status IS NULL AND payment_method IS NULL) OR
    (payment_status IS NOT NULL AND payment_method IS NOT NULL)
  )
);

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================

-- Primary query patterns
CREATE INDEX idx_consultations_status ON public.consultations(status) WHERE status NOT IN ('completed', 'cancelled');
CREATE INDEX idx_consultations_request_type ON public.consultations(request_type);
CREATE INDEX idx_consultations_created_at ON public.consultations(created_at DESC);

-- Composite indexes for admin dashboard
CREATE INDEX idx_consultations_status_type ON public.consultations(status, request_type);
CREATE INDEX idx_consultations_status_date ON public.consultations(status, preferred_date) WHERE preferred_date IS NOT NULL;

-- Scheduling lookups (for availability checking)
CREATE INDEX idx_consultations_scheduling ON public.consultations(request_type, preferred_date, preferred_time)
  WHERE request_type IN ('visit', 'video') AND status NOT IN ('cancelled', 'no_show');

-- Lawyer assignment queries
CREATE INDEX idx_consultations_assigned_lawyer ON public.consultations(assigned_lawyer, status) WHERE assigned_lawyer IS NOT NULL;

-- Payment queries (for future use)
CREATE INDEX idx_consultations_payment ON public.consultations(payment_status, paid_at) WHERE payment_status IS NOT NULL;

-- Search optimization
CREATE INDEX idx_consultations_phone ON public.consultations(phone);
CREATE INDEX idx_consultations_email ON public.consultations(email) WHERE email IS NOT NULL;

-- Full-text search (for name, message, admin_notes)
CREATE INDEX idx_consultations_search ON public.consultations USING gin(
  to_tsvector('korean', coalesce(name, '') || ' ' || coalesce(message, '') || ' ' || coalesce(admin_notes, ''))
);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================

ALTER TABLE public.consultations ENABLE ROW LEVEL SECURITY;

-- Public: Allow INSERT only (customers can create consultation requests)
CREATE POLICY "Allow public to create consultations"
  ON public.consultations
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Public: Allow SELECT for own consultation (by phone number)
-- Useful for "check status" feature
CREATE POLICY "Allow users to view own consultations"
  ON public.consultations
  FOR SELECT
  TO public
  USING (phone = current_setting('request.jwt.claim.phone', true));

-- Admin: Full access for authenticated users
CREATE POLICY "Allow admin to read all consultations"
  ON public.consultations
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow admin to update consultations"
  ON public.consultations
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow admin to delete consultations"
  ON public.consultations
  FOR DELETE
  TO authenticated
  USING (true);

-- ============================================================================
-- TRIGGERS
-- ============================================================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_consultations_updated_at
  BEFORE UPDATE ON public.consultations
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Auto-set timestamp fields based on status changes
CREATE OR REPLACE FUNCTION public.handle_consultation_status_timestamps()
RETURNS TRIGGER AS $$
BEGIN
  -- Set contacted_at when status changes to 'contacted'
  IF NEW.status = 'contacted' AND OLD.status != 'contacted' THEN
    NEW.contacted_at = timezone('utc'::text, now());
  END IF;

  -- Set confirmed_at when status changes to 'confirmed'
  IF NEW.status = 'confirmed' AND OLD.status != 'confirmed' THEN
    NEW.confirmed_at = timezone('utc'::text, now());
  END IF;

  -- Set completed_at when status changes to 'completed'
  IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
    NEW.completed_at = timezone('utc'::text, now());
  END IF;

  -- Set cancelled_at when status changes to 'cancelled'
  IF NEW.status IN ('cancelled', 'no_show') AND OLD.status NOT IN ('cancelled', 'no_show') THEN
    NEW.cancelled_at = timezone('utc'::text, now());
  END IF;

  -- Set paid_at when payment_status changes to 'completed'
  IF NEW.payment_status = 'completed' AND OLD.payment_status != 'completed' THEN
    NEW.paid_at = timezone('utc'::text, now());
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_consultation_status_timestamps
  BEFORE UPDATE ON public.consultations
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_consultation_status_timestamps();

-- ============================================================================
-- COMMENTS (Documentation)
-- ============================================================================

COMMENT ON TABLE public.consultations IS 'Unified table for all consultation requests: callback, visit, video, and info';
COMMENT ON COLUMN public.consultations.request_type IS 'Type of consultation request';
COMMENT ON COLUMN public.consultations.status IS 'Current status in the consultation workflow';
COMMENT ON COLUMN public.consultations.consultation_fee IS 'Consultation fee in KRW (0 = free consultation)';
COMMENT ON COLUMN public.consultations.lead_score IS 'Auto-calculated score for prioritization (higher = more urgent)';
COMMENT ON COLUMN public.consultations.source IS 'Traffic source: website, landing_page, phone, referral, etc.';
```

---

## 2. Migration Strategy

### 2.1 Migration SQL Script

**File**: `/Users/hskim/theyool/supabase/migrations/20251120_merge_consultations_bookings.sql`

```sql
-- ============================================================================
-- MIGRATION: Merge bookings into consultations
-- Date: 2025-11-20
-- Description: Consolidates bookings and consultations into single table
-- ============================================================================

BEGIN;

-- Step 1: Create new unified consultations table (if not exists)
-- (Use the CREATE TABLE statement from Section 1 above)

-- Step 2: Migrate existing consultations data
-- These are callback requests with no scheduling
INSERT INTO public.consultations_new (
  id,
  created_at,
  updated_at,
  request_type,
  status,
  name,
  phone,
  email,
  category,
  message,
  admin_notes,
  source
)
SELECT
  id,
  created_at,
  updated_at,
  'callback' as request_type,  -- Old consultations are callback requests
  CASE
    WHEN status = 'new' THEN 'pending'
    WHEN status = 'contacted' THEN 'contacted'
    WHEN status = 'closed' THEN 'completed'
    ELSE 'pending'
  END as status,
  name,
  phone,
  email,
  category,
  message,
  NULL as admin_notes,  -- Old consultations table doesn't have this field
  'website' as source
FROM public.consultations_old;

-- Step 3: Migrate existing bookings data
-- These are scheduled visit/video consultations
INSERT INTO public.consultations_new (
  id,
  created_at,
  updated_at,
  request_type,
  status,
  name,
  phone,
  email,
  category,
  message,
  preferred_date,
  preferred_time,
  office_location,
  video_link,
  preferred_lawyer,
  admin_notes,
  contacted_at,
  confirmed_at,
  cancelled_at,
  source
)
SELECT
  id,
  created_at,
  updated_at,
  type as request_type,  -- 'visit' or 'video'
  status,  -- Status values are compatible
  name,
  phone,
  email,
  category,
  message,
  preferred_date,
  preferred_time,
  office_location,
  video_link,
  preferred_lawyer,
  admin_notes,
  NULL as contacted_at,  -- Bookings didn't track this
  confirmed_at,
  cancelled_at,
  'website' as source
FROM public.bookings;

-- Step 4: Rename tables (zero-downtime swap)
ALTER TABLE public.consultations RENAME TO consultations_old_backup;
ALTER TABLE public.bookings RENAME TO bookings_old_backup;
ALTER TABLE public.consultations_new RENAME TO consultations;

-- Step 5: Update sequences (if using serial IDs - not needed for UUID)
-- N/A - using UUID

-- Step 6: Grant permissions
GRANT SELECT, INSERT ON public.consultations TO anon;
GRANT ALL ON public.consultations TO authenticated;
GRANT ALL ON public.consultations TO service_role;

COMMIT;

-- ============================================================================
-- ROLLBACK PROCEDURE (if needed)
-- ============================================================================

-- To rollback (run in separate transaction):
-- BEGIN;
-- ALTER TABLE public.consultations RENAME TO consultations_merged_failed;
-- ALTER TABLE public.consultations_old_backup RENAME TO consultations;
-- ALTER TABLE public.bookings_old_backup RENAME TO bookings;
-- COMMIT;

-- ============================================================================
-- CLEANUP (after verifying migration success)
-- ============================================================================

-- After 1-2 weeks of production use, drop old tables:
-- DROP TABLE public.consultations_old_backup;
-- DROP TABLE public.bookings_old_backup;
```

### 2.2 Migration Script (JavaScript)

**File**: `/Users/hskim/theyool/scripts/migrate-to-unified-consultations.js`

```javascript
#!/usr/bin/env node

/**
 * Migrate bookings and consultations to unified table
 *
 * Usage:
 *   node scripts/migrate-to-unified-consultations.js --dry-run
 *   node scripts/migrate-to-unified-consultations.js --execute
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function main() {
  const isDryRun = process.argv.includes('--dry-run');

  console.log('🚀 Starting migration to unified consultations table...');
  console.log(`📋 Mode: ${isDryRun ? 'DRY RUN' : 'EXECUTE'}\n`);

  try {
    // Step 1: Count existing records
    const [consultationsCount, bookingsCount] = await Promise.all([
      supabase.from('consultations').select('id', { count: 'exact', head: true }),
      supabase.from('bookings').select('id', { count: 'exact', head: true })
    ]);

    console.log(`📊 Existing records:`);
    console.log(`   - consultations: ${consultationsCount.count || 0}`);
    console.log(`   - bookings: ${bookingsCount.count || 0}`);
    console.log(`   - Total to migrate: ${(consultationsCount.count || 0) + (bookingsCount.count || 0)}\n`);

    if (isDryRun) {
      console.log('✅ Dry run complete. No changes made.');
      console.log('   To execute migration, run: node scripts/migrate-to-unified-consultations.js --execute');
      return;
    }

    // Step 2: Read migration SQL file
    const migrationFile = path.join(__dirname, '../supabase/migrations/20251120_merge_consultations_bookings.sql');
    const migrationSQL = fs.readFileSync(migrationFile, 'utf8');

    console.log('⚙️  Executing migration SQL...');

    // Execute migration (requires service role key)
    // Note: Supabase JS doesn't support raw SQL execution directly
    // You need to use pg client or execute via Supabase SQL editor
    console.log('⚠️  SQL migration must be executed manually:');
    console.log('   1. Go to Supabase Dashboard > SQL Editor');
    console.log('   2. Copy migration SQL from: supabase/migrations/20251120_merge_consultations_bookings.sql');
    console.log('   3. Execute the migration');
    console.log('   4. Verify data integrity\n');

    console.log('✅ Migration preparation complete');

  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

main();
```

---

## 3. Status Workflow Design

### 3.1 Status Transition Diagram

```
CALLBACK REQUEST FLOW:
  pending → contacted → completed
                     ↓
                  cancelled

SCHEDULED CONSULTATION FLOW (visit/video):
  pending → contacted → confirmed → in_progress → completed
                     ↓           ↓              ↓
                  cancelled   no_show      cancelled

PAID CONSULTATION FLOW (future):
  pending → contacted → confirmed → payment_pending → payment_completed → in_progress → completed
                     ↓           ↓                 ↓                   ↓
                  cancelled   cancelled        cancelled           cancelled
```

### 3.2 Status Definitions

| Status | Request Types | Description | SMS Trigger |
|--------|--------------|-------------|-------------|
| `pending` | All | New request, awaiting admin review | Admin alert |
| `contacted` | All | Admin has contacted customer | - |
| `confirmed` | visit, video | Appointment confirmed with date/time | User confirmation |
| `payment_pending` | All (future) | Awaiting payment | Payment reminder |
| `payment_completed` | All (future) | Payment received | Payment receipt |
| `in_progress` | visit, video | Consultation currently happening | - |
| `completed` | All | Consultation finished | Thank you message |
| `cancelled` | All | Cancelled by customer or admin | Cancellation notice |
| `no_show` | visit, video | Customer didn't show up | Follow-up |

---

## 4. SMS Template Strategy

### 4.1 SMS Templates Table

```sql
CREATE TABLE IF NOT EXISTS public.sms_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,

  -- Template identification
  template_key TEXT UNIQUE NOT NULL,  -- e.g., 'callback_received', 'visit_confirmed'
  template_name TEXT NOT NULL,
  description TEXT,

  -- Template content
  message_template TEXT NOT NULL,  -- e.g., '[법무법인 더율] {{name}}님의 상담 신청이 접수되었습니다.'

  -- Usage conditions
  request_types TEXT[] NOT NULL,  -- ['callback', 'visit', 'video'] or ['all']
  trigger_status TEXT,  -- Status that triggers this SMS (e.g., 'confirmed')
  trigger_event TEXT,   -- Event that triggers SMS (e.g., 'status_change', 'reminder')

  -- Template metadata
  is_active BOOLEAN DEFAULT true,
  send_to TEXT NOT NULL CHECK (send_to IN ('customer', 'admin', 'both')),
  priority INTEGER DEFAULT 0,  -- Higher = more important

  -- Variables used in template
  variables JSONB  -- ['name', 'phone', 'date', 'time', 'office_location']
);

-- Example templates
INSERT INTO public.sms_templates (template_key, template_name, message_template, request_types, trigger_status, send_to, variables) VALUES
  ('callback_received', '콜백 신청 접수 (고객)', '[법무법인 더율] {{name}}님의 상담 신청이 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.', ARRAY['callback'], 'pending', 'customer', '["name"]'),
  ('callback_admin_alert', '콜백 신청 알림 (관리자)', '[알림] {{name}}님 콜백 요청 ({{phone}}) - 카테고리: {{category}}', ARRAY['callback'], 'pending', 'admin', '["name", "phone", "category"]'),
  ('visit_confirmed', '방문 상담 확정 (고객)', '[법무법인 더율] {{name}}님의 방문 상담이 확정되었습니다.\n일시: {{date}} {{time}}\n장소: {{office_location}} 사무소\n문의: 02-1234-5678', ARRAY['visit'], 'confirmed', 'customer', '["name", "date", "time", "office_location"]'),
  ('video_confirmed', '화상 상담 확정 (고객)', '[법무법인 더율] {{name}}님의 화상 상담이 확정되었습니다.\n일시: {{date}} {{time}}\n링크는 이메일로 발송됩니다.', ARRAY['video'], 'confirmed', 'customer', '["name", "date", "time"]'),
  ('reminder_1day', '상담 1일 전 알림', '[법무법인 더율] 내일 {{time}} 상담 예정입니다. ({{office_location}} 사무소)', ARRAY['visit', 'video'], NULL, 'customer', '["time", "office_location"]'),
  ('completed_thanks', '상담 완료 감사', '[법무법인 더율] 상담해 주셔서 감사합니다. 추가 문의사항은 언제든 연락 주세요.', ARRAY['all'], 'completed', 'customer', '[]'),
  ('payment_pending', '결제 대기 알림', '[법무법인 더율] {{name}}님의 상담료 결제가 대기중입니다. 금액: {{fee}}원', ARRAY['all'], 'payment_pending', 'customer', '["name", "fee"]'),
  ('payment_completed', '결제 완료 알림', '[법무법인 더율] 결제가 완료되었습니다. 영수증은 이메일로 발송됩니다.', ARRAY['all'], 'payment_completed', 'customer', '[]');
```

### 4.2 SMS Logs Table

```sql
CREATE TABLE IF NOT EXISTS public.sms_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,

  -- Reference to consultation
  consultation_id UUID REFERENCES public.consultations(id) ON DELETE CASCADE,

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

  -- External provider details
  provider TEXT NOT NULL DEFAULT 'solapi',  -- 'solapi', 'aws_sns', etc.
  provider_message_id TEXT,
  provider_response JSONB,

  -- Cost tracking
  cost INTEGER,  -- Cost in KRW

  -- Metadata
  metadata JSONB
);

CREATE INDEX idx_sms_logs_consultation ON public.sms_logs(consultation_id);
CREATE INDEX idx_sms_logs_status ON public.sms_logs(status);
CREATE INDEX idx_sms_logs_created_at ON public.sms_logs(created_at DESC);
```

### 4.3 SMS Sending Logic

**File**: `/Users/hskim/theyool/lib/sms/unified-sender.ts`

```typescript
import { createClient } from '@/lib/supabase/server';
import { sendSMS } from '@/lib/sms/solapi';

interface SMSTemplate {
  template_key: string;
  message_template: string;
  send_to: 'customer' | 'admin' | 'both';
  variables: string[];
}

/**
 * Send SMS based on consultation status change
 */
export async function sendConsultationSMS(
  consultationId: string,
  triggerStatus: string,
  consultationData: {
    request_type: string;
    name: string;
    phone: string;
    email?: string;
    category?: string;
    preferred_date?: string;
    preferred_time?: string;
    office_location?: string;
    consultation_fee?: number;
  }
): Promise<void> {
  const supabase = await createClient();

  // Find matching templates
  const { data: templates, error } = await supabase
    .from('sms_templates')
    .select('*')
    .eq('trigger_status', triggerStatus)
    .eq('is_active', true)
    .or(`request_types.cs.{${consultationData.request_type}},request_types.cs.{all}`);

  if (error || !templates || templates.length === 0) {
    console.log(`No SMS template found for status: ${triggerStatus}, type: ${consultationData.request_type}`);
    return;
  }

  // Send SMS for each template
  for (const template of templates) {
    const recipients = getRecipients(template.send_to as 'customer' | 'admin' | 'both', consultationData.phone);

    for (const recipient of recipients) {
      try {
        // Replace template variables
        const message = replaceTemplateVariables(template.message_template, consultationData);

        // Send SMS
        const result = await sendSMS(recipient.phone, message);

        // Log SMS
        await supabase.from('sms_logs').insert({
          consultation_id: consultationId,
          template_key: template.template_key,
          recipient_phone: recipient.phone,
          recipient_type: recipient.type,
          message_content: message,
          status: result.success ? 'sent' : 'failed',
          sent_at: result.success ? new Date().toISOString() : null,
          failed_at: result.success ? null : new Date().toISOString(),
          failure_reason: result.error || null,
          provider: 'solapi',
          provider_message_id: result.messageId || null,
          provider_response: result.response || null,
        });

      } catch (error) {
        console.error(`Failed to send SMS for template ${template.template_key}:`, error);
      }
    }
  }
}

function getRecipients(sendTo: 'customer' | 'admin' | 'both', customerPhone: string) {
  const ADMIN_PHONE = '010-XXXX-XXXX'; // From env

  const recipients = [];

  if (sendTo === 'customer' || sendTo === 'both') {
    recipients.push({ phone: customerPhone, type: 'customer' as const });
  }

  if (sendTo === 'admin' || sendTo === 'both') {
    recipients.push({ phone: ADMIN_PHONE, type: 'admin' as const });
  }

  return recipients;
}

function replaceTemplateVariables(template: string, data: Record<string, any>): string {
  let message = template;

  // Replace {{variable}} with actual values
  Object.keys(data).forEach(key => {
    const value = data[key] || '';
    message = message.replace(new RegExp(`{{${key}}}`, 'g'), String(value));
  });

  return message;
}
```

---

## 5. TypeScript Types (Updated)

**File**: `/Users/hskim/theyool/types/consultation.ts`

```typescript
/**
 * Unified Consultation System Types
 */

export type RequestType = 'callback' | 'visit' | 'video' | 'info';

export type ConsultationStatus =
  | 'pending'
  | 'contacted'
  | 'confirmed'
  | 'payment_pending'
  | 'payment_completed'
  | 'in_progress'
  | 'completed'
  | 'cancelled'
  | 'no_show';

export type OfficeLocation = '천안' | '평택';
export type LawyerName = '육심원' | '임은지';
export type PaymentMethod = 'card' | 'transfer' | 'cash' | 'free';
export type PaymentStatus = 'pending' | 'completed' | 'refunded' | 'free';

/**
 * Base consultation interface (common fields)
 */
interface BaseConsultation {
  id: string;
  created_at: string;
  updated_at: string;

  // Core fields
  request_type: RequestType;
  status: ConsultationStatus;
  name: string;
  phone: string;
  email?: string;
  category?: string;
  message?: string;

  // Lawyer
  preferred_lawyer?: LawyerName;
  assigned_lawyer?: LawyerName;

  // Payment
  consultation_fee?: number;
  payment_method?: PaymentMethod;
  payment_status?: PaymentStatus;
  paid_at?: string;
  payment_transaction_id?: string;

  // Admin
  admin_notes?: string;
  contacted_at?: string;
  confirmed_at?: string;
  completed_at?: string;
  cancelled_at?: string;
  cancellation_reason?: string;

  // Metadata
  source?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  lead_score?: number;
}

/**
 * Callback consultation (simple phone callback)
 */
export interface CallbackConsultation extends BaseConsultation {
  request_type: 'callback';
  // No scheduling fields required
}

/**
 * Visit consultation (in-person at office)
 */
export interface VisitConsultation extends BaseConsultation {
  request_type: 'visit';
  preferred_date: string;
  preferred_time: string;
  confirmed_date?: string;
  confirmed_time?: string;
  office_location: OfficeLocation;
}

/**
 * Video consultation (online via Zoom/Meet)
 */
export interface VideoConsultation extends BaseConsultation {
  request_type: 'video';
  preferred_date: string;
  preferred_time: string;
  confirmed_date?: string;
  confirmed_time?: string;
  video_link?: string;
}

/**
 * Info request (just looking for information)
 */
export interface InfoConsultation extends BaseConsultation {
  request_type: 'info';
  // No scheduling or follow-up needed
}

/**
 * Discriminated union of all consultation types
 */
export type Consultation =
  | CallbackConsultation
  | VisitConsultation
  | VideoConsultation
  | InfoConsultation;

/**
 * Type guards
 */
export function isCallbackConsultation(c: Consultation): c is CallbackConsultation {
  return c.request_type === 'callback';
}

export function isVisitConsultation(c: Consultation): c is VisitConsultation {
  return c.request_type === 'visit';
}

export function isVideoConsultation(c: Consultation): c is VideoConsultation {
  return c.request_type === 'video';
}

export function isInfoConsultation(c: Consultation): c is InfoConsultation {
  return c.request_type === 'info';
}

export function isScheduledConsultation(c: Consultation): c is VisitConsultation | VideoConsultation {
  return c.request_type === 'visit' || c.request_type === 'video';
}

export function requiresPayment(c: Consultation): boolean {
  return (c.consultation_fee || 0) > 0;
}

export function isPaid(c: Consultation): boolean {
  return c.payment_status === 'completed';
}

/**
 * Create consultation input types
 */
export interface CreateCallbackInput {
  request_type: 'callback';
  name: string;
  phone: string;
  email?: string;
  category?: string;
  message?: string;
  source?: string;
}

export interface CreateVisitInput {
  request_type: 'visit';
  name: string;
  phone: string;
  email?: string;
  category?: string;
  message?: string;
  preferred_date: string;
  preferred_time: string;
  office_location: OfficeLocation;
  preferred_lawyer?: LawyerName;
  source?: string;
}

export interface CreateVideoInput {
  request_type: 'video';
  name: string;
  phone: string;
  email?: string;
  category?: string;
  message?: string;
  preferred_date: string;
  preferred_time: string;
  preferred_lawyer?: LawyerName;
  source?: string;
}

export interface CreateInfoInput {
  request_type: 'info';
  name: string;
  phone: string;
  email?: string;
  category?: string;
  message?: string;
  source?: string;
}

export type CreateConsultationInput =
  | CreateCallbackInput
  | CreateVisitInput
  | CreateVideoInput
  | CreateInfoInput;

/**
 * Update consultation input
 */
export interface UpdateConsultationInput {
  status?: ConsultationStatus;
  assigned_lawyer?: LawyerName;
  confirmed_date?: string;
  confirmed_time?: string;
  video_link?: string;
  admin_notes?: string;
  cancellation_reason?: string;

  // Payment
  consultation_fee?: number;
  payment_method?: PaymentMethod;
  payment_status?: PaymentStatus;
  payment_transaction_id?: string;
}

/**
 * Filters for querying consultations
 */
export interface ConsultationFilters {
  request_type?: RequestType;
  status?: ConsultationStatus;
  assigned_lawyer?: LawyerName;
  date_from?: string;
  date_to?: string;
  office_location?: OfficeLocation;
  payment_status?: PaymentStatus;
  search?: string;
}

/**
 * Statistics
 */
export interface ConsultationStats {
  total: number;
  pending: number;
  confirmed: number;
  completed: number;
  today: number;
  thisWeek: number;
  byType: Record<RequestType, number>;
  byStatus: Record<ConsultationStatus, number>;
  revenue: number;  // Total revenue from paid consultations
  avgLeadScore: number;
}

/**
 * Display labels
 */
export const REQUEST_TYPE_LABELS: Record<RequestType, string> = {
  callback: '콜백 요청',
  visit: '방문 상담',
  video: '화상 상담',
  info: '정보 문의',
};

export const STATUS_LABELS: Record<ConsultationStatus, string> = {
  pending: '대기중',
  contacted: '연락완료',
  confirmed: '확정',
  payment_pending: '결제대기',
  payment_completed: '결제완료',
  in_progress: '진행중',
  completed: '완료',
  cancelled: '취소',
  no_show: '노쇼',
};

export const STATUS_COLORS: Record<ConsultationStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  contacted: 'bg-blue-100 text-blue-800',
  confirmed: 'bg-green-100 text-green-800',
  payment_pending: 'bg-orange-100 text-orange-800',
  payment_completed: 'bg-emerald-100 text-emerald-800',
  in_progress: 'bg-purple-100 text-purple-800',
  completed: 'bg-gray-100 text-gray-800',
  cancelled: 'bg-red-100 text-red-800',
  no_show: 'bg-red-200 text-red-900',
};
```

---

## 6. API Considerations

### 6.1 Recommended Approach: **Unified Endpoint with Type Discrimination**

**Rationale**:
- Single source of truth
- Easier maintenance
- Consistent validation
- Simpler client code

**API Routes**:

```typescript
// POST /api/consultations
// Handles all 4 types based on request_type field

// GET /api/consultations
// Returns all consultations with filtering

// GET /api/consultations/[id]
// Returns specific consultation

// PATCH /api/consultations/[id]
// Updates consultation (admin only)

// DELETE /api/consultations/[id]
// Soft delete (admin only)
```

### 6.2 Validation Strategy

Use Zod schemas with discriminated unions:

```typescript
import { z } from 'zod';

const baseSchema = z.object({
  name: z.string().min(2, '이름은 2자 이상이어야 합니다'),
  phone: z.string().regex(/^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/, '올바른 전화번호를 입력하세요'),
  email: z.string().email().optional(),
  category: z.string().optional(),
  message: z.string().optional(),
  source: z.string().optional(),
});

const callbackSchema = baseSchema.extend({
  request_type: z.literal('callback'),
});

const visitSchema = baseSchema.extend({
  request_type: z.literal('visit'),
  preferred_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  preferred_time: z.string().regex(/^\d{2}:\d{2}$/),
  office_location: z.enum(['천안', '평택']),
  preferred_lawyer: z.enum(['육심원', '임은지']).optional(),
});

const videoSchema = baseSchema.extend({
  request_type: z.literal('video'),
  preferred_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  preferred_time: z.string().regex(/^\d{2}:\d{2}$/),
  preferred_lawyer: z.enum(['육심원', '임은지']).optional(),
});

const infoSchema = baseSchema.extend({
  request_type: z.literal('info'),
});

export const createConsultationSchema = z.discriminatedUnion('request_type', [
  callbackSchema,
  visitSchema,
  videoSchema,
  infoSchema,
]);

// Usage in API route:
export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = createConsultationSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      { error: '입력값이 올바르지 않습니다', details: validation.error.errors },
      { status: 400 }
    );
  }

  const data = validation.data;
  // data is properly typed as discriminated union

  // Insert to database...
}
```

---

## 7. Pros and Cons Analysis

### 7.1 Merged Table (Recommended)

**PROS**:
- **Single source of truth**: All customer interactions in one place
- **Simpler admin dashboard**: One table to manage, unified filters
- **Easier reporting**: Simple queries for analytics and statistics
- **Future-proof**: Easy to add new consultation types (e.g., 'phone', 'chat')
- **Payment integration**: Consistent payment tracking across all types
- **Better customer history**: Full timeline of all interactions
- **Reduced code duplication**: One set of CRUD operations
- **Consistent status workflow**: Same states, same transitions
- **SMS templates**: Unified template system with type discrimination

**CONS**:
- **More nullable fields**: Many fields will be NULL for certain types
- **Complex constraints**: Need CHECK constraints to enforce business rules
- **Slightly larger table**: More columns (but still normalized)
- **Migration complexity**: Need to merge existing data carefully

### 7.2 Separate Tables (Current State)

**PROS**:
- **Explicit schema**: Each table has only relevant fields
- **No nullable fields**: All required fields are NOT NULL
- **Clear separation**: Mental model matches physical structure

**CONS**:
- **Code duplication**: Separate CRUD for bookings and consultations
- **Complex admin dashboard**: Need to query/join two tables
- **Inconsistent status**: Different status values and workflows
- **Harder reporting**: Need UNION queries for statistics
- **Customer history fragmented**: Can't see full interaction timeline
- **Payment tracking inconsistent**: Would need to add to both tables
- **SMS logic duplicated**: Need separate templates for each table

---

## 8. Recommendation

**Recommendation**: **MERGE into unified `consultations` table**

**Reasoning**:
1. The user's insight is correct: "consultation requests ARE phone consultation requests"
2. All 4 form types represent customer inquiries with different fulfillment methods
3. Future paid service model requires consistent payment tracking
4. Admin dashboard will be much simpler with unified view
5. SMS/email notification logic is cleaner with single table
6. Customer relationship management is better with unified history

**Migration Risk**: LOW
- Zero-downtime migration possible
- Fully reversible
- Data integrity maintained
- Can run old and new tables side-by-side for testing

---

## 9. Implementation Checklist

### Phase 1: Database Migration
- [ ] Create new unified `consultations` table schema
- [ ] Create `sms_templates` and `sms_logs` tables
- [ ] Write migration script to merge data
- [ ] Test migration on staging database
- [ ] Execute migration on production
- [ ] Verify data integrity
- [ ] Keep old tables as backup for 2 weeks

### Phase 2: Backend Updates
- [ ] Update TypeScript types (`/types/consultation.ts`)
- [ ] Refactor `/lib/supabase/consultations.ts` for unified table
- [ ] Update `/app/api/consultations/route.ts` with Zod validation
- [ ] Remove old `/app/api/bookings/route.ts` (redirect to consultations)
- [ ] Update SMS sending logic (`/lib/sms/unified-sender.ts`)
- [ ] Update email notification logic

### Phase 3: Frontend Updates
- [ ] Update all forms to use unified API
- [ ] Update admin dashboard to show all consultation types
- [ ] Add request_type filter to admin UI
- [ ] Update detail pages to handle all types
- [ ] Add payment tracking UI (for future use)

### Phase 4: Testing
- [ ] Test all 4 form types end-to-end
- [ ] Test SMS notifications for each status
- [ ] Test admin CRUD operations
- [ ] Test status transitions
- [ ] Load test unified table
- [ ] Verify RLS policies

### Phase 5: Cleanup
- [ ] Drop old `bookings` table (after 2 weeks)
- [ ] Drop old `consultations` table (after 2 weeks)
- [ ] Update documentation
- [ ] Archive old API routes

---

## 10. Questions for Decision

Before proceeding with migration, please confirm:

1. **SMS Strategy**: Should we send confirmation SMS for ALL consultation types, or only scheduled ones (visit/video)?

2. **Payment Model**: When do you plan to launch paid consultations? Should we include payment fields now or add later?

3. **Backward Compatibility**: Do you need to support old URLs like `/api/bookings` for external integrations?

4. **Migration Timing**: When is the best time to run migration (low traffic period)?

5. **Admin Notification**: Should admin SMS alert be sent for ALL types or only high-priority ones?

---

## Conclusion

Merging `bookings` and `consultations` into a unified table is the **architecturally sound choice** for this project. It provides:

- **Simplicity**: One table, one API, one admin dashboard
- **Flexibility**: Easy to add new consultation types
- **Consistency**: Unified status workflow and notification system
- **Future-proof**: Ready for paid services and advanced features

The migration is low-risk, reversible, and can be executed with zero downtime.

**Next Steps**:
1. Review and approve this proposal
2. Answer the 5 questions above
3. Schedule migration execution
4. Execute Phase 1 (database migration)
5. Execute Phase 2-5 (backend/frontend updates)

---

**Author**: Claude (Backend & SEO Specialist)
**Date**: 2025-11-20
**File**: `/Users/hskim/theyool/CONSULTATION_SYSTEM_MERGE_PROPOSAL.md`
