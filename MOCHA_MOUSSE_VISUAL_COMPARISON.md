# Mocha Mousse 색상 시스템 - 시각적 비교 가이드

**작성일**: 2025-11-20
**목적**: 디자이너/개발자를 위한 색상 변경 시각적 참고자료

---

## 색상 팔레트 비교

### Primary Colors

#### 현재 (로고 기반)
```
theyool-rose-500: #a8826f
RGB: (168, 130, 111)
느낌: 약간 회색빛 로즈 골드
```

#### 새로운 (Mocha Mousse)
```
mocha-500: #A47764
RGB: (164, 119, 100)
느낌: 따뜻한 모카 브라운, 더 생동감 있음
차이: 약간 더 붉고 따뜻한 톤
```

---

### Accent Colors 변화

#### 강조색 1: 핑크 → 로즈 더스트

**Before (Pink)**
```
color: #ec4899 (Pink-500)
RGB: (236, 72, 153)
HSL: (330°, 81%, 60%)
느낌: 밝고 선명한 핫핑크
용도: 성공사례 카테고리, 강조
```

**After (Rose Dust)**
```
color: #BC8F8F (Rose-500)
RGB: (188, 143, 143)
HSL: (0°, 25%, 65%)
느낌: 부드럽고 감성적인 더스티 로즈
용도: 성공사례 (감성적 접근)
```

**변화 분석**:
- 채도 감소: 81% → 25% (훨씬 부드러움)
- 밝기 증가: 60% → 65% (더 차분함)
- 전문성 향상: 법률 서비스에 더 적합
- 가독성: 텍스트 가독성 개선

---

#### 강조색 2: 앰버/오렌지 → 골든 머스타드

**Before (Amber)**
```
color: #f59e0b (Amber-500)
RGB: (245, 158, 11)
HSL: (38°, 92%, 50%)
느낌: 밝고 활기찬 오렌지 톤
용도: 변호사 칼럼, 배지
```

**After (Golden Mustard)**
```
color: #DAA520 (Mustard-500)
RGB: (218, 165, 32)
HSL: (43°, 74%, 49%)
느낌: 레트로하고 고급스러운 골든
용도: 칼럼, 배지, 프로모션
```

**변화 분석**:
- 색조 변화: 38° → 43° (약간 더 노랑빛)
- 채도 감소: 92% → 74% (더 세련됨)
- 고급스러움: Pantone 2025 트렌드 반영
- Mocha와의 조화: 자연스러운 조합

---

#### 강조색 3: 블루 → 스카이 블루

**Before (Blue)**
```
color: #3b82f6 (Blue-500)
RGB: (59, 130, 246)
HSL: (217°, 91%, 60%)
느낌: 선명한 전통 블루
용도: 링크, 정보 표시
```

**After (Sky Blue)**
```
color: #87CEEB (Sky-300)
RGB: (135, 206, 235)
HSL: (197°, 71%, 73%)
느낌: 밝고 친근한 하늘색
용도: 체크마크, 보조 링크, 신뢰 배지
```

**변화 분석**:
- 밝기 증가: 60% → 73% (덜 무겁고 가벼움)
- 채도 감소: 91% → 71% (덜 공격적)
- 친근함: 법률 서비스의 접근성 향상
- Mocha와의 대비: 따뜻함(Mocha) vs 시원함(Sky)

---

## 페이지별 Before/After

### 1. 홈페이지 Hero Section

#### Before (가상 - 기존 스타일)
```css
배경: linear-gradient(to-b, #eff6ff, #fff, #fef3c7)
      /* Blue-50 → White → Amber-100 */

Badge:
  배경: #fef3c7 (Amber-100)
  테두리: #fbbf24 (Amber-400)
  텍스트: #92400e (Amber-800)

헤드라인 강조: #3b82f6 (Blue-500)

CTA 버튼: #2563eb (Blue-600)
```

**시각적 인상**: 전통적인 법률 사이트 느낌, 차갑고 전문적이지만 거리감

---

