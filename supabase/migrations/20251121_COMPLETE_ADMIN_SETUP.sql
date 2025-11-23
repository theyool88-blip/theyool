-- ============================================================================
-- 법무법인 더율 사내 관리 시스템 - 완전한 데이터베이스 설정
-- Created: 2025-11-21
-- Description: 모든 테이블, 인덱스, 트리거, RLS 정책을 한 번에 생성
-- ============================================================================

-- ============================================================================
-- PART 1: 테이블 생성
-- ============================================================================

-- 1. users_profiles (사용자 프로필)
CREATE TABLE IF NOT EXISTS users_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    auth_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    role TEXT NOT NULL CHECK (role IN ('admin', 'staff')) DEFAULT 'staff',
    is_active BOOLEAN DEFAULT true,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. clients (의뢰인)
CREATE TABLE IF NOT EXISTS clients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    phone TEXT,
    phone2 TEXT,
    email TEXT,
    address TEXT,
    notes TEXT,
    notion_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. legal_cases (사건)
CREATE TABLE IF NOT EXISTS legal_cases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contract_number TEXT,
    case_name TEXT NOT NULL,
    client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
    assigned_lawyer TEXT,
    status TEXT CHECK (status IN ('진행중', '종결')) DEFAULT '진행중',
    case_type TEXT,
    court_case_number TEXT,
    court_name TEXT,
    default_courtroom TEXT,
    office TEXT,
    contract_date DATE,
    completion_date DATE,
    retainer_fee BIGINT DEFAULT 0,
    total_received BIGINT DEFAULT 0,
    outstanding_balance BIGINT DEFAULT 0,
    success_fee_agreement TEXT,
    calculated_success_fee BIGINT DEFAULT 0,
    installment_terms TEXT,
    payment_plan_notes TEXT,
    related_case_info TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. case_schedules (사건 일정)
CREATE TABLE IF NOT EXISTS case_schedules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_id UUID REFERENCES legal_cases(id) ON DELETE CASCADE,
    schedule_type TEXT CHECK (schedule_type IN ('trial', 'consultation', 'meeting')) DEFAULT 'trial',
    title TEXT NOT NULL,
    description TEXT,
    scheduled_date DATE NOT NULL,
    scheduled_time TIME,
    location TEXT,
    courtroom TEXT,
    assigned_lawyer TEXT,
    status TEXT CHECK (status IN ('scheduled', 'completed', 'cancelled')) DEFAULT 'scheduled',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. payments (입금내역)
CREATE TABLE IF NOT EXISTS payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_id UUID REFERENCES legal_cases(id) ON DELETE CASCADE,
    client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
    amount BIGINT NOT NULL,
    payment_type TEXT,
    payment_method TEXT,
    payment_date DATE NOT NULL,
    description TEXT,
    notes TEXT,
    created_by UUID REFERENCES users_profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- PART 2: 기존 테이블 확장 (consultations)
-- ============================================================================

ALTER TABLE consultations
ADD COLUMN IF NOT EXISTS assigned_to TEXT,
ADD COLUMN IF NOT EXISTS scheduled_date TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS completed_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS converted_to_case_id UUID REFERENCES legal_cases(id) ON DELETE SET NULL;

-- ============================================================================
-- PART 3: 인덱스 생성
-- ============================================================================

-- users_profiles 인덱스
CREATE INDEX IF NOT EXISTS idx_users_profiles_email ON users_profiles(email);
CREATE INDEX IF NOT EXISTS idx_users_profiles_role ON users_profiles(role);

-- clients 인덱스
CREATE INDEX IF NOT EXISTS idx_clients_name ON clients(name);
CREATE INDEX IF NOT EXISTS idx_clients_phone ON clients(phone);

-- legal_cases 인덱스
CREATE INDEX IF NOT EXISTS idx_legal_cases_client_id ON legal_cases(client_id);
CREATE INDEX IF NOT EXISTS idx_legal_cases_status ON legal_cases(status);
CREATE INDEX IF NOT EXISTS idx_legal_cases_office ON legal_cases(office);
CREATE INDEX IF NOT EXISTS idx_legal_cases_contract_date ON legal_cases(contract_date);
CREATE INDEX IF NOT EXISTS idx_legal_cases_assigned_lawyer ON legal_cases(assigned_lawyer);

-- case_schedules 인덱스
CREATE INDEX IF NOT EXISTS idx_case_schedules_case_id ON case_schedules(case_id);
CREATE INDEX IF NOT EXISTS idx_case_schedules_scheduled_date ON case_schedules(scheduled_date);
CREATE INDEX IF NOT EXISTS idx_case_schedules_status ON case_schedules(status);

-- payments 인덱스
CREATE INDEX IF NOT EXISTS idx_payments_case_id ON payments(case_id);
CREATE INDEX IF NOT EXISTS idx_payments_client_id ON payments(client_id);
CREATE INDEX IF NOT EXISTS idx_payments_payment_date ON payments(payment_date);

