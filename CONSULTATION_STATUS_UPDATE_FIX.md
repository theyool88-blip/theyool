# 상담 상태 업데이트 문제 해결 가이드

## 문제 진단

관리자 페이지(`/admin/consultations`)에서 상담 상태를 변경해도 데이터베이스에 반영되지 않는 문제가 발생했습니다.

### 원인 분석

코드 분석 결과, 다음과 같은 흐름이 확인되었습니다:

1. **프론트엔드** (`app/admin/consultations/page.tsx`):
   - Line 368: `onChange` 이벤트가 `updateConsultationStatus` 함수 호출
   - Line 82-102: API에 PATCH 요청 전송 ✅

2. **API** (`app/api/admin/consultations/[id]/route.ts`):
   - Line 51-81: PATCH 엔드포인트 구현됨 ✅
   - Line 65-66: `status`와 `admin_notes`를 input에 추가 ✅

3. **백엔드 함수** (`lib/supabase/consultations.ts`):
   - Line 85-103: `updateConsultation` 함수 구현됨 ✅
   - Line 91-96: Supabase update 쿼리 실행 ✅

**결론**: 모든 레이어가 올바르게 구현되어 있으나, **`updated_at` 컬럼이 자동으로 갱신되지 않는 문제**가 있을 가능성이 높습니다.

---

## 해결 방법

### 1단계: 백엔드 함수 수정 (완료)

`lib/supabase/consultations.ts`의 `updateConsultation` 함수를 수정하여 `updated_at`을 명시적으로 설정하도록 했습니다.

```typescript
// 수정 전
const { data, error } = await supabase
  .from('consultations')
  .update(input)
  .eq('id', id)
  .select()
  .single();

// 수정 후
const updateData = {
  ...input,
  updated_at: new Date().toISOString(), // 명시적으로 updated_at 설정
};

const { data, error } = await supabase
  .from('consultations')
  .update(updateData)
  .eq('id', id)
  .select()
  .single();
```

### 2단계: 디버깅 로그 추가 (완료)

문제 추적을 위해 각 레이어에 로그를 추가했습니다:

- **프론트엔드**: 요청 전송 및 응답 로그
- **API**: 요청 수신, 처리, 응답 로그
- **백엔드**: 데이터베이스 업데이트 로그

브라우저 콘솔과 서버 터미널에서 다음과 같은 로그를 확인할 수 있습니다:

```
[FRONTEND] Updating consultation: { id: '...', status: 'in_progress' }
[CONSULTATION UPDATE] ID: ...
[CONSULTATION UPDATE] Request body: { status: 'in_progress' }
[CONSULTATION UPDATE] Input to update: { status: 'in_progress' }
[CONSULTATION UPDATE] Updated consultation: { id: '...', status: 'in_progress', updated_at: '...' }
[FRONTEND] Update response: { success: true, consultation: {...} }
```

### 3단계: 데이터베이스 트리거 설정 (권장)

PostgreSQL에서 `updated_at`이 자동으로 갱신되도록 트리거를 설정하는 것이 가장 안전합니다.

#### Supabase SQL Editor에서 실행

1. Supabase 대시보드 접속
2. SQL Editor 메뉴 클릭
3. 다음 SQL 실행:

```sql
-- Step 1: Create or replace the function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Step 2: Drop existing trigger if any
DROP TRIGGER IF EXISTS update_consultations_updated_at ON consultations;

-- Step 3: Create the trigger
CREATE TRIGGER update_consultations_updated_at
    BEFORE UPDATE ON consultations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
```

또는 준비된 파일 사용:
```bash
# Supabase SQL Editor에 복사/붙여넣기
cat scripts/fix-consultations-trigger-simple.sql
```

---

## 테스트 방법

### 방법 1: 스크립트로 테스트

```bash
node scripts/test-consultation-update.js
```

