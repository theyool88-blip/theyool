# Testimonials Admin UI Specification

## 페이지 경로
`/admin/testimonials`

## UI 구조

### 1. 헤더 섹션
```tsx
- 제목: "의뢰인 후기 관리"
- 통계 카드 (4개):
  - 전체 후기 수
  - 게시된 후기 수
  - 검증된 후기 수
  - 평균 평점
- 액션 버튼: "새 후기 추가"
```

### 2. 필터 섹션
```tsx
- 카테고리 필터: 전체 | 재산분할 | 양육권 | 위자료 | 협의이혼 | 상간손해배상 | 재판이혼 | 양육비청구
- 상태 필터: 전체 | 게시됨 | 미게시 | 검증됨 | 미검증
- 검색창: 의뢰인명, 후기 내용 검색
```

### 3. 테이블 뷰
```tsx
컬럼:
- [썸네일] 사진 또는 이니셜 아바타
- [의뢰인] 이름 + 역할
- [카테고리] 배지
- [결과] case_result
- [평점] 별 5개
- [날짜] case_date
- [상태] 게시/미게시, 검증/미검증, 동의/미동의
- [순서] display_order (드래그앤드롭으로 변경 가능)
- [액션] 수정 | 삭제
```

### 4. 후기 추가/수정 모달

#### 탭 1: 기본 정보
```tsx
- 의뢰인 이름* (예: 김○○)
- 이니셜* (예: 김)
- 역할* (예: 재산분할 의뢰인)
- 카테고리* (드롭다운)
- 사례 결과* (예: 은닉 재산 발견 + 공정한 분할)
- 사례 날짜* (예: 2024년 8월)
- 사례 소요기간 (선택, 예: 3개월)
- 담당 변호사 (선택, 드롭다운)
```

#### 탭 2: 후기 내용
```tsx
- 후기 본문* (Textarea, 최소 50자)
- 평점* (별 1~5개 선택)
- [고급] 스토리텔링 (접기/펼치기)
  - 상담 전 상황 (story_before)
  - 진행 과정 (story_journey)
  - 결과 후 변화 (story_after)
```

#### 탭 3: 사진 관리
```tsx
- 사진 업로드 (드래그앤드롭 또는 파일 선택)
  - 권장 크기: 400x400px
  - 최대 크기: 5MB
  - 지원 형식: JPG, PNG, WebP
- 미리보기
- "사진 사용" 체크박스
- [사진 없을 시] 이니셜 아바타 설정
  - 배경색 선택 (Tailwind gradient 프리셋)
  - 텍스트 색상 선택
```

#### 탭 4: 게시 설정
```tsx
- ✅ 검증 완료 (체크박스)
- ✅ 게시 동의 받음* (체크박스, 필수)
  - 동의 날짜 (자동 기록)
  - [경고] "게시 동의를 받지 않으면 공개할 수 없습니다"
- ✅ 게시 여부 (체크박스)
- ✅ 추천 후기 (체크박스) - 홈페이지 노출
- 노출 순서 (숫자, 낮을수록 먼저 노출)
```

#### 하단 버튼
```tsx
- [취소] 모달 닫기
- [임시저장] 게시하지 않고 저장
- [저장 및 게시] published=true로 저장
```

### 5. 드래그앤드롭 정렬
```tsx
- react-beautiful-dnd 또는 dnd-kit 사용
- 테이블 행을 드래그하여 display_order 변경
- 변경 시 자동 저장
```

### 6. 벌크 액션
```tsx
- 체크박스로 여러 후기 선택
- 벌크 액션:
  - 일괄 게시
  - 일괄 비공개
  - 일괄 삭제
```

## 컴포넌트 파일 구조

```
app/admin/testimonials/
├── page.tsx                        # 메인 페이지 (서버)
├── TestimonialsManagementClient.tsx # 클라이언트 컴포넌트
├── TestimonialTable.tsx            # 테이블 뷰
├── TestimonialModal.tsx            # 추가/수정 모달
├── TestimonialPhotoUploader.tsx    # 사진 업로더
├── TestimonialStats.tsx            # 통계 카드
└── TestimonialFilters.tsx          # 필터 섹션
```

## API 호출 예시

```typescript
// 목록 조회
GET /api/admin/testimonials?category=재산분할&published=true&limit=50&offset=0

// 단일 조회
GET /api/admin/testimonials/{id}

// 생성
POST /api/admin/testimonials
{
  "client_name": "김○○",
  "client_initial": "김",
  "client_role": "재산분할 의뢰인",
  "case_category": "재산분할",
  "case_result": "은닉 재산 발견",
  "case_date": "2024년 8월",
  "content": "후기 내용...",
  "rating": 5,
  "verified": true,
  "consent_given": true,
  "published": true
}

// 수정
PATCH /api/admin/testimonials/{id}
{
  "published": false
}

// 삭제
DELETE /api/admin/testimonials/{id}

// 사진 업로드
POST /api/admin/testimonials/upload-photo
FormData: { file, testimonialId }

// 사진 삭제
DELETE /api/admin/testimonials/upload-photo
{ testimonialId }
```

## 검증 규칙

### 필수 필드
- client_name
- client_initial
- client_role
- case_category
- case_result
- case_date
- content (최소 50자)
- rating (1~5)

### 게시 조건
- consent_given = true (필수)
- published = true
- content가 비어있지 않음

### 사진 업로드 제약
- 파일 크기: 최대 5MB
- 파일 형식: image/jpeg, image/png, image/webp
- 권장 해상도: 400x400px

## 보안 체크리스트

- ✅ 모든 API는 getSession() 인증 필수
- ✅ consent_given=false인 후기는 공개 API에서 노출 금지
- ✅ 사진 업로드 시 파일 타입 및 크기 검증
- ✅ SQL Injection 방지 (Supabase Query Builder 사용)
- ✅ XSS 방지 (입력값 이스케이프)

## 향후 확장 가능성

### Phase 2
- 비디오 후기 지원 (metadata.video_url)
- 태그 시스템 (metadata.tags)
- 외부 리뷰 링크 (metadata.external_review_url)
- 이메일 알림 (새 후기 등록 시)

### Phase 3
- 의뢰인이 직접 후기 작성하는 공개 폼
- 후기 승인 워크플로우 (draft → review → published)
- A/B 테스트 (어떤 후기가 전환율 높은지)
- 감성 분석 (긍정/부정 키워드 추출)
