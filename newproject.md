# 법무법인 더율 - 사내 관리 시스템 프로젝트 기획

**작성일**: 2025-11-21
**목적**: 법무법인 내부 업무 관리 및 의뢰인 포털 시스템 개발

---

## 📋 프로젝트 개요

### 프로젝트 구성 (3개 시스템)

```
1. theyool/                      # 공개 홈페이지 (기존)
   - 마케팅, 콘텐츠, 상담 신청
   - 누구나 접근 가능

2. theyool-admin/                # 사내 관리 시스템 (신규)
   - 직원 전용
   - 상담/사건/일정 관리
   - 의뢰인 데이터 입력/수정

3. theyool-client/               # 의뢰인 포털 (차후)
   - 의뢰인 전용
   - 본인 사건만 조회
   - 사건 일정 확인
   - 서류 다운로드
```

---

## 🎯 Phase 1: 사내 관리 시스템 (theyool-admin)

### 핵심 기능

#### 1. 달력 뷰 (Calendar View)
- **일정 표시**: 상담 일정, 재판 일정, 기타 이벤트
- **일자별 요약**: 각 날짜에 이벤트 미리보기 (많으면 일부만)
- **상세 보기**: 날짜 클릭 시 해당 일의 전체 일정 표시

#### 2. 상담 관리
- 공개 홈페이지의 상담 데이터 접근
- 조회, 수정, 삭제 기능
- 상태 변경 (대기 → 완료 등)

#### 3. 사건 관리
- 사건 등록 및 관리
- 의뢰인 정보 연결
- 담당 변호사 배정
- 사건 진행 상황 추적

#### 4. 재판 일정 관리
- 재판 일정 등록
- 사건과 연결
- 법원 정보, 시간, 메모 등

#### 5. 알림 시스템 (차후)
- 재판 전날 의뢰인에게 자동 알림
- SMS/이메일 발송

---

## 🗄️ 데이터베이스 설계

### 공유 Supabase 데이터베이스

```sql
-- 기존 테이블 (공개 홈페이지)
- consultations: 상담 신청 데이터
- cases: 성공사례
- blog_posts: 변호사 칼럼
- faqs: 이혼큐레이션

-- 신규 테이블 (사내 시스템)

-- 의뢰인
CREATE TABLE clients (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE,
  name TEXT,
  phone TEXT,
  auth_user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- 사건
CREATE TABLE legal_cases (
  id UUID PRIMARY KEY,
  client_id UUID REFERENCES clients(id),
  consultation_id UUID REFERENCES consultations(id),
  case_number TEXT,
  case_type TEXT, -- 'alimony', 'property', 'custody', 'adultery'
  status TEXT, -- 'active', 'completed', 'pending'
  assigned_lawyer TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 재판 일정
CREATE TABLE trial_schedules (
  id UUID PRIMARY KEY,
  case_id UUID REFERENCES legal_cases(id),
  trial_date TIMESTAMP,
  court_name TEXT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 사건 문서
CREATE TABLE case_documents (
  id UUID PRIMARY KEY,
  case_id UUID REFERENCES legal_cases(id),
  title TEXT,
  file_url TEXT, -- Google Drive/OneDrive 링크
  file_type TEXT, -- 'google_drive', 'onedrive'
  uploaded_at TIMESTAMP DEFAULT NOW()
);

-- 알림 로그
CREATE TABLE notifications (
  id UUID PRIMARY KEY,
  case_id UUID REFERENCES legal_cases(id),
  type TEXT, -- 'trial_reminder', 'consultation_confirm'
  sent_at TIMESTAMP,
  recipient TEXT,
  message TEXT
);
```

---

## 🔐 권한 관리 (RLS - Row Level Security)

### 공개 홈페이지 (theyool)
```sql
-- 상담 신청만 가능
CREATE POLICY "Anyone can insert consultations"
ON consultations FOR INSERT
TO anon
WITH CHECK (true);
```

### 사내 시스템 (theyool-admin)
```sql
-- 관리자: 전체 권한
CREATE POLICY "Admins can do anything"
ON legal_cases FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM admins WHERE user_id = auth.uid()
  )
);
```

