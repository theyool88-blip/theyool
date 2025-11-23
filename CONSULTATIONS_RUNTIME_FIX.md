# 상담 관리 페이지 런타임 에러 수정 (2025-11-20)

## 문제 요약
관리자 상담 관리 페이지 (`/admin/consultations`)에서 런타임 에러 발생:
```
Runtime TypeError: Cannot convert undefined or null to object
app/admin/consultations/page.tsx (290:34)
```

## 근본 원인 분석

### 1. 백엔드-프론트엔드 데이터 구조 불일치
**프론트엔드 TypeScript 인터페이스** (`page.tsx` line 19-30):
```typescript
interface ConsultationStats {
  total: number;
  pending: number;
  in_progress: number;
  completed: number;
  today: number;
  this_week: number;
  this_month: number;
  by_category: Record<string, number>;        // ❌ 누락
  avg_response_time_hours: number;            // ❌ 누락
  urgent_count: number;                       // ❌ 누락
}
```

**백엔드 실제 반환값** (`lib/supabase/consultations.ts` line 124-171):
```typescript
return {
  total, pending, in_progress, completed,
  today, thisWeek, thisMonth,
  // by_category, avg_response_time_hours, urgent_count 누락
};
```

### 2. API 응답 구조 문제
**API 엔드포인트** (`app/api/admin/consultations/stats/route.ts`):
- 기존: `{ success: true, stats: {...} }` 형태로 래핑
- 프론트엔드: `setStats(data)` - 전체 응답 저장 (래퍼 포함)
- 결과: `stats.by_category`가 `undefined`

### 3. 방어 코드 부족
```typescript
// 에러 발생 지점
{stats && Object.keys(stats.by_category).map(...)}
//                    ^^^^^^^^^^^^^^^^^^
//                    undefined일 수 있음
```

## 수정 내용

### 1. 백엔드 통계 함수 완전 구현 ✅
**파일**: `/Users/hskim/theyool/lib/supabase/consultations.ts`

**변경 사항**:
1. **타입 정의 확장**:
   ```typescript
   export async function getConsultationStats(): Promise<{
     // 기존 필드들...
     by_category: Record<string, number>;      // ✅ 추가
     avg_response_time_hours: number;          // ✅ 추가
     urgent_count: number;                     // ✅ 추가
   }>
   ```

2. **카테고리별 집계 구현**:
   ```typescript
   const byCategory: Record<string, number> = {};
   if (allConsultations.data) {
     allConsultations.data.forEach((c: any) => {
       const category = c.category || '미분류';
       byCategory[category] = (byCategory[category] || 0) + 1;
     });
   }
   ```

3. **평균 응답 시간 계산**:
   ```typescript
   let totalResponseTime = 0;
   let completedCount = 0;
   allConsultations.data.forEach((c: any) => {
     if (c.status === 'completed' && c.created_at && c.updated_at) {
       const hoursDiff = (updated - created) / (1000 * 60 * 60);
       totalResponseTime += hoursDiff;
       completedCount++;
     }
   });
   const avgResponseTime = completedCount > 0
     ? Math.round(totalResponseTime / completedCount)
     : 0;
   ```

4. **긴급 상담 카운트**:
   ```typescript
   const urgentKeywords = ['긴급', '급함', '빨리', '즉시', '오늘', '내일', '시급'];
   let urgentCount = 0;
   allConsultations.data.forEach((c: any) => {
     if (c.message && urgentKeywords.some(keyword => c.message.includes(keyword))) {
       urgentCount++;
     }
   });
   ```

5. **필드명 일치**:
   - `thisWeek` → `this_week`
   - `thisMonth` → `this_month`

### 2. API 응답 구조 단순화 ✅
**파일**: `/Users/hskim/theyool/app/api/admin/consultations/stats/route.ts`

**변경 전**:
```typescript
return NextResponse.json({
  success: true,
  stats,  // 래퍼 추가
});
```

**변경 후**:
```typescript
// Return stats directly to match frontend interface
return NextResponse.json(stats);
```

### 3. 프론트엔드 방어 코드 추가 ✅
**파일**: `/Users/hskim/theyool/app/admin/consultations/page.tsx`

**변경 사항**:

1. **카테고리 필터 (line 290)**:
   ```typescript
   // 변경 전
   {stats && Object.keys(stats.by_category).map(...)}

   // 변경 후 (옵셔널 체이닝 + 존재 확인)
   {stats?.by_category && Object.keys(stats.by_category).map(...)}
   ```

2. **통계 카드 기본값 (line 213-249)**:
   ```typescript
   // 모든 stats 속성에 기본값 추가
   {stats.total || 0}
   {stats.this_month || 0}
   {stats.pending || 0}
   {(stats.urgent_count || 0) > 0 && ...}
   {stats.in_progress || 0}
   {stats.today || 0}
   {stats.completed || 0}
   {stats.avg_response_time_hours || 0}
   ```

## 테스트 체크리스트

### 기능 테스트
- [ ] `/admin/consultations` 페이지 로딩 확인
- [ ] 통계 카드가 올바르게 표시되는지 확인
  - [ ] 총 상담 수
  - [ ] 대기 중 수 (긴급 포함)
  - [ ] 처리 중 수
  - [ ] 완료 수 (평균 응답시간 포함)
- [ ] 카테고리 필터 드롭다운 정상 작동
- [ ] 데이터가 없을 때 빈 상태 처리

### 엣지 케이스
- [ ] 상담 데이터가 0개일 때 에러 없이 로딩
- [ ] 카테고리가 없는 상담 "미분류"로 표시
- [ ] 완료된 상담이 0개일 때 평균 응답시간 0시간 표시
- [ ] 긴급 키워드 없을 때 긴급 카운트 표시 안 됨

### 성능
- [ ] 통계 API 응답 시간 확인 (<1초)
- [ ] 불필요한 데이터 패칭 없는지 확인

## 보안 체크
- [x] 관리자 인증 확인 (`getSession()`)
- [x] SQL 인젝션 방지 (Supabase Query Builder 사용)
- [x] 타입 안전성 (TypeScript strict mode)

## 개선 제안

### 단기
1. **에러 바운더리 추가**: 런타임 에러 발생 시 전체 페이지 크래시 방지
2. **로딩 스켈레톤**: 통계 카드 로딩 중 더 나은 UX
3. **에러 토스트**: API 실패 시 사용자 친화적 메시지

### 중기
1. **Redis 캐싱**: 통계 데이터를 5분간 캐싱하여 DB 부하 감소
2. **실시간 업데이트**: WebSocket으로 새 상담 알림
3. **대시보드 차트**: 시간별/일별 상담 추이 시각화

### 장기
1. **데이터 분석**: 리드 스코어링 알고리즘 개선
2. **자동 분류**: AI 기반 카테고리 자동 태깅
3. **알림 시스템**: 긴급 상담 SMS/Email 알림

## 관련 파일
- `/Users/hskim/theyool/app/admin/consultations/page.tsx` - 프론트엔드 페이지
- `/Users/hskim/theyool/app/api/admin/consultations/stats/route.ts` - 통계 API
- `/Users/hskim/theyool/lib/supabase/consultations.ts` - 데이터베이스 로직
- `/Users/hskim/theyool/types/consultation.ts` - 타입 정의 (생성 필요)

## 참고 문서
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Supabase Query Builder](https://supabase.com/docs/reference/javascript/select)
- [TypeScript Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)

---

**수정 완료**: 2025-11-20
**담당자**: Backend & SEO Specialist
**검증 상태**: ⏳ 테스트 대기 중
