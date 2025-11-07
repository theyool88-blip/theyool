# Supabase 설정 가이드

**단계별 설정 방법**

---

## 1단계: Supabase 프로젝트 생성

### 1. Supabase 계정 생성 및 로그인
1. https://supabase.com 접속
2. "Start your project" 클릭
3. GitHub 또는 이메일로 가입/로그인

### 2. 새 프로젝트 생성
1. "New project" 클릭
2. 프로젝트 정보 입력:
   - **Name**: `theyool` 또는 `lawfirm-theyool`
   - **Database Password**: 강력한 비밀번호 설정 (안전하게 저장!)
   - **Region**: `Northeast Asia (Seoul)` 또는 `Southeast Asia (Singapore)`
   - **Pricing Plan**: `Free` (개발/테스트용)
3. "Create new project" 클릭
4. 프로젝트 생성까지 약 2분 대기

---

## 2단계: API 키 복사

### 1. Project Settings 이동
1. 좌측 사이드바 하단 ⚙️ (Settings) 클릭
2. "API" 메뉴 클릭

### 2. API 정보 복사
다음 3가지 값을 복사하세요:

```
Project URL: https://xxxxxxxxxxxxx.supabase.co
anon public: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
service_role: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (secret!)
```

⚠️ **주의**: `service_role` 키는 절대 공개하지 마세요!

---

## 3단계: 환경 변수 설정

### 1. `.env.local` 파일 수정
프로젝트 루트의 `.env.local` 파일을 열고 복사한 값으로 교체:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 2. 개발 서버 재시작
환경 변수가 변경되었으므로 개발 서버를 재시작하세요:

```bash
# 현재 서버 종료 (Ctrl+C)
# 다시 시작
npm run dev
```

---

## 4단계: 데이터베이스 스키마 생성

### 1. SQL Editor 열기
1. Supabase 대시보드에서 좌측 사이드바 "SQL Editor" 클릭
2. "New query" 클릭

### 2. SQL 스크립트 실행
`supabase/migrations/001_initial_schema.sql` 파일의 내용을 복사해서 붙여넣기

또는 아래 SQL을 직접 복사:

```sql
-- consultations 테이블 생성
CREATE TABLE IF NOT EXISTS consultations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  category TEXT,
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

-- RLS 정책
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create consultations"
  ON consultations FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can view consultations"
  ON consultations FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Only authenticated users can update consultations"
  ON consultations FOR UPDATE
  USING (auth.role() = 'authenticated');

-- 자동 updated_at 트리거
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
```

3. "Run" 버튼 클릭 (또는 Cmd/Ctrl + Enter)
4. "Success. No rows returned" 메시지 확인

---

## 5단계: 테이블 확인

### 1. Table Editor 열기
1. 좌측 사이드바 "Table Editor" 클릭
2. `consultations` 테이블이 생성되었는지 확인

### 2. 테이블 구조 확인
다음 컬럼들이 있어야 합니다:
- `id` (uuid, primary key)
- `name` (text)
- `phone` (text)
- `email` (text, nullable)
- `category` (text, nullable)
- `message` (text, nullable)
- `status` (text, default: 'pending')
- `admin_notes` (text, nullable)
- `created_at` (timestamptz)
- `updated_at` (timestamptz)

---

## 6단계: 연결 테스트 (선택)

### 브라우저 콘솔에서 테스트
1. http://localhost:3000 접속
2. F12 (개발자 도구) 열기
3. Console 탭에서 다음 코드 실행:

```javascript
// Supabase 클라이언트 가져오기 (콘솔에서는 안됨)
// 대신 Network 탭에서 API 호출 확인
```

더 나은 방법은 다음 단계에서 **상담문의 폼을 만들어서 실제로 테스트**하는 것입니다.

---

## 7단계: 관리자 계정 생성 (Phase 3에서 필요)

지금은 건너뛰고 Phase 3에서 진행합니다.

나중에 필요할 때:
1. Authentication > Users
2. "Add user" 클릭
3. Email/Password 입력
4. "Create user" 클릭

---

## 완료 체크리스트

- [x] Supabase 패키지 설치 완료
- [x] 환경 변수 템플릿 생성
- [x] Supabase 클라이언트 코드 작성
- [x] TypeScript 타입 정의 완료
- [x] SQL 스크립트 작성 완료
- [ ] Supabase 프로젝트 생성 ← **지금 진행**
- [ ] API 키 복사 및 환경 변수 설정
- [ ] 데이터베이스 스키마 실행
- [ ] 테이블 생성 확인

---

## 다음 단계

설정이 완료되면:
1. **상담문의 폼 UI 개발**
2. **API Route 개발** (`/api/consultations`)
3. **폼 제출 테스트**

---

## 트러블슈팅

### 문제: "Invalid API key"
- `.env.local` 파일의 키가 정확한지 확인
- 개발 서버 재시작

### 문제: "relation does not exist"
- SQL 스크립트를 실행했는지 확인
- Table Editor에서 테이블 존재 여부 확인

### 문제: RLS 정책 오류
- SQL Editor에서 RLS 정책이 올바르게 생성되었는지 확인
- Authentication > Policies에서 정책 확인

---

**준비 완료!** 이제 Supabase 프로젝트를 생성하고 위 단계를 따라하세요.