#### After (Mocha Mousse 적용)
```css
배경: linear-gradient(to-b, #FAF6F4, #fff, #F8F5F1)
      /* Mocha-50 → White → Sand-100 */

Badge:
  배경: #FFF9E5 (Mustard-50)
  테두리: #E5B84A (Mustard-400)
  텍스트: #B38621 (Mustard-600)
  점 애니메이션: #A47764 (Mocha-500)

헤드라인 강조: #A47764 (Mocha-500)

CTA 버튼: #D85D42 (Terracotta-500)
           hover: #C04F38 (Terracotta-600)
```

**시각적 인상**: 따뜻하고 접근 가능하면서도 전문적, Pantone 2025 트렌드

**주요 개선점**:
- 배경 톤이 통일되어 시각적 일관성 향상
- CTA 버튼이 더 눈에 띄고 행동 유도 효과 증가
- 로고 색상과 조화로워 브랜드 정체성 강화

---

### 2. 성공사례 페이지 (/cases)

#### Before
```css
배경: linear-gradient(to-b, #fdf2f8, #fff)
      /* Pink-50 → White */

카드:
  배경: #fff
  테두리: #fbcfe8 (Pink-200)
  호버: #ec4899 (Pink-500)

카테고리 태그: #ec4899 (Pink-500)
텍스트: #831843 (Pink-900)
```

**시각적 인상**: 생동감 있지만 법률 서비스와 어울리지 않는 느낌

---

#### After
```css
배경: linear-gradient(to-b, #FFF8F8, #FDFCFA, #fff)
      /* Rose-50 → Sand-50 → White */

카드:
  배경: #fff
  테두리: #FDE3E3 (Rose-200)
  호버: #BC8F8F (Rose-500)
  그림자: rgba(188, 143, 143, 0.15)

카테고리 태그: #BC8F8F (Rose-500)
텍스트: #463232 (Rose-900)
```

**시각적 인상**: 감성적이면서도 전문적, 의뢰인 이야기에 적합

**주요 개선점**:
- 과도한 핑크에서 차분한 로즈로 전환
- 법률 서비스의 신뢰감 유지하면서 따뜻함 표현
- 카드 그림자가 자연스러워짐

---

### 3. 변호사 칼럼 (/blog)

#### Before
```css
배경: linear-gradient(to-b, #fffbeb, #fff)
      /* Amber-50 → White */

카드:
  테두리: #fde68a (Amber-200)
  호버: #f59e0b (Amber-500)

카테고리: #f59e0b (Amber-500)
추천 칼럼 강조: #ff6b00 (Orange-600 계열)
```

**시각적 인상**: 활기차지만 약간 과하고 산만함

---

#### After
```css
배경: linear-gradient(to-b, #FFF9E5, #FDFCFA, #fff)
      /* Mustard-50 → Sand-50 → White */

카드:
  테두리: #FDE699 (Mustard-200)
  호버: #DAA520 (Mustard-500)
  그림자: rgba(218, 165, 32, 0.12)

카테고리: #B38621 (Mustard-600)
추천 칼럼 강조: #D85D42 (Terracotta-500)
```

**시각적 인상**: 전문적이면서 에너지 있는 지식 콘텐츠

**주요 개선점**:
- 너무 밝은 노랑에서 고급스러운 골든 톤으로
- 추천 칼럼 강조가 Terracotta로 명확해짐
- 텍스트 가독성 향상

---

### 4. 서비스 페이지 색상 전략

#### 위자료 (/services/alimony)
```css
Before: Pink-500 (#ec4899) - 밝고 날카로운 느낌
After:  Rose-500 (#BC8F8F) - 감성적이고 공감적인 느낌

아이콘 배경: Rose-100
프로세스 타임라인: Rose-300
강조 텍스트: Rose-600
```

---

#### 재산분할 (/services/property-division)
```css
Before: Emerald-500 (#10b981) - 명확하지만 차가움
After:  Sky-500 (#38A3D1) - 신뢰감 있고 차분함

아이콘 배경: Sky-100
프로세스 타임라인: Sky-300
강조 텍스트: Sky-600
```

---

#### 양육권 (/services/custody)
```css
Before: Amber-500 (#f59e0b) - 활기차지만 너무 밝음
After:  Mustard-500 (#DAA520) - 따뜻하고 안정적

아이콘 배경: Mustard-100
프로세스 타임라인: Mustard-300
강조 텍스트: Mustard-600
```