이 스크립트는:
1. 첫 번째 상담을 조회
2. 상태를 변경하고 `updated_at`이 갱신되는지 확인
3. 원래 상태로 되돌림

### 방법 2: 관리자 UI에서 테스트

1. 개발 서버 실행:
   ```bash
   npm run dev
   ```

2. 관리자 페이지 접속:
   ```
   http://localhost:3000/admin/consultations
   ```

3. 상담 상태를 변경 (드롭다운 선택)

4. 브라우저 콘솔 확인 (F12 → Console):
   ```
   [FRONTEND] Updating consultation: ...
   [FRONTEND] Update response: ...
   ```

5. 서버 터미널 확인:
   ```
   [CONSULTATION UPDATE] ID: ...
   [CONSULTATION UPDATE] Updated consultation: ...
   ```

---

## 체크리스트

완료된 항목:
- ✅ 백엔드 함수에 `updated_at` 명시적 설정 추가
- ✅ 프론트엔드에 디버깅 로그 추가
- ✅ API에 디버깅 로그 추가
- ✅ 테스트 스크립트 작성
- ✅ SQL 트리거 스크립트 작성

확인 필요:
- ⬜ 브라우저에서 실제로 상태 변경 테스트
- ⬜ 콘솔 로그 확인
- ⬜ 데이터베이스에서 `updated_at` 변경 확인
- ⬜ Supabase에 트리거 설정 (선택사항, 권장)

---

## 다음 단계

1. **즉시 테스트**:
   ```bash
   npm run dev
   ```
   브라우저에서 `/admin/consultations` 접속하여 상태 변경 시도

2. **로그 확인**:
   - 브라우저 콘솔 (F12)
   - 서버 터미널

3. **문제 지속 시**:
   - 에러 메시지 확인
   - 네트워크 탭에서 API 응답 확인
   - Supabase 대시보드에서 직접 데이터 확인

4. **트리거 설정** (권장):
   - `scripts/fix-consultations-trigger-simple.sql` 실행
   - 이후 코드에서 `updated_at` 명시적 설정 제거 가능

---

## 파일 변경 사항

### 수정된 파일
- `lib/supabase/consultations.ts` - `updated_at` 명시적 설정 추가
- `app/api/admin/consultations/[id]/route.ts` - 디버깅 로그 추가
- `app/admin/consultations/page.tsx` - 디버깅 로그 및 에러 처리 개선

### 생성된 파일
- `scripts/fix-consultations-trigger-simple.sql` - Supabase 트리거 설정 SQL
- `scripts/test-consultation-update.js` - 업데이트 테스트 스크립트
- `CONSULTATION_STATUS_UPDATE_FIX.md` - 이 문서

---

## 기술적 배경

### PostgreSQL의 updated_at 자동 갱신

PostgreSQL은 MySQL과 달리 `ON UPDATE CURRENT_TIMESTAMP`를 지원하지 않습니다. 대신 다음 두 가지 방법을 사용합니다:

1. **애플리케이션 레벨**: 코드에서 명시적으로 설정 (현재 적용됨)
2. **데이터베이스 레벨**: TRIGGER 사용 (권장)

트리거 방식의 장점:
- 모든 UPDATE 쿼리에서 자동으로 적용
- 코드에서 실수로 누락할 위험 없음
- 일관성 보장

### Supabase 클라이언트 쿼리

```typescript
// 기본 UPDATE
.update({ status: 'in_progress' })

// updated_at 명시적 설정
.update({
  status: 'in_progress',
  updated_at: new Date().toISOString()
})

// 트리거가 있으면 자동 처리됨
.update({ status: 'in_progress' })
// → 트리거가 updated_at을 NOW()로 자동 설정
```

---

## 문의

문제가 지속되거나 추가 정보가 필요한 경우:
1. 브라우저 콘솔 로그 캡처
2. 서버 터미널 로그 캡처
3. Supabase 대시보드에서 테이블 스키마 확인
4. 위 정보와 함께 문의