### 의뢰인 포털 (theyool-client) - 차후
```sql
-- 의뢰인: 본인 사건만 조회
CREATE POLICY "Clients can only view their own cases"
ON legal_cases FOR SELECT
TO authenticated
USING (client_id IN (
  SELECT id FROM clients WHERE auth_user_id = auth.uid()
));
```

---

## 🚀 개발 단계

### 1주차: 기본 구조
- Next.js 프로젝트 생성 (theyool-admin)
- Supabase 연결 (기존 프로젝트 공유)
- 로그인 시스템 구현
- 기본 레이아웃 (헤더, 사이드바)

### 2주차: 핵심 기능
- 달력 컴포넌트 구현
- 상담 목록/상세 페이지
- 상담 CRUD 기능
- 기본 필터/검색

### 3주차: 확장
- 재판 일정 추가
- 사건 관리 기능
- 사건-상담-일정 연결
- 데이터 관계 구현

### 4주차~: 고도화
- 알림 시스템
- 파일 관리 (Google Drive/OneDrive 연동)
- 통계 대시보드
- 의뢰인 포털 준비

---

## 📊 프로젝트별 권한

| 기능 | theyool (홈페이지) | theyool-admin (사내) | theyool-client (의뢰인) |
|------|-------------------|---------------------|----------------------|
| 상담 신청 | ✅ 생성 | ✅ 전체 관리 | ❌ |
| 사건 조회 | ❌ | ✅ 전체 | ✅ 본인 것만 |
| 사건 수정 | ❌ | ✅ | ❌ |
| 일정 조회 | ❌ | ✅ 전체 | ✅ 본인 것만 |
| 서류 다운로드 | ❌ | ✅ 전체 | ✅ 본인 것만 |
| 알림 설정 | ❌ | ✅ 발송 관리 | ✅ 수신 |

---

## 🌐 도메인 구조

```
https://theyool.com              → 공개 홈페이지
https://admin.theyool.com        → 사내 관리 시스템
https://client.theyool.com       → 의뢰인 포털 (차후)
```

---

## 💾 데이터 공유 방식

### 환경 변수 (모든 프로젝트 동일)
```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://kqqyipnlkmmprfgygauk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=***
SUPABASE_SERVICE_ROLE_KEY=***
```

### 데이터 접근
- **theyool**: `anon` 키 사용 → 제한적 권한
- **theyool-admin**: `service_role` 키 사용 → 전체 권한
- **theyool-client**: 인증 사용자 → 본인 데이터만

---

## 📝 핵심 설계 원칙

### ✅ 처음부터 지켜야 할 것
1. **데이터베이스 정규화**: 테이블 관계 명확히
2. **인증 구조**: Supabase Auth 기반
3. **API 분리**: 공개/내부 API 구분

### ⏸️ 나중에 해도 되는 것
1. 완벽한 UI/UX
2. 고급 기능 (알림, 통계)
3. 성능 최적화

---

## 🔄 점진적 개발 전략

- **시작**: 최소 기능으로 시작 (달력 + 상담 관리)
- **확장**: 필요에 따라 기능 추가
- **개선**: 사용하면서 지속적으로 개선
- **분리**: 의뢰인 포털은 나중에 별도 프로젝트로

---

## 🔗 관련 정보

- **현재 프로젝트**: `/Users/hskim/theyool`
- **신규 프로젝트 위치**: `/Users/hskim/theyool-admin` (예정)
- **Supabase 프로젝트**: 기존과 동일 사용
- **개발 순서**: 사내 시스템 → 의뢰인 포털

---

## 💡 추가 고려사항

### 파일 저장소
- Google Drive 또는 OneDrive 연동
- 파일 URL만 데이터베이스에 저장
- 의뢰인은 링크로 다운로드

### 알림 시스템
- 재판 전날 자동 알림
- SMS/이메일 발송
- Supabase Edge Functions 활용

### 보안
- RLS 정책으로 데이터 접근 제어
- 관리자 인증 강화
- 의뢰인 데이터 암호화

---

## 📌 다음 단계

1. ✅ Notion MCP 서버 설치 완료
2. ⬜ Claude Code 재시작 후 Notion 데이터 확인
3. ⬜ theyool-admin 프로젝트 생성
4. ⬜ 데이터베이스 마이그레이션 작성
5. ⬜ 기본 인증 시스템 구현

---

**작성자**: Claude & 김형석
**버전**: 1.0
**최종 수정**: 2025-11-21
