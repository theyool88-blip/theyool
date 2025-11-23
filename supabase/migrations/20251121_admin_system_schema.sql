-- 법무법인 더율 사내 관리 시스템 데이터베이스 스키마
-- Created: 2025-11-21
-- Description: 사용자, 의뢰인, 사건, 일정, 입금내역 테이블 생성

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
    notion_id TEXT, -- Notion 페이지 ID
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. legal_cases (사건)
CREATE TABLE IF NOT EXISTS legal_cases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- 기본 정보
    contract_number TEXT, -- 계약서번호
    case_name TEXT NOT NULL, -- 사건명
    client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
    assigned_lawyer TEXT, -- 담당변호사
    status TEXT CHECK (status IN ('진행중', '종결')) DEFAULT '진행중',

    -- 사건 상세
    case_type TEXT, -- 사건종류 (이혼, 민사, 형사, 상간자 등)
    court_case_number TEXT, -- 사건번호
    court_name TEXT, -- 관할법원
    default_courtroom TEXT, -- 법정
    office TEXT, -- 수임사무실 (평택, 천안, 소송구조)

    -- 날짜
    contract_date DATE, -- 수임일
    completion_date DATE, -- 종료일

    -- 금액 (단위: 원)
    retainer_fee BIGINT DEFAULT 0, -- 착수금
    total_received BIGINT DEFAULT 0, -- 입금액
    outstanding_balance BIGINT DEFAULT 0, -- 미수금

    -- 성공보수
    success_fee_agreement TEXT, -- 성보약정
    calculated_success_fee BIGINT DEFAULT 0, -- 발생성보

    -- 분납 및 미수금 처리
    installment_terms TEXT, -- 분납조건
    payment_plan_notes TEXT, -- 미수금 처리 방안

    -- 기타
    related_case_info TEXT, -- 관계사건
    notes TEXT, -- 메모

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

    location TEXT, -- 장소
    courtroom TEXT, -- 법정
    assigned_lawyer TEXT, -- 담당 변호사

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

    amount BIGINT NOT NULL, -- 금액
    payment_type TEXT, -- 결제 유형 (착수금, 성공보수, 추가비용 등)
    payment_method TEXT, -- 결제 수단 (현금, 계좌이체, 카드 등)

    payment_date DATE NOT NULL,
    description TEXT,
    notes TEXT,

    created_by UUID REFERENCES users_profiles(id),

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_users_profiles_email ON users_profiles(email);
CREATE INDEX IF NOT EXISTS idx_users_profiles_role ON users_profiles(role);

CREATE INDEX IF NOT EXISTS idx_clients_name ON clients(name);
CREATE INDEX IF NOT EXISTS idx_clients_phone ON clients(phone);

CREATE INDEX IF NOT EXISTS idx_legal_cases_client_id ON legal_cases(client_id);
CREATE INDEX IF NOT EXISTS idx_legal_cases_status ON legal_cases(status);
CREATE INDEX IF NOT EXISTS idx_legal_cases_office ON legal_cases(office);
CREATE INDEX IF NOT EXISTS idx_legal_cases_contract_date ON legal_cases(contract_date);
CREATE INDEX IF NOT EXISTS idx_legal_cases_assigned_lawyer ON legal_cases(assigned_lawyer);

CREATE INDEX IF NOT EXISTS idx_case_schedules_case_id ON case_schedules(case_id);
CREATE INDEX IF NOT EXISTS idx_case_schedules_scheduled_date ON case_schedules(scheduled_date);
CREATE INDEX IF NOT EXISTS idx_case_schedules_status ON case_schedules(status);

CREATE INDEX IF NOT EXISTS idx_payments_case_id ON payments(case_id);
CREATE INDEX IF NOT EXISTS idx_payments_client_id ON payments(client_id);
CREATE INDEX IF NOT EXISTS idx_payments_payment_date ON payments(payment_date);

-- updated_at 자동 업데이트 트리거 함수
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 트리거 생성
CREATE TRIGGER update_users_profiles_updated_at BEFORE UPDATE ON users_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON clients
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_legal_cases_updated_at BEFORE UPDATE ON legal_cases
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_case_schedules_updated_at BEFORE UPDATE ON case_schedules
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON payments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