-- consultations 인덱스
CREATE INDEX IF NOT EXISTS idx_consultations_assigned_to ON consultations(assigned_to);
CREATE INDEX IF NOT EXISTS idx_consultations_scheduled_date ON consultations(scheduled_date);
CREATE INDEX IF NOT EXISTS idx_consultations_converted_to_case_id ON consultations(converted_to_case_id);

-- ============================================================================
-- PART 4: 트리거 함수 및 트리거
-- ============================================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_users_profiles_updated_at ON users_profiles;
CREATE TRIGGER update_users_profiles_updated_at BEFORE UPDATE ON users_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_clients_updated_at ON clients;
CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON clients
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_legal_cases_updated_at ON legal_cases;
CREATE TRIGGER update_legal_cases_updated_at BEFORE UPDATE ON legal_cases
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_case_schedules_updated_at ON case_schedules;
CREATE TRIGGER update_case_schedules_updated_at BEFORE UPDATE ON case_schedules
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_payments_updated_at ON payments;
CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON payments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- PART 5: RLS 정책
-- ============================================================================

-- RLS 활성화
ALTER TABLE users_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE legal_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- users_profiles 정책
DROP POLICY IF EXISTS "Admins have full access to users_profiles" ON users_profiles;
CREATE POLICY "Admins have full access to users_profiles"
ON users_profiles FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM users_profiles up
        WHERE up.auth_user_id = auth.uid()
        AND up.role = 'admin'
        AND up.is_active = true
    )
);

DROP POLICY IF EXISTS "Staff can view their own profile" ON users_profiles;
CREATE POLICY "Staff can view their own profile"
ON users_profiles FOR SELECT
USING (auth_user_id = auth.uid());

DROP POLICY IF EXISTS "Staff can update their own profile" ON users_profiles;
CREATE POLICY "Staff can update their own profile"
ON users_profiles FOR UPDATE
USING (auth_user_id = auth.uid())
WITH CHECK (
    auth_user_id = auth.uid()
    AND role = (SELECT role FROM users_profiles WHERE auth_user_id = auth.uid())
);

-- clients 정책
DROP POLICY IF EXISTS "Admins have full access to clients" ON clients;
CREATE POLICY "Admins have full access to clients"
ON clients FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM users_profiles
        WHERE auth_user_id = auth.uid()
        AND role = 'admin'
        AND is_active = true
    )
);

DROP POLICY IF EXISTS "Staff can view clients" ON clients;
CREATE POLICY "Staff can view clients"
ON clients FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM users_profiles
        WHERE auth_user_id = auth.uid()
        AND is_active = true
    )
);

-- legal_cases 정책
DROP POLICY IF EXISTS "Admins have full access to legal_cases" ON legal_cases;
CREATE POLICY "Admins have full access to legal_cases"
ON legal_cases FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM users_profiles
        WHERE auth_user_id = auth.uid()
        AND role = 'admin'
        AND is_active = true
    )
);

DROP POLICY IF EXISTS "Staff can view legal_cases" ON legal_cases;
CREATE POLICY "Staff can view legal_cases"
ON legal_cases FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM users_profiles
        WHERE auth_user_id = auth.uid()
        AND is_active = true
    )
);

-- case_schedules 정책
DROP POLICY IF EXISTS "Admins have full access to case_schedules" ON case_schedules;
CREATE POLICY "Admins have full access to case_schedules"
ON case_schedules FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM users_profiles
        WHERE auth_user_id = auth.uid()
        AND role = 'admin'
        AND is_active = true
    )
);

DROP POLICY IF EXISTS "Staff can view case_schedules" ON case_schedules;
CREATE POLICY "Staff can view case_schedules"
ON case_schedules FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM users_profiles
        WHERE auth_user_id = auth.uid()
        AND is_active = true
    )
);

-- payments 정책
DROP POLICY IF EXISTS "Admins have full access to payments" ON payments;
CREATE POLICY "Admins have full access to payments"
ON payments FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM users_profiles
        WHERE auth_user_id = auth.uid()
        AND role = 'admin'
        AND is_active = true
    )
);

DROP POLICY IF EXISTS "Staff can view payments" ON payments;
CREATE POLICY "Staff can view payments"
ON payments FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM users_profiles
        WHERE auth_user_id = auth.uid()
        AND is_active = true
    )
);

-- ============================================================================
-- PART 6: 코멘트
-- ============================================================================

COMMENT ON TABLE users_profiles IS '사내 사용자 프로필 (관리자, 직원)';
COMMENT ON TABLE clients IS '의뢰인 정보';
COMMENT ON TABLE legal_cases IS '법률 사건 정보';
COMMENT ON TABLE case_schedules IS '사건 일정 (재판, 상담, 미팅)';
COMMENT ON TABLE payments IS '입금 내역';

COMMENT ON COLUMN consultations.assigned_to IS '담당 변호사명';
COMMENT ON COLUMN consultations.scheduled_date IS '상담 예정 일시';
COMMENT ON COLUMN consultations.completed_at IS '상담 완료 일시';
COMMENT ON COLUMN consultations.converted_to_case_id IS '사건으로 전환된 경우 사건 ID';

-- ============================================================================
-- 완료
-- ============================================================================
