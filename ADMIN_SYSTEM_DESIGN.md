ㅣ# 법무법인 더율 - 사내 관리 시스템 설계

**작성일**: 2025-11-21
**버전**: 1.0

---

## 📋 시스템 개요

### 프로젝트 구성
```
theyool/              # 공개 홈페이지 (기존)
theyool-admin/        # 사내 관리 시스템 (신규)
theyool-client/       # 의뢰인 포털 (차후)
```

---

## 🎯 핵심 기능 (Priority Order)

### 1. 대시보드 (홈 화면)
```
┌─────────────────────────────────────────────────────┐
│  진행중인 사건: 45건                                    │
└─────────────────────────────────────────────────────┘

┌────────────── 이번 주 일정 (2025.11.18 - 11.24) ──────────────┐
│                                                                │
│  월 11/18        화 11/19        수 11/20        목 11/21      │
│  ─────────       ─────────       ─────────       ─────────    │
│  [상담] 10:00    [변론] 14:00    [상담] 11:00    [상담] 15:00  │
│  김철수님        이영기v김효정    박민수님        최지연님      │
│                                                                │
│  금 11/22        토 11/23        일 11/24                      │
│  ─────────       ─────────       ─────────                    │
│  [변론] 10:00    (없음)          (없음)                        │
│  조진주v김성욱                                                  │
└────────────────────────────────────────────────────────────────┘

┌─────────────── 최근 활동 ───────────────┐
│ • 이영기v김효정 - 변론기일 추가 (2시간 전) │
│ • 새 상담 신청 - 김철수 (5시간 전)        │
│ • 입금 확인 - 한정희 600만원 (1일 전)     │
└──────────────────────────────────────────┘
```

### 2. 사건 관리 (Cases Management)
- **목록 뷰**: 필터링, 검색, 정렬
- **상세 뷰**: 사건 정보, 일정, 입출금, 메모
- **생성/수정**: 사건 등록 및 업데이트

### 3. 의뢰인 관리 (Clients Management)
- **목록 뷰**: 의뢰인 리스트
- **상세 뷰**: 연락처, 관련 사건, 입금 내역
- **생성/수정**: 의뢰인 정보 등록

### 4. 입출금 관리 (Payments Management)
- **입금 내역**: 사건별 입금 기록
- **미수금 추적**: 미납 금액 관리
- **성공보수 계산**: 자동 계산 및 청구

### 5. 일정 관리 (Schedule Management)
- **상담 일정**: 공개 홈페이지 상담 신청 연동
- **변론 기일**: 재판 일정 등록 및 관리
- **알림**: 일정 전 자동 알림 (차후)

---

## 🗄️ 데이터베이스 설계

### 분석: 기존 CSV 컬럼 구조

**사건목록 CSV (231건)**
```
- 계약서번호: 내부 관리 번호
- 수임일: 사건 접수일
- 사건: 사건명 (예: "최금하v박현철")
- 수임사무실: 평택/천안/소송구조
- 의뢰인: 의뢰인명 + Notion 링크
- 전화번호: 연락처
- 진행: 진행중/종결
- 사건번호: 법원 사건번호
- 입금액: 총 입금액
- 사건종류: 이혼/민사/형사/상간자 등
- 성보약정: 성공보수 약정 내용
- 발생성보: 계산된 성공보수
- 착수금: 초기 착수금
- 미수금 처리 방안: 메모
- 분납조건: 분할납부 조건
- 미수금: 미납 금액
- 관계사건: 관련 사건 링크
- 관할법원: 담당 법원
- 디폴트 법정: 법정 호수
```

### Supabase 테이블 설계

#### 1. clients (의뢰인)
```sql
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  phone TEXT,
  phone2 TEXT, -- 추가 연락처
  email TEXT,
  address TEXT,
  notes TEXT, -- 의뢰인 메모
  notion_id TEXT, -- Notion 링크 ID
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_clients_name ON clients(name);
CREATE INDEX idx_clients_phone ON clients(phone);
```

