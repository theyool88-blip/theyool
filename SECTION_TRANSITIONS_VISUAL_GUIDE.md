# 섹션 전환 시각적 가이드

## 개선 전후 비교

### **개선 전 (Before)**

```
┌─────────────────────────────────────┐
│   ThePlanHighlight                  │
│   bg: blue-50 → white → white       │
└─────────────────────────────────────┘
        ⚠️ 급격한 전환
┌─────────────────────────────────────┐
│   RealStory                         │
│   bg: white (하드 컷)                │
└─────────────────────────────────────┘
        ⚠️ 급격한 전환
┌─────────────────────────────────────┐
│   InstaTheyoolSection               │
│   bg: purple-pink-orange            │
└─────────────────────────────────────┘
        ⚠️ 급격한 전환
┌─────────────────────────────────────┐
│   ExpertInsights                    │
│   bg: gray-50 → white               │
└─────────────────────────────────────┘
```

### **개선 후 (After)**

```
┌─────────────────────────────────────┐
│   ThePlanHighlight                  │
│   bg: blue-50 → white → white       │
│   ▼ Gradient overlay (blue fade)    │
└─────────────────────────────────────┘
        ✅ 부드러운 전환
┌─────────────────────────────────────┐
│   ▲ Gradient overlay (blue fade)    │
│   RealStory                         │
│   bg: white + subtle blue tint      │
│   ▼ Gradient overlay (purple fade)  │
└─────────────────────────────────────┘
        ✅ 부드러운 전환
┌─────────────────────────────────────┐
│   ▲ Gradient overlay (purple fade)  │
│   InstaTheyoolSection               │
│   bg: purple-pink-orange            │
│   ▼ Gradient overlay (gray fade)    │
└─────────────────────────────────────┘
        ✅ 부드러운 전환
┌─────────────────────────────────────┐
│   ▲ Gradient overlay (gray fade)    │
│   ExpertInsights                    │
│   bg: gray-50 → white               │
└─────────────────────────────────────┘
```

---

## 그라데이션 오버레이 구조

### 1️⃣ ThePlan → RealStory

**ThePlan 하단 오버레이**:
```
Height: 128px (h-32)
Gradient: transparent → blue-50/20 → white
Purpose: RealStory의 화이트로 자연스럽게 페이드
```

**RealStory 상단 오버레이**:
```
Height: 128px (h-32)
Gradient: white → blue-50/30 → transparent
Purpose: ThePlan의 블루 톤을 부드럽게 이어받음
```

**RealStory 배경 변경**:
```
Before: bg-white
After:  bg-gradient-to-b from-white via-blue-50/10 to-white
Purpose: 섹션 전체에 미세한 블루 틴트로 통일감 부여
```

---

### 2️⃣ RealStory → Instagram

**RealStory 하단 오버레이**:
```
Height: 192px (h-48)
Gradient: transparent → purple-50/20 → purple-50/40
Purpose: Instagram의 퍼플 톤을 예고
```

**Instagram 상단 오버레이**:
```
Height: 128px (h-32)
Gradient: purple-50/60 → purple-50/80 → transparent
Purpose: RealStory의 화이트에서 퍼플로 자연스럽게 전환
```

---

### 3️⃣ Instagram → ExpertInsights

**Instagram 하단 오버레이**:
```
Height: 192px (h-48)
Gradient: transparent → gray-50/30 → gray-50/60
Purpose: ExpertInsights의 그레이 톤을 예고
```

**ExpertInsights 상단 오버레이**:
```
Height: 128px (h-32)
Gradient: gray-50 → gray-50/70 → transparent
Purpose: Instagram의 화려한 색상에서 차분한 그레이로 전환
```

---

## 색상 흐름도 (Color Flow)

```
┌─ ThePlanHighlight ──────────────────────────┐
│  Main: Blue-50 → White                      │
│  ┌────────────────────────────────────┐     │
│  │ Bottom Overlay:                    │     │
│  │ transparent → blue-50/20 → white   │     │
│  └────────────────────────────────────┘     │
└─────────────────────────────────────────────┘
                    ↓
┌─ RealStory ─────────────────────────────────┐
│  ┌────────────────────────────────────┐     │
│  │ Top Overlay:                       │     │
│  │ white → blue-50/30 → transparent   │     │
│  └────────────────────────────────────┘     │
│  Main: White with Blue-50/10 tint           │
│  ┌────────────────────────────────────┐     │
│  │ Bottom Overlay:                    │     │
│  │ transparent → purple-50/20 → /40   │     │
│  └────────────────────────────────────┘     │
└─────────────────────────────────────────────┘
                    ↓
┌─ InstaTheyoolSection ───────────────────────┐
│  ┌────────────────────────────────────┐     │
│  │ Top Overlay:                       │     │
│  │ purple-50/60 → /80 → transparent   │     │
│  └────────────────────────────────────┘     │
│  Main: Purple-50 → Pink-50 → Orange-50      │
│  ┌────────────────────────────────────┐     │
│  │ Bottom Overlay:                    │     │
│  │ transparent → gray-50/30 → /60     │     │
│  └────────────────────────────────────┘     │
└─────────────────────────────────────────────┘
                    ↓
┌─ ExpertInsights ────────────────────────────┐
│  ┌────────────────────────────────────┐     │
│  │ Top Overlay:                       │     │
│  │ gray-50 → gray-50/70 → transparent │     │
│  └────────────────────────────────────┘     │
│  Main: Gray-50 → White                      │
└─────────────────────────────────────────────┘
```

