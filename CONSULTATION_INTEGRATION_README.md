# 상담 데이터베이스 통합 - 빠른 시작 가이드

**작업 완료일**: 2025-11-20
**상태**: ✅ 코드 준비 완료 → ⏳ 데이터베이스 마이그레이션 대기

---

## 🎯 한 눈에 보기

### 현재 상황
- ✅ TypeScript 타입 정의 완료
- ✅ Supabase 함수 구현 완료
- ✅ API 라우트 (Zod validation) 완료
- ✅ 관리자 API 완료
- ✅ 정리 스크립트 작성 완료
- ⏳ **데이터베이스 마이그레이션 실행 대기**

### 통합 대상
- `consultations` (4 rows) + `bookings` (67 rows) → `consultations` (unified)

### 4가지 상담 타입
1. **callback** - 콜백 요청 (전화 상담)
2. **visit** - 방문 상담 (천안/평택 사무소)
3. **video** - 화상 상담 (Zoom/Meet)
4. **info** - 정보 문의

---

## 🚀 실행 순서 (3단계)

### Step 1: 데이터베이스 마이그레이션 (5분)

```bash
# 1. 마이그레이션 SQL 출력
node scripts/show-rename-migration-sql.js
```

**출력된 SQL을 복사하여:**
1. Supabase Dashboard → SQL Editor 접속
2. SQL 붙여넣기
3. 실행 (Run)

**실행 내용:**
- `consultations`, `bookings` 테이블 삭제 (71 rows 삭제)
- `consultations_unified` → `consultations` 이름 변경
- RLS 정책, 트리거, 인덱스 이름 정리

```bash
# 2. 마이그레이션 검증
node scripts/check-consultations-tables.js
```

**예상 결과:**
```
consultations: EXISTS (0 rows)
consultations_unified: DOES NOT EXIST
bookings: DOES NOT EXIST
sms_templates: EXISTS (0 rows)
sms_logs: EXISTS (0 rows)
```

---

### Step 2: 레거시 파일 정리 (2분)

```bash
# Dry-run으로 먼저 확인
node scripts/cleanup-booking-legacy.js --dry-run

# 실제 삭제 (확인 후)
node scripts/cleanup-booking-legacy.js
```

**삭제되는 파일:**
- 핵심 라이브러리: 2개 (`lib/supabase/bookings.ts`, `types/booking.ts`)
- API 라우트: 5개 (`app/api/bookings/*`, `app/api/admin/bookings/*`)
- 페이지: 4개 (`app/admin/bookings/*`, `app/booking/*`)
- 테스트 스크립트: 20개 → `archive/booking-legacy/`로 이동

---

### Step 3: 테스트 (5분)

```bash
# 개발 서버 시작
npm run dev
```

**테스트 1: Callback Consultation 생성**
```bash
curl -X POST http://localhost:3000/api/consultations \
  -H "Content-Type: application/json" \
  -d '{
    "request_type": "callback",
    "name": "테스트 고객",
    "phone": "010-1234-5678",
    "category": "위자료",
    "message": "상담 신청 테스트입니다"
  }'
```

**예상 응답:**
```json
{
  "success": true,
  "data": {
    "id": "...",
    "request_type": "callback",
    "status": "pending",
    "name": "테스트 고객",
    ...
  },
  "message": "상담 신청이 완료되었습니다"
}
```

**테스트 2: Visit Consultation 생성**
```bash
curl -X POST http://localhost:3000/api/consultations \
  -H "Content-Type: application/json" \
  -d '{
    "request_type": "visit",
    "name": "방문 상담 테스트",
    "phone": "010-9876-5432",
    "category": "재산분할",
    "preferred_date": "2025-12-01",
    "preferred_time": "14:00",
    "office_location": "천안",
    "preferred_lawyer": "육심원"
  }'
```

**테스트 3: Consultation 조회**
```bash
curl http://localhost:3000/api/consultations
```

**테스트 4: 관리자 통계** (로그인 필요)
1. http://localhost:3000/admin/login 접속
2. 로그인 (admin@theyool.com)
3. http://localhost:3000/api/admin/consultations/stats 접속

---

## 📁 핵심 파일 위치

### 데이터베이스
- `supabase/migrations/20251120_unified_consultations_schema.sql` - 초기 스키마
- `supabase/migrations/20251120_rename_unified_consultations.sql` - 이름 변경 SQL

### TypeScript & 함수
- `types/consultation.ts` - 타입 정의 (407 lines)
- `lib/supabase/consultations.ts` - CRUD 함수 (365 lines)