#### 2. legal_cases (사건)
```sql
CREATE TABLE legal_cases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- 기본 정보
  contract_number TEXT UNIQUE, -- 계약서번호
  case_name TEXT NOT NULL, -- 사건명 (예: "최금하v박현철")
  client_id UUID REFERENCES clients(id),

  -- 사건 상태
  status TEXT DEFAULT 'active', -- 'active', 'completed', 'pending'
  case_type TEXT, -- '이혼', '민사', '형사', '상간자', '증거보전' 등

  -- 법원 정보
  court_case_number TEXT, -- 법원 사건번호
  court_name TEXT, -- 관할법원
  default_courtroom TEXT, -- 디폴트 법정

  -- 사무실 정보
  office TEXT, -- '평택', '천안', '소송구조'
  assigned_lawyer TEXT, -- 담당 변호사

  -- 날짜
  contract_date DATE, -- 수임일
  completion_date DATE, -- 종결일

  -- 재무 정보
  retainer_fee BIGINT DEFAULT 0, -- 착수금
  total_received BIGINT DEFAULT 0, -- 총 입금액
  outstanding_balance BIGINT DEFAULT 0, -- 미수금
  success_fee_agreement TEXT, -- 성보약정
  calculated_success_fee BIGINT DEFAULT 0, -- 발생성보

  -- 분납 정보
  installment_terms TEXT, -- 분납조건
  payment_plan_notes TEXT, -- 미수금 처리 방안

  -- 관계 사건
  related_case_id UUID REFERENCES legal_cases(id), -- 관계사건

  -- 메모
  notes TEXT,

  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_cases_status ON legal_cases(status);
CREATE INDEX idx_cases_client ON legal_cases(client_id);
CREATE INDEX idx_cases_contract_number ON legal_cases(contract_number);
CREATE INDEX idx_cases_office ON legal_cases(office);
```

#### 3. case_schedules (일정)
```sql
CREATE TABLE case_schedules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  case_id UUID REFERENCES legal_cases(id),

  -- 일정 정보
  schedule_type TEXT NOT NULL, -- 'trial', 'consultation', 'meeting', 'deadline'
  title TEXT NOT NULL,
  description TEXT,

  -- 날짜/시간
  scheduled_date DATE NOT NULL,
  scheduled_time TIME,
  duration_minutes INTEGER DEFAULT 60,

  -- 장소
  location TEXT, -- 법원명, 사무실 등
  courtroom TEXT, -- 법정 호수

  -- 알림
  reminder_sent BOOLEAN DEFAULT false,
  reminder_date TIMESTAMP,

  -- 메모
  notes TEXT,

  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_schedules_date ON case_schedules(scheduled_date);
CREATE INDEX idx_schedules_case ON case_schedules(case_id);
CREATE INDEX idx_schedules_type ON case_schedules(schedule_type);
```

#### 4. payments (입출금)
```sql
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  case_id UUID REFERENCES legal_cases(id),
  client_id UUID REFERENCES clients(id),

  -- 금액 정보
  amount BIGINT NOT NULL,
  payment_type TEXT NOT NULL, -- 'retainer', 'installment', 'success_fee', 'refund'
  payment_method TEXT, -- 'cash', 'transfer', 'card'

  -- 날짜
  payment_date DATE NOT NULL,

  -- 메모
  description TEXT,
  notes TEXT,

  -- 수령자 정보
  recipient TEXT, -- 입금받은 계좌/사람

  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_payments_case ON payments(case_id);
CREATE INDEX idx_payments_client ON payments(client_id);
CREATE INDEX idx_payments_date ON payments(payment_date);
```

#### 5. consultations (상담 신청) - 기존 테이블 활용
```sql
-- 공개 홈페이지의 상담 신청 데이터
-- 기존 테이블에 컬럼 추가

ALTER TABLE consultations ADD COLUMN IF NOT EXISTS assigned_to TEXT;
ALTER TABLE consultations ADD COLUMN IF NOT EXISTS scheduled_date TIMESTAMP;
ALTER TABLE consultations ADD COLUMN IF NOT EXISTS completed_at TIMESTAMP;
ALTER TABLE consultations ADD COLUMN IF NOT EXISTS converted_to_case_id UUID REFERENCES legal_cases(id);
```

#### 6. case_documents (사건 문서)
```sql
CREATE TABLE case_documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  case_id UUID REFERENCES legal_cases(id),

  -- 문서 정보
  title TEXT NOT NULL,
  file_type TEXT, -- 'google_drive', 'onedrive', 'supabase'
  file_url TEXT NOT NULL,
  file_size BIGINT,

  -- 분류
  category TEXT, -- 'contract', 'evidence', 'judgment', 'correspondence'

  -- 메타데이터
  uploaded_by TEXT,
  uploaded_at TIMESTAMP DEFAULT NOW(),

  notes TEXT
);

CREATE INDEX idx_documents_case ON case_documents(case_id);
```