---

## Opacity 값 설명

| Opacity | Tailwind | 용도 |
|---------|----------|------|
| 10% | `/10` | 매우 미세한 틴트, 배경 전체 톤 조정 |
| 20% | `/20` | 가벼운 전환, 시작점 |
| 30% | `/30` | 중간 전환 |
| 40% | `/40` | 강한 전환 |
| 60% | `/60` | 명확한 색상 표현 시작 |
| 70% | `/70` | 중간 명확도 |
| 80% | `/80` | 강한 색상 표현 |

---

## Z-Index 레이어링

```
Layer 5:  Gradient overlays (z-[5])
          ↑
Layer 10: Section content (default/z-10)
          ↑
Layer 15: Instagram gradients (z-[15])
          ↑
Layer 20: Navigation tabs (z-20)
          ↑
Layer 30: Navigation arrows (z-30)
```

---

## 반응형 동작

### 데스크톱 (md:)
- 모든 그라데이션 오버레이 완전 적용
- 높이: 상단 128px, 하단 192px

### 모바일
- 동일한 그라데이션 적용
- 작은 화면에서도 자연스러운 전환 유지
- 터치 인터랙션 방해 없음 (`pointer-events-none`)

---

## 코드 스니펫

### 상단 전환 오버레이 템플릿
```tsx
{/* Top gradient transition from [PreviousSection] */}
<div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[color1] via-[color2] to-transparent pointer-events-none z-[5]" />
```

### 하단 전환 오버레이 템플릿
```tsx
{/* Bottom gradient transition to [NextSection] */}
<div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent via-[color1] to-[color2] pointer-events-none z-[5]" />
```

### 섹션 배경 그라데이션
```tsx
<section className="relative bg-gradient-to-b from-[color1] via-[color2] to-[color3]">
  {/* Content */}
</section>
```

---

## 디자인 원칙 요약

### ✅ DO (해야 할 것)
- Opacity 값을 점진적으로 증가 (10 → 20 → 30...)
- 3단계 그라데이션 사용 (from → via → to)
- `pointer-events-none`으로 인터랙션 방해 방지
- 각 섹션의 고유 색상 아이덴티티 유지

### ❌ DON'T (피해야 할 것)
- 하드 컷 (hard cut) 색상 전환
- 100% opacity 오버레이로 콘텐츠 완전 가림
- Z-index 충돌로 콘텐츠가 오버레이 뒤로 숨김
- 너무 많은 색상 단계로 복잡도 증가

---

## 브랜드 색상 매핑

| 섹션 | 주요 색상 | 의미 |
|------|-----------|------|
| ThePlan | Blue-50 | 전문성, 신뢰 |
| RealStory | White + Blue tint | 깔끔함, 진실성 |
| Instagram | Purple-Pink-Orange | 친근함, 활발함 |
| ExpertInsights | Gray-50 | 권위, 전문성 |

---

## 테스트 체크리스트

- [ ] ThePlan → RealStory 전환이 부드러운가?
- [ ] RealStory → Instagram 전환이 자연스러운가?
- [ ] Instagram → ExpertInsights 전환이 급격하지 않은가?
- [ ] 모바일에서도 동일하게 작동하는가?
- [ ] 오버레이가 콘텐츠를 가리지 않는가?
- [ ] 스크롤 성능에 영향이 없는가?
- [ ] 모든 브라우저에서 정상 작동하는가?

---

## 성능 고려사항

### CSS 최적화
- Tailwind의 JIT 컴파일러로 최적화된 CSS 생성
- 그라데이션은 GPU 가속 적용됨
- `pointer-events-none`으로 불필요한 이벤트 리스닝 방지

### 렌더링 최적화
- Absolute positioning으로 레이아웃 리플로우 최소화
- Z-index 레이어링으로 효율적인 페인팅
- 투명도 조절로 브라우저 최적화 활용

---

**결론**: 섹션 간 전환이 이제 디자인 시스템의 일부로 체계화되었으며, 향후 새로운 섹션 추가 시에도 동일한 패턴을 쉽게 적용할 수 있습니다.