### API 라우트
- `app/api/consultations/route.ts` - Public API (POST, GET)
- `app/api/consultations/[id]/route.ts` - Detail API (GET, PATCH, DELETE)
- `app/api/admin/consultations/route.ts` - Admin API
- `app/api/admin/consultations/[id]/route.ts` - Admin Detail API
- `app/api/admin/consultations/stats/route.ts` - Stats API

### 스크립트
- `scripts/check-consultations-tables.js` - 테이블 확인
- `scripts/show-rename-migration-sql.js` - 마이그레이션 SQL 표시
- `scripts/cleanup-booking-legacy.js` - 레거시 파일 정리

### 문서
- `CONSULTATION_INTEGRATION_COMPLETE.md` - 상세 보고서
- `CONSULTATION_SYSTEM_MERGE_PROPOSAL.md` - 설계 문서
- `CLEANUP_PLAN.md` - 정리 계획

---

## 🔍 주요 기능

### 1. Discriminated Union 타입 시스템
```typescript
type Consultation = 
  | CallbackConsultation   // 콜백 요청
  | VisitConsultation      // 방문 상담
  | VideoConsultation      // 화상 상담
  | InfoConsultation;      // 정보 문의
```

### 2. Zod Validation
```typescript
const createConsultationSchema = z.discriminatedUnion('request_type', [
  callbackSchema,
  visitSchema,
  videoSchema,
  infoSchema,
]);
```

### 3. 상태 워크플로우
```
pending → contacted → confirmed → in_progress → completed
                   ↓           ↓              ↓
                cancelled   no_show      cancelled
```

### 4. SMS 시스템 (Phase 2)
- `sms_templates` - 템플릿 관리
- `sms_logs` - 발송 기록
- 구조 준비 완료, 실제 발송 로직은 나중에 구현

---

## ⚠️ 주의사항

### 데이터베이스 마이그레이션
- **백업 권장**: 기존 데이터 (71 rows) 백업
- **트래픽 고려**: 사용량 적은 시간대 실행
- **검증 필수**: 마이그레이션 후 즉시 확인

### 코드 업데이트 순서
1. ✅ 데이터베이스 마이그레이션 (먼저)
2. ✅ 레거시 파일 정리
3. ⚠️ BookingForm.tsx 업데이트 (사용 중이라면)
4. ✅ 테스트
5. ✅ 배포

---

## 📞 문제 해결

### Q1: 마이그레이션 실패 시
**A**: SQL 에러 메시지 확인 후 재실행. 필요시 롤백:
```sql
-- 롤백 (문제 발생 시)
-- consultations 테이블이 이미 존재하면 실행 안 됨
-- consultations_unified를 다시 생성해야 함
```

### Q2: API 호출 시 401 Unauthorized
**A**: 관리자 API는 인증 필요. 먼저 `/admin/login` 로그인 필요.

### Q3: Zod validation 에러
**A**: request_type에 따라 필수 필드가 다름:
- `callback`, `info`: name, phone만 필수
- `visit`: name, phone, preferred_date, preferred_time, office_location 필수
- `video`: name, phone, preferred_date, preferred_time 필수

### Q4: 기존 consultations 데이터 복원 필요
**A**: 마이그레이션 전 백업이 없다면 복원 불가. 테스트 환경에서 먼저 실행 권장.

---

## ✅ 완료 체크리스트

### 데이터베이스
- [ ] 마이그레이션 SQL 실행
- [ ] `consultations` 테이블 존재 확인
- [ ] 기존 테이블 삭제 확인
- [ ] RLS 정책 동작 확인

### 코드
- [x] TypeScript 타입 정의
- [x] Supabase 함수 구현
- [x] API 라우트 구현
- [x] 관리자 API 구현
- [ ] 레거시 파일 정리

### 테스트
- [ ] Callback consultation 생성
- [ ] Visit consultation 생성
- [ ] Video consultation 생성
- [ ] Info consultation 생성
- [ ] Consultation 조회
- [ ] Consultation 업데이트
- [ ] Consultation 삭제
- [ ] 관리자 통계 확인

### 배포
- [ ] 개발 환경 테스트
- [ ] 프로덕션 배포
- [ ] 프로덕션 테스트
- [ ] 문서 업데이트 (CLAUDE.md)

---

**준비 완료!** 위 3단계를 순서대로 실행하면 상담 데이터베이스 통합이 완료됩니다.

**다음 문서**: `CONSULTATION_INTEGRATION_COMPLETE.md` (상세 보고서)