#### 7. activity_logs (활동 로그)
```sql
CREATE TABLE activity_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- 활동 정보
  action_type TEXT NOT NULL, -- 'case_created', 'payment_received', 'schedule_added'
  entity_type TEXT NOT NULL, -- 'case', 'client', 'payment', 'schedule'
  entity_id UUID,

  -- 변경 사항
  old_value JSONB,
  new_value JSONB,

  -- 사용자
  user_id UUID,
  user_name TEXT,

  -- 메타데이터
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_logs_entity ON activity_logs(entity_type, entity_id);
CREATE INDEX idx_logs_created ON activity_logs(created_at DESC);
```

#### 8. staff_members (직원) - 차후
```sql
CREATE TABLE staff_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  auth_user_id UUID REFERENCES auth.users(id),

  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL, -- 'admin', 'lawyer', 'staff'
  phone TEXT,

  -- 권한
  permissions JSONB DEFAULT '{"cases": "write", "clients": "write", "payments": "write"}',

  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🎨 화면 구조

### 1. Dashboard (`/admin`)
```
┌─────────────────────────────────────────────────────────┐
│  [법무법인 더율 관리 시스템]              [로그아웃]      │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  📊 진행중인 사건: 45건                                    │
│                                                          │
│  ┌──────── 이번 주 일정 ────────┐                        │
│  │  월  화  수  목  금  토  일   │                        │
│  │  [일정 표시]                 │                        │
│  └─────────────────────────────┘                        │
│                                                          │
│  ┌──── 최근 활동 ────┐  ┌──── 빠른 작업 ────┐          │
│  │ • 사건 업데이트   │  │  [새 사건 등록]    │          │
│  │ • 입금 확인       │  │  [상담 신청 확인]  │          │
│  │ • 일정 추가       │  │  [일정 추가]       │          │
│  └──────────────────┘  └───────────────────┘          │
└─────────────────────────────────────────────────────────┘
```

### 2. 사건 관리 (`/admin/cases`)
```
┌─────────────────────────────────────────────────────────┐
│  사건 관리                              [+ 새 사건 등록]  │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  필터: [전체] [진행중] [종결]  검색: [________]  [검색]  │
│                                                          │
│  ┌────────────────────────────────────────────────────┐ │
│  │ 사건명         │ 의뢰인  │ 상태   │ 담당   │ 작업  │ │
│  ├────────────────────────────────────────────────────┤ │
│  │ 최금하v박현철  │ 최금하  │ 진행중 │ 임은지 │ [보기]│ │
│  │ 이영기v김효정  │ 이영기  │ 진행중 │ 육심원 │ [보기]│ │
│  └────────────────────────────────────────────────────┘ │
│                                                          │
│  [1] [2] [3] ... [10]  (페이지네이션)                   │
└─────────────────────────────────────────────────────────┘
```

### 3. 사건 상세 (`/admin/cases/[id]`)
```
┌─────────────────────────────────────────────────────────┐
│  ← 목록으로         최금하v박현철            [편집] [삭제] │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──── 기본 정보 ────┐  ┌──── 재무 정보 ────┐          │
│  │ 계약번호: 683      │  │ 착수금: 5,000,000 │          │
│  │ 의뢰인: 최금하     │  │ 입금액: 8,200,000 │          │
│  │ 수임일: 2024-01-26│  │ 미수금: 0         │          │
│  │ 상태: 진행중       │  │ 성보: 3,200,000   │          │
│  └───────────────────┘  └──────────────────┘          │
│                                                          │
│  ┌──────────── 변론 기일 ────────────┐                  │
│  │ • 2025-01-15 10:00 - 대전법원     │  [+ 일정 추가]    │
│  │ • 2024-12-10 14:00 - 대전법원     │                  │
│  └──────────────────────────────────┘                  │
│                                                          │
│  ┌──────────── 입금 내역 ────────────┐                  │
│  │ • 2024-08-12  5,000,000 (착수금)  │  [+ 입금 추가]    │
│  │ • 2024-02-01  3,200,000 (중도금)  │                  │
│  └──────────────────────────────────┘                  │
│                                                          │
│  ┌──────────── 메모 ─────────────────┐                 │
│  │ 2025.8.12. 김순환에게 성공보수 안내 │  [메모 추가]    │
│  └──────────────────────────────────┘                  │
└─────────────────────────────────────────────────────────┘
```

### 4. 의뢰인 관리 (`/admin/clients`)
```
┌─────────────────────────────────────────────────────────┐
│  의뢰인 관리                            [+ 새 의뢰인 등록]│
├─────────────────────────────────────────────────────────┤
│                                                          │
│  검색: [________]  [검색]                                │
│                                                          │
│  ┌────────────────────────────────────────────────────┐ │
│  │ 이름   │ 연락처        │ 사건수 │ 최근 상담  │ 작업  │ │
│  ├────────────────────────────────────────────────────┤ │
│  │ 최금하 │ 010-5551-9497│   1   │ 2024-01-26│ [보기]│ │
│  │ 이영기 │ 010-3889-9366│   2   │ 2023-12-06│ [보기]│ │
│  └────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

