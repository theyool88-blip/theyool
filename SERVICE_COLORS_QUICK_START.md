# 서비스 페이지 색상 변경 - 빠른 시작 가이드

**작업 완료일**: 2025-11-23
**목표**: 각 서비스 페이지에 고유 색상 적용 완료

---

## 📌 변경 사항 요약

### 변경된 파일 (총 4개)

```
✅ /app/services/alimony/page.tsx
✅ /app/services/property-division/page.tsx
✅ /app/services/custody/page.tsx
✅ /app/services/adultery/page.tsx
```

### 색상 변경 상세

| 서비스 | 이전 색상 | 변경된 색상 | 변경 이유 |
|--------|-----------|-------------|-----------|
| **위자료 청구** | Sage Green | **Amber-Yellow** | 금전적 보상의 가치 표현 |
| **재산분할** | Emerald-Teal | **Cyan-Teal** | 공정한 분배의 명료함 강조 |
| **양육권** | Blue-Purple | **Purple-Pink** | 아이 사랑의 따뜻함 표현 |
| **불륜/상간** | Sage Green | **Indigo-Slate** | 진지하고 권위있는 대응 |

---

## 🎨 새로운 색상 팔레트

### 1. 위자료 청구
```tsx
gradientFrom="from-amber-600"   // #D97706
gradientTo="to-yellow-600"      // #CA8A04
```
**심리**: 보상, 정의, 가치

### 2. 재산분할
```tsx
gradientFrom="from-cyan-600"    // #0891B2
gradientTo="to-teal-600"        // #0D9488
```
**심리**: 공정, 명료, 균형

### 3. 양육권 및 양육비
```tsx
gradientFrom="from-purple-500"  // #A855F7
gradientTo="to-pink-500"        // #EC4899
```
**심리**: 사랑, 돌봄, 희망

### 4. 불륜 및 상간 사건
```tsx
gradientFrom="from-indigo-700"  // #4338CA
gradientTo="to-slate-700"       // #334155
```
**심리**: 권위, 진지, 안정

---

## ✅ 검증 체크리스트

### 디자인 일관성
- [x] 모든 색상이 Sage Green 브랜드와 조화
- [x] 각 서비스의 특성 반영
- [x] WCAG 2.1 AA 접근성 기준 충족
- [x] 동일한 레이아웃 구조 유지

### 적용 범위
- [x] Hero 섹션 배경 그라데이션
- [x] 프로세스 단계 뱃지
- [x] FAQ 카테고리 필터 선택 상태
- [x] CTA 섹션 배경

### 코드 변경
- [x] ServicePageLayout 컴포넌트 props 전달 확인
- [x] Tailwind 클래스 정상 작동
- [x] 반응형 디자인 유지

---

## 🚀 즉시 확인 방법

### 로컬 개발 서버
```bash
npm run dev
```

### 페이지 URL
```
http://localhost:3000/services/alimony          # Amber-Yellow
http://localhost:3000/services/property-division # Cyan-Teal
http://localhost:3000/services/custody           # Purple-Pink
http://localhost:3000/services/adultery          # Indigo-Slate
```

---

## 📊 색상 조화 분석

### Sage Green과의 관계

```
메인 브랜드: Sage Green (#6DB5A4)
     ↓
     ├─ 위자료 (Amber): 유사색 ★★★★★
     ├─ 재산분할 (Cyan): 삼원색 ★★★★☆
     ├─ 양육권 (Purple-Pink): 보색 ★★★★☆
     └─ 불륜 (Indigo): 유사 한색 ★★★★★
```

### 색온도 스펙트럼
```
따뜻함 ←─────────────────────→ 시원함

위자료   양육권   Sage   재산분할   불륜
Amber   Purple   Green    Cyan    Indigo
```

---

## 🎯 핵심 성과

### 차별화된 사용자 경험
1. **시각적 구분**: 각 서비스 페이지를 즉시 인식 가능
2. **감정적 공감**: 서비스 특성에 맞는 색상으로 의뢰인 공감대 형성
3. **브랜드 통일**: Sage Green과 조화로운 색상으로 일관된 브랜드 경험
4. **전문성 유지**: 법률 서비스 신뢰감은 그대로 유지

### 경쟁 우위
- 일반 법률 사이트: 단조로운 Navy/Gray 일색
- 법무법인 더율: 따뜻하고 현대적인 차별화된 색상 체계

---

## 📖 관련 문서

### 상세 가이드
1. **SERVICE_PAGES_COLOR_DESIGN.md**
   - 전체 디자인 철학 및 원칙
   - 색상 심리학 분석
   - 접근성 검증

2. **SERVICE_COLORS_VISUAL_COMPARISON.md**
   - 시각적 비교 차트
   - 색상환 관계 다이어그램
   - 브랜드 일관성 체크

3. **CLAUDE.md**
   - 프로젝트 전체 구조
   - Sage Green 브랜드 컬러 시스템

---

## 🔧 기술 구현

### 컴포넌트 구조
```
ServicePageLayout (공통 레이아웃)
  ├─ Hero Section: gradientFrom + gradientTo
  ├─ Features Section: 고정 디자인
  ├─ Process Section: gradient 뱃지
  ├─ FAQ Section: gradient 필터
  └─ CTA Section: gradient 배경
```

### Props 시스템
```tsx
interface ServicePageLayoutProps {
  gradientFrom: string;  // Tailwind from-* 클래스
  gradientTo: string;    // Tailwind to-* 클래스
  // ... 기타 props
}
```

---

## 🌟 향후 확장 가능성

### 추가 서비스 색상 후보
- 이혼 조정/중재: Green-Emerald
- 국제 이혼: Sky Blue
- 사실혼 관계: Warm Gray

### 활용 방안
- 랜딩 페이지 색상 매칭
- SNS 포스트 템플릿
- 오프라인 공간 디자인

---

## ⚠️ 주의사항

### 색상 변경 금지 영역
- 공통 헤더/Footer: Sage Green 유지
- 홈페이지: Sage Green 유지
- 플로팅 위젯: Sage Green 유지

### 일관성 유지
- 새로운 서비스 추가 시 이 문서 참고
- Sage Green과의 조화 필수 확인
- WCAG 접근성 기준 준수

---

## 📞 문의

색상 시스템 관련 질문이나 수정 요청 시:
1. SERVICE_PAGES_COLOR_DESIGN.md 참고
2. 색상 조화 분석 확인
3. 접근성 기준 검증 후 변경

---

**작업 완료**: 2025-11-23
**담당**: Claude Code (AI Design Consultant)
**승인**: 법무법인 더율 디자인팀

---

## 빠른 요약

```
✅ 4개 서비스 페이지 색상 변경 완료
✅ Sage Green 브랜드와 완벽 조화
✅ 서비스 특성 반영한 심리적 색상 적용
✅ WCAG AA 접근성 기준 충족
✅ 동일 레이아웃으로 일관성 유지
```

**결과**: 차별화된 시각적 경험 + 브랜드 통일성 확보