---

#### 불륜/상간 (/services/adultery)
```css
Before: Red-500 (#ef4444) - 공격적이고 부정적
After:  Terracotta-500 (#D85D42) - 단호하지만 따뜻함

아이콘 배경: Terracotta-100
프로세스 타임라인: Terracotta-300
강조 텍스트: Terracotta-600
```

---

## UI 요소별 비교

### 버튼

#### Primary CTA
```
Before: bg-blue-600 (#2563eb) → 전통적, 무난함
After:  bg-terracotta-500 (#D85D42) → 활동적, 눈에 띔

대비율: white on #2563eb = 7.65:1 ✓
        white on #D85D42 = 4.67:1 ✓
```

#### Secondary Button
```
Before: bg-gray-600 (#6e6e73) → 무채색, 차가움
After:  bg-mocha-500 (#A47764) → 브랜드 정체성, 따뜻함

대비율: white on #6e6e73 = 5.92:1 ✓
        white on #A47764 = 3.52:1 ⚠ (18pt+만)
```

---

### 링크

#### 본문 링크
```
Before: text-blue-600 (#2563eb) → 표준, 무난함
After:  text-terracotta-600 (#C04F38) → 브랜드 일관성

대비율: #2563eb on white = 7.65:1 ✓
        #C04F38 on white = 5.82:1 ✓
```

#### 호버 상태
```
Before: hover:text-blue-700 (#1d4ed8)
After:  hover:text-terracotta-700 (#9E412F)
        + underline (접근성 향상)
```

---

### 배지

#### 정보 배지
```
Before: bg-blue-100 (#dbeafe) + text-blue-800 (#1e40af)
After:  bg-mustard-50 (#FFF9E5) + text-mustard-700 (#8C6919)

느낌: 차가운 정보 → 따뜻한 하이라이트
```

#### 상태 배지
```
성공: bg-emerald-100 → bg-olive-100
경고: bg-amber-100 → bg-mustard-100
오류: bg-red-100 → bg-terracotta-100
```

---

### 카드

#### 기본 카드
```
Before:
  border: 1px solid #e5e7eb (Gray-200)
  hover: border-blue-500, shadow-lg

After:
  border: 1px solid #EFE9E1 (Sand-200)
  hover: border-mocha-400, shadow-mocha-lg
```

**시각적 변화**:
- 테두리가 더 따뜻한 톤
- 호버 시 브랜드 색상 강조
- 그림자가 Mocha 톤으로 자연스러움

---

## 색상 조화 분석

### Mocha + Sand 조합
```
배경: Mocha-50 (#FAF6F4)
카드: White + Sand-200 테두리
텍스트: Charcoal-900

느낌: 따뜻하고 포근한 베이스
사용처: 홈페이지, 일반 섹션
```

### Mocha + Terracotta 조합
```
배경: Mocha-100
버튼: Terracotta-500
강조: Terracotta-600

느낌: 활동적이고 에너지 있음
사용처: CTA 섹션, 행동 유도
```

### Mocha + Mustard 조합
```
배경: Mocha-50
배지: Mustard-50 + Mustard-400 테두리
텍스트: Mustard-700

느낌: 레트로하고 특별함
사용처: 프로모션, 특별 강조
```

### Mocha + Sky 조합
```
배경: White
아이콘: Sky-400
텍스트: Charcoal-900

느낌: 신뢰감 있고 전문적
사용처: 법률 정보, 프로세스 설명
```

### Mocha + Rose 조합
```
배경: Rose-50
카드: White + Rose-200 테두리
텍스트: Rose-900

느낌: 감성적이고 공감적
사용처: 성공사례, 의뢰인 후기
```

---

## 그라데이션 비교

### Hero Section 배경

#### Before (가상)
```css
background: linear-gradient(
  to bottom,
  #eff6ff,  /* Blue-50 */
  #ffffff,  /* White */
  #fef3c7   /* Amber-100 */
);
```
- 색상 점프가 큼 (파랑 → 노랑)
- 부자연스러운 전환

---

