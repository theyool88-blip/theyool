-- 법무법인 더율 사내 관리 시스템 RLS (Row Level Security) 정책
-- Created: 2025-11-21
-- Description: 관리자/직원 권한에 따른 데이터 접근 제어

-- RLS 활성화
ALTER TABLE users_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE legal_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- users_profiles 정책
-- ============================================================================

-- 관리자는 모든 사용자 프로필에 대해 전체 권한
CREATE POLICY "Admins have full access to users_profiles"
ON users_profiles
FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM users_profiles up
        WHERE up.auth_user_id = auth.uid()
        AND up.role = 'admin'
        AND up.is_active = true
    )
);

-- 직원은 자신의 프로필만 조회 가능
CREATE POLICY "Staff can view their own profile"
ON users_profiles
FOR SELECT
USING (auth_user_id = auth.uid());

-- 직원은 자신의 프로필만 수정 가능 (role 변경 제외)
CREATE POLICY "Staff can update their own profile"
ON users_profiles
FOR UPDATE
USING (auth_user_id = auth.uid())
WITH CHECK (
    auth_user_id = auth.uid()
    AND role = (SELECT role FROM users_profiles WHERE auth_user_id = auth.uid())
);

-- ============================================================================
-- clients 정책
-- ============================================================================

-- 관리자는 의뢰인 정보에 대해 전체 권한
CREATE POLICY "Admins have full access to clients"
ON clients
FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM users_profiles
        WHERE auth_user_id = auth.uid()
        AND role = 'admin'
        AND is_active = true
    )
);

-- 직원은 의뢰인 정보 조회만 가능
CREATE POLICY "Staff can view clients"
ON clients
FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM users_profiles
        WHERE auth_user_id = auth.uid()
        AND is_active = true
    )
);

-- ============================================================================
-- legal_cases 정책
-- ============================================================================

-- 관리자는 사건 정보에 대해 전체 권한
CREATE POLICY "Admins have full access to legal_cases"
ON legal_cases
FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM users_profiles
        WHERE auth_user_id = auth.uid()
        AND role = 'admin'
        AND is_active = true
    )
);

-- 직원은 사건 정보 조회만 가능
CREATE POLICY "Staff can view legal_cases"
ON legal_cases
FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM users_profiles
        WHERE auth_user_id = auth.uid()
        AND is_active = true
    )
);

-- ============================================================================
-- case_schedules 정책
-- ============================================================================

-- 관리자는 일정에 대해 전체 권한
CREATE POLICY "Admins have full access to case_schedules"
ON case_schedules
FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM users_profiles
        WHERE auth_user_id = auth.uid()
        AND role = 'admin'
        AND is_active = true
    )
);

-- 직원은 일정 조회만 가능
CREATE POLICY "Staff can view case_schedules"
ON case_schedules
FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM users_profiles
        WHERE auth_user_id = auth.uid()
        AND is_active = true
    )
);

-- ============================================================================
-- payments 정책
-- ============================================================================

-- 관리자는 입금내역에 대해 전체 권한
CREATE POLICY "Admins have full access to payments"
ON payments
FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM users_profiles
        WHERE auth_user_id = auth.uid()
        AND role = 'admin'
        AND is_active = true
    )
);

-- 직원은 입금내역 조회만 가능
CREATE POLICY "Staff can view payments"
ON payments
FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM users_profiles
        WHERE auth_user_id = auth.uid()
        AND is_active = true
    )
);

-- ============================================================================
-- 보안 강화: Service Role Key 우회 방지
-- ============================================================================

-- Service Role Key를 사용하는 백엔드 요청은 RLS를 우회하지만,
-- 프론트엔드에서는 반드시 인증된 사용자만 접근하도록 추가 검증 필요
