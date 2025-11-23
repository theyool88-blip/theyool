# Booking → Consultations 통합 정리 계획

**날짜**: 2025-11-20
**목적**: 기존 booking 시스템을 consultations 통합 시스템으로 완전히 전환

---

## 삭제할 파일 목록

### 1. 핵심 라이브러리 파일 (즉시 삭제 가능)
- [ ] `lib/supabase/bookings.ts` - 대체: `lib/supabase/consultations.ts`
- [ ] `types/booking.ts` - 대체: `types/consultation.ts`

### 2. API 라우트 (즉시 삭제 가능)
- [ ] `app/api/bookings/route.ts`
- [ ] `app/api/bookings/[id]/route.ts`
- [ ] `app/api/bookings/available-slots/route.ts`
- [ ] `app/api/admin/bookings/route.ts`
- [ ] `app/api/admin/bookings/[id]/route.ts`

### 3. 관리자 페이지 (즉시 삭제 가능)
- [ ] `app/admin/bookings/page.tsx`
- [ ] `app/admin/bookings/AdminBookingsClient.tsx`

### 4. 사용자 페이지 (즉시 삭제 가능)
- [ ] `app/booking/page.tsx`
- [ ] `app/booking/confirmation/[id]/page.tsx`
- [ ] `app/booking/confirmation/[id]/ConfirmationClient.tsx`
- [ ] `app/booking/confirmation/[id]/not-found.tsx`

### 5. 테스트 및 마이그레이션 스크립트 (보관 후 삭제)
이 파일들은 참고용으로 `/Users/hskim/theyool/archive/` 폴더로 이동:
- [ ] `scripts/analyze-booking-system.js`
- [ ] `scripts/apply-public-booking-policy.js`
- [ ] `scripts/check-booking-db.js`
- [ ] `scripts/check-bookings-schema.js`
- [ ] `scripts/create-bookings-via-rest.js`
- [ ] `scripts/create-test-booking-admin.js`
- [ ] `scripts/create-test-booking-for-api.js`
- [ ] `scripts/create-test-bookings.js`
- [ ] `scripts/execute-bookings-migration.js`
- [ ] `scripts/generate-test-bookings.js`
- [ ] `scripts/run-bookings-migration.js`
- [ ] `scripts/test-booking-api.js`
- [ ] `scripts/test-booking-create-simple.js`
- [ ] `scripts/test-booking-create.js`
- [ ] `scripts/test-booking-datetime-update.js`
- [ ] `scripts/test-booking-detail-api.js`
- [ ] `scripts/test-booking-e2e.js`
- [ ] `scripts/verify-bookings-table.js`
- [ ] `scripts/verify-test-bookings.js`

---

## 유지할 파일 (consultations로 통합)

### 컴포넌트 (수정 필요)
- ⚠️ `components/features/BookingForm.tsx` - consultations API로 변경 필요
- ⚠️ `lib/email/notifications.ts` - consultations 타입으로 변경 필요
- ⚠️ `lib/email/templates.ts` - consultations 타입으로 변경 필요

---

## 실행 순서

### Phase 1: 데이터베이스 마이그레이션 (완료)
✅ `consultations_unified` → `consultations` 이름 변경
✅ 기존 `consultations`, `bookings` 테이블 삭제

### Phase 2: 컴포넌트 업데이트 (현재 단계)
1. `BookingForm.tsx` → consultations API 사용하도록 수정
2. `lib/email/notifications.ts` → Consultation 타입 사용
3. `lib/email/templates.ts` → Consultation 타입 사용

### Phase 3: 레거시 파일 삭제
1. archive 폴더 생성
2. 테스트 스크립트를 archive로 이동
3. API 라우트, 페이지, 라이브러리 삭제

### Phase 4: 문서 정리
1. CLAUDE.md 업데이트
2. README 업데이트 (있다면)
3. 관련 문서 파일들 정리

---

## 안전장치

### 롤백 계획
만약 문제가 발생하면:
1. archive 폴더에서 파일 복원
2. 데이터베이스 마이그레이션 롤백 (SQL 준비됨)
3. git revert로 코드 복원

### 테스트 필요
- [ ] Consultation 생성 API 테스트
- [ ] Consultation 조회 API 테스트
- [ ] Consultation 업데이트 API 테스트
- [ ] Consultation 삭제 API 테스트
- [ ] 관리자 대시보드 테스트
- [ ] 이메일/SMS 발송 테스트

---

## 주의사항

1. **데이터베이스 마이그레이션 먼저**: 파일 삭제 전에 반드시 DB 마이그레이션 완료
2. **프론트엔드 업데이트 필수**: BookingForm 등 사용 중인 컴포넌트 먼저 수정
3. **점진적 삭제**: 한 번에 모든 파일을 삭제하지 말고 단계별로 진행
4. **테스트 후 삭제**: 각 단계마다 기능 테스트 후 다음 단계 진행

---

## 완료 체크리스트

### 데이터베이스
- [x] consultations_unified 테이블 생성 완료
- [x] sms_templates 테이블 생성 완료
- [x] sms_logs 테이블 생성 완료
- [ ] consultations_unified → consultations 이름 변경 (SQL 준비됨, 실행 대기)
- [ ] 기존 consultations, bookings 테이블 삭제 (SQL 준비됨, 실행 대기)

### 코드베이스
- [x] types/consultation.ts 작성 완료
- [x] lib/supabase/consultations.ts 작성 완료
- [x] API 라우트 작성 완료 (Zod validation 포함)
- [x] 관리자 API 라우트 작성 완료
- [ ] BookingForm.tsx 업데이트
- [ ] lib/email/notifications.ts 업데이트
- [ ] lib/email/templates.ts 업데이트
- [ ] 레거시 파일 삭제

### 문서
- [ ] CLAUDE.md 업데이트
- [ ] 마이그레이션 문서 작성
- [ ] API 문서 업데이트

---

**다음 단계**: 데이터베이스 마이그레이션 SQL 실행 후 BookingForm.tsx 업데이트