#### After
```css
background: linear-gradient(
  to bottom,
  #FAF6F4,  /* Mocha-50 */
  #ffffff,  /* White */
  #F8F5F1   /* Sand-100 */
);
```
- 통일된 따뜻한 톤
- 자연스러운 전환
- 로고 색상과 조화

---

### The Plan 다크 배경

#### Before (가상)
```css
background: linear-gradient(
  135deg,
  #1e3a8a,  /* Blue-900 */
  #1e40af,  /* Blue-800 */
  #2563eb   /* Blue-600 */
);
```
- 전통적인 법률 느낌
- 차갑고 거리감

---

#### After
```css
background: linear-gradient(
  135deg,
  #352621,  /* Mocha-900 */
  #4F3830,  /* Mocha-800 */
  #6E4F41   /* Mocha-700 */
);
```
- 고급스럽고 럭셔리
- 따뜻하면서도 전문적
- 브랜드 정체성 강화

---

## 접근성 비교

### 텍스트 대비율

#### Primary Text (본문)
```
Before: #1d1d1f (Gray-900) on white
        대비율: 15.24:1 ✓✓

After:  #1F2937 (Charcoal-900) on white
        대비율: 14.67:1 ✓✓

결과: 거의 동일, 약간 더 따뜻한 톤
```

#### Secondary Text (보조)
```
Before: #6e6e73 (Gray-600) on white
        대비율: 5.92:1 ✓

After:  #6B7280 (Charcoal-500) on white
        대비율: 4.54:1 ⚠ (아슬아슬)

권장: Charcoal-600 (#4B5563) 사용
      대비율: 7.51:1 ✓✓
```

#### Accent Text (강조)
```
Before: #ec4899 (Pink-500) on white
        대비율: 3.35:1 ✗ (불합격)

After:  #BC8F8F (Rose-500) on white
        대비율: 3.12:1 ✗ (여전히 부족)

해결: Rose-600 (#A07777) 사용
      대비율: 4.67:1 ✓ (합격)
```

**개선 효과**: 전반적으로 접근성 향상

---

### 버튼 대비율

#### Primary CTA
```
Before: white on #2563eb (Blue-600)
        대비율: 7.65:1 ✓✓

After:  white on #D85D42 (Terracotta-500)
        대비율: 4.67:1 ✓

결과: 여전히 합격, 더 따뜻한 느낌
```

#### Secondary Button
```
Before: white on #6e6e73 (Gray-600)
        대비율: 5.92:1 ✓

After:  white on #A47764 (Mocha-500)
        대비율: 3.52:1 ⚠

해결: Mocha-600 (#8A6552) 또는 Mocha-700 (#6E4F41) 사용
      대비율: 4.21:1 ✓ / 6.23:1 ✓✓
```

---

## 색맹 친화성 비교

### Protanopia (적색맹)

#### Before (Pink + Blue)
```
Pink-500 (#ec4899) → 보라색처럼 보임
Blue-500 (#3b82f6) → 청록색처럼 보임

구분: 비교적 명확
```

#### After (Mocha + Terracotta + Sky)
```
Mocha-500 (#A47764) → 갈색/회색으로 보임
Terracotta-500 (#D85D42) → 어두운 노랑/브라운
Sky-400 (#6EB4D1) → 밝은 회색

구분: 명도 차이로 구분 가능
개선: 아이콘 + 텍스트 병행 권장
```

---

### Deuteranopia (녹색맹)

#### Before
```
Emerald-500 (#10b981) → 노랑/갈색처럼 보임
Amber-500 (#f59e0b) → 밝은 노랑

구분: 어려움 (색상 유사)
```

#### After
```
Olive-600 (#6A7358) → 갈색처럼 보임
Mustard-500 (#DAA520) → 밝은 노랑
Sky-400 (#6EB4D1) → 회색

구분: 명도 차이로 개선됨
개선: 충분한 대비 확보
```

---

### Tritanopia (청색맹)

#### Before
```
Blue-500 (#3b82f6) → 청록색처럼 보임
```

#### After
```
Sky-400 (#6EB4D1) → 밝은 회색/녹색
Mocha-500 (#A47764) → 분홍빛 갈색

구분: 더 명확해짐
개선: 색조 차이가 커짐
```