### 5. 입출금 관리 (`/admin/payments`)
```
┌─────────────────────────────────────────────────────────┐
│  입출금 관리                                [+ 입금 등록] │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  기간: [2025-01-01] ~ [2025-01-31]  [검색]              │
│                                                          │
│  ┌────────────────────────────────────────────────────┐ │
│  │ 일자      │ 사건명      │ 의뢰인 │ 금액      │ 구분 │ │
│  ├────────────────────────────────────────────────────┤ │
│  │ 01-26    │ 최금하v박현철│ 최금하 │5,000,000 │착수금│ │
│  │ 02-01    │ 오영모v신스웨│ 오영모 │4,950,000 │착수금│ │
│  └────────────────────────────────────────────────────┘ │
│                                                          │
│  총 입금: 82,450,000원                                   │
│  미수금 합계: 3,300,000원                                │
└─────────────────────────────────────────────────────────┘
```

---

## 🔐 권한 관리 (RLS)

### 관리자 테이블
```sql
CREATE TABLE admins (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id),
  role TEXT DEFAULT 'staff' -- 'super_admin', 'admin', 'staff'
);
```

### RLS 정책
```sql
-- 관리자만 모든 테이블 접근 가능
CREATE POLICY "Admins can do anything"
ON legal_cases FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM admins WHERE user_id = auth.uid()
  )
);

-- 공개 홈페이지는 상담만 생성 가능
CREATE POLICY "Anyone can insert consultations"
ON consultations FOR INSERT
TO anon
WITH CHECK (true);
```

---

## 🚀 개발 단계

### Phase 1: 기초 구조 (1주)
- [x] 프로젝트 생성 (theyool-admin)
- [ ] Supabase 마이그레이션 작성
- [ ] 기본 인증 시스템
- [ ] 레이아웃 (헤더, 사이드바)

### Phase 2: 대시보드 & 주간 캘린더 (1주)
- [ ] 대시보드 UI
- [ ] 주간 캘린더 컴포넌트
- [ ] 진행중인 사건 수 표시
- [ ] 최근 활동 피드

### Phase 3: 사건 관리 (2주)
- [ ] 사건 목록 페이지
- [ ] 사건 상세 페이지
- [ ] 사건 생성/수정 폼
- [ ] CSV 데이터 마이그레이션

### Phase 4: 의뢰인 & 입출금 (1주)
- [ ] 의뢰인 관리 CRUD
- [ ] 입출금 관리 CRUD
- [ ] 미수금 추적 기능

### Phase 5: 일정 관리 (1주)
- [ ] 상담 일정 관리
- [ ] 변론 기일 관리
- [ ] 일정-사건 연결

### Phase 6: 고도화 (차후)
- [ ] 알림 시스템
- [ ] 파일 관리
- [ ] 통계 대시보드
- [ ] 검색 최적화

---

## 📊 데이터 마이그레이션 전략

### CSV → Supabase

1. **의뢰인 추출**
   - CSV의 "의뢰인" 컬럼에서 중복 제거
   - clients 테이블에 INSERT

2. **사건 마이그레이션**
   - 각 행을 legal_cases 테이블에 INSERT
   - client_id 연결
   - 금액 데이터 정규화 (쉼표 제거)

3. **관계사건 연결**
   - "관계사건" 컬럼 파싱
   - related_case_id 업데이트

4. **검증**
   - 총 사건 수 확인 (231건)
   - 데이터 무결성 검사

---

## 🛠️ 기술 스택

### Frontend
- Next.js 15+ (App Router)
- TypeScript
- Tailwind CSS 4.0
- React Hook Form (폼 관리)
- date-fns (날짜 처리)

### Backend
- Supabase (PostgreSQL)
- Supabase Auth
- Supabase Storage (파일 저장)

### Libraries
- @tanstack/react-table (테이블)
- recharts (차트/통계)
- react-big-calendar (캘린더)

---

## 📝 다음 단계

1. [ ] 이 설계 문서 검토 및 승인
2. [ ] 의뢰인 목록 CSV 확인
3. [ ] 입출금 내역 CSV 확인
4. [ ] theyool-admin 프로젝트 생성
5. [ ] Supabase 마이그레이션 파일 작성
6. [ ] 인증 시스템 구현

---

**작성자**: Claude
**최종 수정**: 2025-11-21