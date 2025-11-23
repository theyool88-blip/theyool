# 상담 상태 업데이트 문제 해결 완료

## 문제
관리자 페이지에서 상담 상태(pending/in_progress/completed)를 변경해도 데이터베이스에 반영되지 않는 문제 발생.

## 원인
PostgreSQL의 `updated_at` 컬럼이 자동으로 갱신되지 않음. MySQL의 `ON UPDATE CURRENT_TIMESTAMP`와 달리 PostgreSQL은 명시적으로 설정하거나 트리거를 사용해야 함.

## 해결 방법

### 1. 백엔드 함수 수정 ✅
**파일**: `lib/supabase/consultations.ts`

`updateConsultation` 함수에서 `updated_at`을 명시적으로 설정하도록 수정:

```typescript
const updateData = {
  ...input,
  updated_at: new Date().toISOString(), // 명시적으로 설정
};

const { data, error } = await supabase
  .from('consultations')
  .update(updateData)
  .eq('id', id)
  .select()
  .single();
```

### 2. 디버깅 로그 추가 ✅
문제 추적을 위해 전체 레이어에 로그 추가:

- **프론트엔드** (`app/admin/consultations/page.tsx`):
  ```typescript
  console.log('[FRONTEND] Updating consultation:', { id, status, notes });
  console.log('[FRONTEND] Update response:', data);
  ```

- **API** (`app/api/admin/consultations/[id]/route.ts`):
  ```typescript
  console.log('[CONSULTATION UPDATE] ID:', id);
  console.log('[CONSULTATION UPDATE] Request body:', body);
  console.log('[CONSULTATION UPDATE] Updated consultation:', {...});
  ```

### 3. 에러 처리 개선 ✅
프론트엔드에서 API 응답을 읽어서 구체적인 에러 메시지 표시:

```typescript
if (response.ok) {
  console.log('[FRONTEND] Update successful');
} else {
  console.error('[FRONTEND] Update failed:', data);
  alert('상담 상태 업데이트에 실패했습니다: ' + (data.error || '알 수 없는 오류'));
}
```

## 테스트 결과 ✅

스크립트 테스트 실행:
```bash
node scripts/test-consultation-update.js
```

결과:
```
✅ SUCCESS: updated_at was changed!
   Old updated_at: 2025-11-05T12:39:48.873404+00:00
   New updated_at: 2025-11-20T10:01:59.777987+00:00
   Difference: 1286530.90 seconds
```

## 검증 방법

### 브라우저에서 테스트
1. http://localhost:3000/admin/consultations 접속
2. 상담 항목의 상태 드롭다운 변경
3. F12 → Console 탭에서 로그 확인:
   ```
   [FRONTEND] Updating consultation: { id: "...", status: "in_progress" }
   [FRONTEND] Update response: { success: true, ... }
   ```
4. 서버 터미널에서 로그 확인:
   ```
   [CONSULTATION UPDATE] ID: ...
   [CONSULTATION UPDATE] Updated consultation: ...
   ```

### 데이터베이스 확인
Supabase 대시보드 → Table Editor → consultations 테이블에서 `updated_at` 컬럼이 현재 시각으로 변경되었는지 확인.

## 추가 권장사항 (선택)

PostgreSQL 트리거를 설정하면 코드에서 `updated_at`을 명시적으로 설정하지 않아도 자동으로 갱신됩니다.

### Supabase SQL Editor에서 실행
```sql
-- Function 생성
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger 생성
DROP TRIGGER IF EXISTS update_consultations_updated_at ON consultations;
CREATE TRIGGER update_consultations_updated_at
    BEFORE UPDATE ON consultations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
```

또는:
```bash
cat scripts/fix-consultations-trigger-simple.sql
# → Supabase SQL Editor에 복사/붙여넣기
```

트리거 설정 후에는 코드의 `updated_at: new Date().toISOString()` 부분을 제거해도 자동으로 갱신됩니다.

## 변경된 파일

### 수정된 파일
1. `lib/supabase/consultations.ts` - `updated_at` 명시적 설정
2. `app/api/admin/consultations/[id]/route.ts` - 디버깅 로그 추가
3. `app/admin/consultations/page.tsx` - 디버깅 로그 및 에러 처리

### 생성된 파일
1. `scripts/fix-consultations-trigger-simple.sql` - DB 트리거 설정 SQL
2. `scripts/test-consultation-update.js` - 업데이트 테스트 스크립트
3. `CONSULTATION_STATUS_UPDATE_FIX.md` - 상세 가이드
4. `CONSULTATION_FIX_SUMMARY.md` - 이 요약 문서

## 상태

✅ **해결 완료**
- 코드 수정 완료
- 테스트 성공
- 디버깅 로그 추가
- 문서화 완료

이제 관리자 페이지에서 상담 상태 변경이 정상적으로 작동합니다.