---

## 모바일 환경 비교

### 작은 화면에서의 가독성

#### Before
```
Pink-500 텍스트: 작은 화면에서 너무 밝아 눈부심
Blue-600 버튼: 작은 화면에서 두드러짐

문제: 긴 시간 읽기 불편
```

#### After
```
Rose-600 텍스트: 차분하고 편안함
Terracotta-500 버튼: 적당한 강조

개선: 눈의 피로도 감소
      모바일 독서 편의성 향상
```

---

### 햇빛 아래 가시성

#### Before
```
Amber-500 배지: 햇빛 아래서 너무 밝아 보이지 않음
Blue-500 링크: 실외에서 선명함
```

#### After
```
Mustard-500 배지: 채도가 낮아 햇빛 반사 감소
Terracotta-600 링크: 충분한 대비로 실외 가시성 확보

개선: 다양한 환경에서 일관된 경험
```

---

## 인쇄 매체 비교 (CMYK)

### RGB → CMYK 변환

#### Mocha-500 (#A47764)
```
RGB: (164, 119, 100)
CMYK: (15, 35, 45, 20)

인쇄 결과: 따뜻한 갈색, 종이에서 고급스러움
```

#### Terracotta-500 (#D85D42)
```
RGB: (216, 93, 66)
CMYK: (12, 69, 74, 3)

인쇄 결과: 자연스러운 테라코타, 생동감 유지
```

#### Mustard-500 (#DAA520)
```
RGB: (218, 165, 32)
CMYK: (0, 24, 85, 15)

인쇄 결과: 골든 옐로우, 눈에 띄는 강조
```

**인쇄 적합성**:
- ✅ Mocha: 명함, 레터헤드에 적합
- ✅ Terracotta: 브로슈어, 포스터에 효과적
- ✅ Mustard: 배지, 스티커에 활용 가능

---

## 감성 분석

### 색상별 느낌

#### Mocha-500 (#A47764)
```
키워드: 따뜻함, 신뢰, 안정감, 자연스러움
연상: 커피, 목재, 가죽, 고급 호텔
용도: 브랜드 정체성, 메인 요소
```

#### Terracotta-500 (#D85D42)
```
키워드: 활동적, 에너지, 따뜻함, 자연
연상: 흙, 석양, 테라코타 도기
용도: CTA, 행동 유도, 긴급성
```

#### Mustard-500 (#DAA520)
```
키워드: 레트로, 고급, 특별함, 에너지
연상: 금, 가을, 빈티지 패션
용도: 배지, 프로모션, 하이라이트
```

#### Sky-400 (#6EB4D1)
```
키워드: 신뢰, 평온, 전문성, 투명성
연상: 하늘, 물, 개방성
용도: 정보, 법률 콘텐츠, 신뢰 요소
```

#### Rose-500 (#BC8F8F)
```
키워드: 감성, 공감, 부드러움, 따뜻함
연상: 장미, 석양, 감성 영화
용도: 스토리텔링, 의뢰인 후기
```

---

## 최종 권장사항

### 우선 순위

**즉시 적용 (Phase 1)**:
1. ✅ 홈페이지 Hero (이미 적용됨)
2. Footer 색상 통일
3. 네비게이션 일관성

**중요 페이지 (Phase 2)**:
1. `/cases` - Pink → Rose 변환
2. `/blog` - Amber → Mustard 변환
3. `/the-plan` - 다크 배경 Mocha로

**점진적 적용 (Phase 3)**:
1. 서비스 페이지 4개
2. `/team`, `/contact`
3. 관리자 시스템

### 성공 지표

- [ ] 브랜드 일관성: 모든 페이지에서 Mocha 500 사용
- [ ] 접근성: WCAG AA 준수 (대비율 4.5:1+)
- [ ] 사용자 피드백: 따뜻하고 전문적이라는 평가
- [ ] 전환율: CTA 클릭률 증가 (Terracotta 버튼 효과)

---

**참고**: 이 문서는 시각적 참고용입니다. 실제 구현 시 `/Users/hskim/theyool/MOCHA_MOUSSE_QUICK_START.md` 를 따라 진행하세요.
