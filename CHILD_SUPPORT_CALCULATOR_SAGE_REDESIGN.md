# 양육비 계산기 Sage Green 디자인 변경 완료

**날짜**: 2025-11-23
**파일**: `/Users/hskim/theyool/app/child-support-calculator/ChildSupportCalculatorClient.tsx`

## 변경 개요

양육비 계산기의 모든 Blue 색상을 Sage Green으로 전면 변경하고, 감성적 요소를 추가하여 따뜻하고 신뢰감 있는 디자인으로 개선했습니다.

---

## 주요 변경사항

### 1. Hero Section (히어로 섹션)

**Before:**
```tsx
bg-gradient-to-b from-white via-blue-50/20 to-white
```

**After:**
```tsx
bg-gradient-to-b from-sage-50 via-white to-white
```

**변경 내용:**
- 배경 그라데이션: Blue → Sage Green
- 도트 패턴 색상: `#93c5fd` (Blue) → `#6DB5A4` (Sage-500)
- 방사형 그라데이션 추가: 차분한 Sage 톤으로 깊이감 연출
- **감성적 배지 추가**:
  ```tsx
  <div className="inline-flex items-center gap-2 bg-sage-100 text-sage-800 px-4 py-2 rounded-full mb-6">
    <span className="w-1.5 h-1.5 bg-sage-500 rounded-full animate-pulse"></span>
    양육비 계산은 아이의 미래를 위한 첫걸음입니다
  </div>
  ```

---

### 2. Form Section (입력 폼 섹션)

#### 단계 번호 배경
- **Before**: `bg-blue-600`
- **After**: `bg-sage-600`

#### Radio 버튼 활성 상태
- **Before**: `bg-blue-50 border-2 border-blue-500 text-blue-700`
- **After**: `bg-sage-100 border-2 border-sage-600 text-sage-800`

#### Input Focus 상태
- **Before**: `focus:border-blue-600 focus:ring-2 focus:ring-blue-200`
- **After**: `focus:border-sage-600 focus:ring-2 focus:ring-sage-200`

#### 아이콘 색상
- **Before**: `text-blue-600`
- **After**: `text-sage-600`

#### 정보 박스
- **Before**: `bg-blue-50/50 border border-blue-200/50`
- **After**: `bg-sage-50 border border-sage-200`

#### CTA 버튼
- **Before**: `bg-gray-900 hover:bg-gray-800`
- **After**: `bg-sage-600 hover:bg-sage-700`

#### 초기화 버튼
- **Before**: `border-2 border-gray-900 text-gray-900`
- **After**: `border-2 border-sage-600 text-sage-700 hover:bg-sage-600`

---

### 3. Result Section (결과 섹션)

#### 배경
- **Before**: `via-blue-50/20`
- **After**: `via-sage-50/20`

#### 결과 카드
- **Before**: `from-blue-600 to-blue-700 border-2 border-blue-700`
- **After**: `from-sage-600 to-sage-700 border-2 border-sage-700`

#### 아이콘 및 텍스트
- **Before**: `text-blue-100`
- **After**: `text-white/90` (가독성 향상)

#### 상세 내역 박스
- **Before**: `bg-blue-50/50`
- **After**: `bg-sage-50`

---

### 4. Bottom Sections

#### Final CTA Section
- **Before**: `via-blue-50/20`, `bg-gray-900`
- **After**: `via-sage-50/20`, `bg-sage-600 hover:bg-sage-700`

---

## 색상 매핑 테이블

| 용도 | Before (Blue) | After (Sage Green) |
|------|---------------|-------------------|
| 배경 (연한) | `blue-50` | `sage-50` (#F0F9F7) |
| 배경 (중간) | `blue-100` | `sage-100` (#E8F5F2) |
| 메인 컬러 | `blue-600` | `sage-600` (#5A9988) |
| 강조 컬러 | `blue-700` | `sage-700` (#487A6C) |
| 테두리 | `blue-200` | `sage-200` |
| 링 (Focus) | `blue-200` | `sage-200` |
| 도트 패턴 | `#93c5fd` | `#6DB5A4` |

---

## 감성적 개선사항

### 1. 따뜻한 메시지 배지
```tsx
양육비 계산은 아이의 미래를 위한 첫걸음입니다
```
- 위치: Hero 섹션 상단
- 디자인: Sage-100 배경, Sage-800 텍스트, 애니메이션 도트

### 2. 부드러운 그라데이션
- SVG radial gradient를 사용한 부드러운 배경 연출
- `sageGlow1`, `sageGlow2`로 깊이감 추가

### 3. 버튼 호버 효과
- 모든 Sage 버튼에 `hover:bg-sage-700` 적용
- 부드러운 transition (duration-300)

---

## 디자인 철학

### Sage Green 선택 이유
1. **차분함**: 이혼 상담 고객의 불안감 감소
2. **신뢰감**: 전문성과 안정감 전달
3. **따뜻함**: 법률 서비스의 딱딱한 이미지 탈피
4. **일관성**: 홈페이지 및 주요 페이지와 색상 통일

### 임신 앱 스타일 차용
- 부드러운 파스텔 톤
- 넉넉한 여백
- 감성적 메시지
- 사용자 친화적 인터페이스

---

## 테스트 체크리스트

- [ ] Hero 섹션 배경 그라데이션 확인
- [ ] 감성 배지 애니메이션 확인
- [ ] 입력 폼 Radio 버튼 활성 상태
- [ ] Input Focus 시 Sage 링 표시
- [ ] 계산 버튼 호버 효과
- [ ] 결과 카드 Sage 그라데이션
- [ ] 상세 내역 Sage-50 배경
- [ ] Final CTA 버튼 색상
- [ ] 모바일 반응형 확인

---

## 파일 위치

**수정된 파일:**
```
/Users/hskim/theyool/app/child-support-calculator/ChildSupportCalculatorClient.tsx
```

**사용된 Tailwind 클래스:**
- `bg-sage-50`, `bg-sage-100`
- `bg-sage-600`, `bg-sage-700`
- `text-sage-600`, `text-sage-700`, `text-sage-800`
- `border-sage-200`, `border-sage-600`, `border-sage-700`
- `ring-sage-200`
- `from-sage-600`, `to-sage-700`

**CSS 변수 참조:**
- `globals.css`의 Sage 팔레트 활용
- Tailwind config의 sage 색상 정의

---

## 다음 단계

1. 브라우저에서 시각적 확인
2. 모바일 기기 테스트
3. 사용자 피드백 수집
4. 필요시 미세 조정

---

## 변경 완료 사항

- Hero Section: Blue → Sage Green + 감성 배지
- Form Section: 모든 Blue 요소 → Sage Green
- Result Section: Blue 그라데이션 → Sage 그라데이션
- Buttons: Gray/Blue → Sage Green
- Info Boxes: Blue → Sage Green
- Bottom CTA: Blue → Sage Green

**총 변경 라인 수**: 약 40개 이상의 클래스 변경
**추가된 요소**: 감성적 배지 1개
**개선된 UX**: 일관된 브랜드 컬러, 따뜻한 느낌

---

법무법인 더율 양육비 계산기가 이제 Sage Green 톤으로 통일되어 더욱 신뢰감 있고 따뜻한 인상을 전달합니다.
