# 법무법인 더율 사내 관리 시스템 - 마이그레이션 가이드

**작성일**: 2025-11-21
**작성자**: Claude (Backend & SEO Specialist)

---

## 개요

이 가이드는 법무법인 더율의 사내 관리 시스템 데이터베이스를 설정하고, CSV 파일로부터 231건의 사건 데이터를 마이그레이션하는 절차를 안내합니다.

---

## 1단계: Supabase 데이터베이스 스키마 생성

### 방법 A: Supabase Dashboard 사용 (권장)

1. **Supabase Dashboard 접속**:
   ```
   https://supabase.com/dashboard/project/kqqyipnlkmmprfgygauk/sql
   ```

2. **SQL Editor에서 실행**:
   - 파일 열기: `/Users/hskim/theyool/supabase/migrations/20251121_COMPLETE_ADMIN_SETUP.sql`
   - 전체 내용을 복사하여 SQL Editor에 붙여넣기
   - "Run" 버튼 클릭하여 실행

3. **생성되는 테이블**:
   - `users_profiles`: 사용자 프로필 (관리자, 직원)
   - `clients`: 의뢰인 정보
   - `legal_cases`: 법률 사건 정보
   - `case_schedules`: 사건 일정
   - `payments`: 입금 내역
   - `consultations` (확장): 상담 신청에 관리 기능 추가

---

## 2단계: CSV 데이터 마이그레이션

SQL 스키마 생성이 완료되면, CSV 파일의 데이터를 데이터베이스에 삽입합니다.

### 마이그레이션 실행

터미널에서 다음 명령 실행:

```bash
cd /Users/hskim/theyool
node scripts/migrate-cases-csv.js
```

### 마이그레이션 프로세스

스크립트는 다음 작업을 수행합니다:

1. **CSV 파일 읽기**: 231건의 사건 데이터 로드
2. **의뢰인 추출**: 중복 제거 후 의뢰인 리스트 생성
3. **의뢰인 삽입**: `clients` 테이블에 의뢰인 데이터 저장
4. **사건 데이터 변환**: CSV 컬럼을 DB 스키마에 맞게 변환
5. **사건 삽입**: `legal_cases` 테이블에 사건 데이터 저장 (client_id 자동 연결)

### 데이터 파싱 규칙

- **금액**: "5,000,000" → 5000000 (쉼표 제거)
- **날짜**: "2024/01/26" → "2024-01-26" (ISO 형식)
- **의뢰인**: "최금하 (https://www.notion.so/...)" → name: "최금하", notion_id 추출
- **전화번호**: "010-5551-9497, 010-3714-4131(김순환)" → phone: "010-5551-9497", phone2: "010-3714-4131(김순환)"

---

## 3단계: 마이그레이션 검증

마이그레이션이 완료되면 검증 스크립트를 실행하여 데이터 무결성을 확인합니다.

```bash
node scripts/verify-migration.js
```

### 검증 항목

- 총 의뢰인 수
- 총 사건 수
- client_id 연결률
- 사건 상태별 통계 (진행중/종결)
- 사무실별 통계 (평택/천안/소송구조)
- 사건 종류별 통계
- 금액 통계 (입금액, 착수금, 발생성보, 미수금)
- 연도별 수임 통계
- 데이터 품질 점수

---

## 데이터베이스 스키마 상세

### users_profiles (사용자 프로필)

| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | UUID | 기본키 |
| auth_user_id | UUID | Supabase Auth 사용자 ID |
| name | TEXT | 이름 |
| email | TEXT | 이메일 (UNIQUE) |
| phone | TEXT | 전화번호 |
| role | TEXT | 역할 ('admin', 'staff') |
| is_active | BOOLEAN | 활성 상태 |
| last_login | TIMESTAMP | 마지막 로그인 |

### clients (의뢰인)

| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | UUID | 기본키 |
| name | TEXT | 이름 |
| phone | TEXT | 전화번호 |
| phone2 | TEXT | 보조 전화번호 |
| email | TEXT | 이메일 |
| address | TEXT | 주소 |
| notes | TEXT | 메모 |
| notion_id | TEXT | Notion 페이지 ID |

### legal_cases (법률 사건)

| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | UUID | 기본키 |
| contract_number | TEXT | 계약서번호 |
| case_name | TEXT | 사건명 |
| client_id | UUID | 의뢰인 ID (FK) |
| assigned_lawyer | TEXT | 담당변호사 |
| status | TEXT | 진행 상태 ('진행중', '종결') |
| case_type | TEXT | 사건종류 |
| court_case_number | TEXT | 사건번호 |
| court_name | TEXT | 관할법원 |
| default_courtroom | TEXT | 법정 |
| office | TEXT | 수임사무실 |
| contract_date | DATE | 수임일 |
| completion_date | DATE | 종료일 |
| retainer_fee | BIGINT | 착수금 |
| total_received | BIGINT | 입금액 |
| outstanding_balance | BIGINT | 미수금 |
| success_fee_agreement | TEXT | 성보약정 |
| calculated_success_fee | BIGINT | 발생성보 |
| installment_terms | TEXT | 분납조건 |
| payment_plan_notes | TEXT | 미수금 처리 방안 |
| related_case_info | TEXT | 관계사건 |
| notes | TEXT | 메모 |

### case_schedules (사건 일정)

| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | UUID | 기본키 |
| case_id | UUID | 사건 ID (FK) |
| schedule_type | TEXT | 일정 유형 ('trial', 'consultation', 'meeting') |
| title | TEXT | 제목 |
| description | TEXT | 설명 |
| scheduled_date | DATE | 일정 날짜 |
| scheduled_time | TIME | 일정 시간 |
| location | TEXT | 장소 |
| courtroom | TEXT | 법정 |
| assigned_lawyer | TEXT | 담당 변호사 |
| status | TEXT | 상태 ('scheduled', 'completed', 'cancelled') |
| notes | TEXT | 메모 |

### payments (입금내역)

| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | UUID | 기본키 |
| case_id | UUID | 사건 ID (FK) |
| client_id | UUID | 의뢰인 ID (FK) |
| amount | BIGINT | 금액 |
| payment_type | TEXT | 결제 유형 |
| payment_method | TEXT | 결제 수단 |
| payment_date | DATE | 결제일 |
| description | TEXT | 설명 |
| notes | TEXT | 메모 |
| created_by | UUID | 등록자 ID |

### consultations (확장)

기존 테이블에 추가된 컬럼:

| 컬럼 | 타입 | 설명 |
|------|------|------|
| assigned_to | TEXT | 담당 변호사명 |
| scheduled_date | TIMESTAMP | 상담 예정 일시 |
| completed_at | TIMESTAMP | 상담 완료 일시 |
| converted_to_case_id | UUID | 사건으로 전환된 경우 사건 ID |

---

## RLS (Row Level Security) 정책

### 권한 구조

- **관리자 (admin)**: 모든 테이블에 대해 전체 권한 (SELECT, INSERT, UPDATE, DELETE)
- **직원 (staff)**: 모든 테이블 조회만 가능 (SELECT), 자신의 프로필만 수정 가능

### 적용된 정책

1. **users_profiles**:
   - 관리자: 전체 접근
   - 직원: 자신의 프로필만 조회/수정

2. **clients, legal_cases, case_schedules, payments**:
   - 관리자: 전체 접근
   - 직원: 조회만 가능

---

## CSV 소스 파일

- **파일명**: `송무_사건목록_DB 60f2df1f3d9a4833b71f4a336511a1d4.csv`
- **위치**: `/Users/hskim/Desktop/Private & Shared/`
- **총 레코드**: 231건 (헤더 제외)

### CSV 컬럼 매핑

| CSV 컬럼 | DB 컬럼 | 변환 |
|----------|---------|------|
| 계약서번호 | contract_number | - |
| 수임일 | contract_date | YYYY/MM/DD → YYYY-MM-DD |
| 사건 | case_name | - |
| 수임사무실 | office | - |
| 의뢰인 | client_id | 이름 추출 후 clients 테이블에서 ID 매핑 |
| 전화번호 | - | clients.phone, clients.phone2로 분리 |
| 진행 | status | "종결" → "종결", 기타 → "진행중" |
| 사건번호 | court_case_number | - |
| 입금액 | total_received | 쉼표 제거 후 정수 변환 |
| 사건종류 | case_type | - |
| 성보약정 | success_fee_agreement | - |
| 발생성보 | calculated_success_fee | 쉼표 제거 후 정수 변환 |
| 착수금 | retainer_fee | 쉼표 제거 후 정수 변환 |
| 미수금 처리 방안 | payment_plan_notes | - |
| 분납조건 | installment_terms | - |
| 미수금 | outstanding_balance | 쉼표 제거 후 정수 변환 |
| 관계사건 | related_case_info | - |
| 관할법원 | court_name | - |
| 디폴트 법정 | default_courtroom | - |

---

## 트러블슈팅

### 문제: CSV 파일을 찾을 수 없습니다

**해결방법**: 스크립트 내 `CSV_PATH` 변수를 확인하고 올바른 경로로 수정하세요.

```javascript
const CSV_PATH = '/Users/hskim/Desktop/Private & Shared/송무_사건목록_DB 60f2df1f3d9a4833b71f4a336511a1d4.csv';
```

### 문제: Supabase 연결 오류

**해결방법**: `.env.local` 파일에 Supabase 환경 변수가 올바르게 설정되어 있는지 확인하세요.

```bash
NEXT_PUBLIC_SUPABASE_URL=https://kqqyipnlkmmprfgygauk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=***
SUPABASE_SERVICE_ROLE_KEY=***
```

### 문제: RLS 정책으로 인한 접근 거부

**해결방법**: Service Role Key를 사용하여 RLS를 우회하거나, 관리자 계정으로 로그인하세요.

---

## 다음 단계

1. **관리자 UI 개발**: 사건, 의뢰인, 일정 관리 페이지 구축
2. **API 라우트 구현**: CRUD 작업을 위한 REST API 엔드포인트
3. **대시보드**: 통계 및 분석 대시보드
4. **알림 시스템**: 일정 리마인더, 미수금 알림 등

---

## 관련 파일

- **마이그레이션 SQL**: `/Users/hskim/theyool/supabase/migrations/20251121_COMPLETE_ADMIN_SETUP.sql`
- **CSV 마이그레이션**: `/Users/hskim/theyool/scripts/migrate-cases-csv.js`
- **검증 스크립트**: `/Users/hskim/theyool/scripts/verify-migration.js`

---

## 연락처

질문이나 문제가 있을 경우 개발팀에 문의하세요.
