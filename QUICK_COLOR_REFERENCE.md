# 법무법인 더율 색상 빠른 참조

복사해서 바로 사용할 수 있는 색상 코드 모음

---

## 🎨 Primary Colors (주요 색상)

### Rose Gold - 로즈 골드
```
Main (500):     #a8826f  ← 로고 색상, 주요 CTA
Hover (600):    #967360
Light (100):    #f5f0ed  ← 비활성 배경
Lightest (50):  #faf6f4
```

---

## 📝 Text Colors (텍스트)

```
Heading:        #1d1d1f  (theyool-gray-900)
Body:           #1d1d1f  (theyool-gray-900)
Secondary:      #6e6e73  (theyool-gray-600)
Caption:        #6b7280  (theyool-gray-500)
Disabled:       #9ca3af  (theyool-gray-400)
```

---

## 🎭 Background Colors (배경)

```
Page:           #fffcf9  (theyool-cream-50)
Section:        #fef9f3  (theyool-cream-100)
Card:           #ffffff  (white)
Inactive:       #f5f0ed  (theyool-rose-100)
```

---

## 🔘 Button Colors (버튼)

### Primary CTA
```jsx
<button className="bg-[#a8826f] hover:bg-[#967360] text-white px-6 py-3 rounded-lg">
  상담 예약하기
</button>
```
```
Normal:  #a8826f
Hover:   #967360
Active:  #7d5e4d
```

### Secondary
```jsx
<button className="bg-[#1d1d1f] hover:bg-[#424245] text-white px-6 py-3 rounded-lg">
  자세히 보기
</button>
```
```
Normal:  #1d1d1f
Hover:   #424245
Active:  #515154
```

### Outline
```jsx
<button className="border-2 border-[#a8826f] text-[#a8826f] hover:bg-[#faf6f4] px-6 py-3 rounded-lg">
  더 알아보기
</button>
```
```
Border:     #a8826f
Text:       #a8826f
Hover BG:   #faf6f4
```

### Disabled
```
Background:  #f5f0ed
Text:        #9ca3af
```

---

## 📋 Form Elements (폼)

### Input Normal
```
Border:      #d2d2d7  (theyool-gray-300)
Focus:       #a8826f  (theyool-rose-500)
Placeholder: #9ca3af  (theyool-gray-400)
```

### Input Error
```
Border:      #ef4444
Background:  #fef2f2
Text:        #ef4444
```

### Input Success
```
Border:      #10b981
Background:  #ecfdf5
Text:        #10b981
```

---

## 🎯 Selection States (선택 상태)

### Selected
```
Background:  #a8826f
Text:        #ffffff
Border:      #a8826f
```

### Unselected
```
Background:  #f5f0ed
Text:        #1d1d1f
Border:      #d2d2d7
```

### Hover (Unselected)
```
Background:  #ebe3dd
Border:      #bda28d
```

---

## 🏷️ Badges (배지)

### Info Badge
```jsx
<span className="bg-[#faf6f4] text-[#7d5e4d] px-4 py-2 rounded-full">
  12년간 1,200건의 답
</span>
```

### Free Badge
```jsx
<span className="bg-red-500 text-white px-2 py-1 rounded text-xs">
  10분 무료
</span>
```

---

## 🌈 Gradient Backgrounds

### Warm Cream
```css
background: linear-gradient(180deg, #fffcf9 0%, #fef9f3 50%, #fdf2e6 100%);
```

### Rose Gold
```css
background: linear-gradient(135deg, #a8826f 0%, #967360 100%);
```

### Hero Section
```css
background: linear-gradient(180deg, #fffcf9 0%, #ffffff 50%, #ffffff 100%);
```

---

## 📱 Mobile Interactive States

### Active (Touch)
```jsx
<button className="active:scale-98 active:bg-[#7d5e4d]">
  터치 반응
</button>
```

---

## 🎨 Copy-Paste Templates

### Primary Button Template
```jsx
<button
  className="px-6 py-3 rounded-lg font-semibold text-white transition-all"
  style={{ backgroundColor: '#a8826f' }}
  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#967360'}
  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#a8826f'}
>
  버튼 텍스트
</button>
```

### Card Template
```jsx
<div className="
  bg-white
  border-2 border-[#e8e8ed]
  rounded-2xl
  p-6
  hover:border-[#a8826f]
  hover:shadow-xl
  transition-all
  duration-300
">
  카드 내용
</div>
```

### Input Template
```jsx
<input
  type="text"
  className="
    w-full
    px-4 py-3
    border border-[#d2d2d7]
    focus:border-[#a8826f]
    focus:ring-2 focus:ring-[#faf6f4]
    rounded-lg
    text-[#1d1d1f]
    placeholder:text-[#9ca3af]
  "
  placeholder="입력하세요"
/>
```

### Badge Template
```jsx
<span className="
  inline-flex items-center gap-2
  px-4 py-2
  bg-[#faf6f4]
  text-[#7d5e4d]
  rounded-full
  font-semibold
">
  배지 텍스트
</span>
```

---

## 🔄 Quick Conversion

### Tailwind → Hex
```
bg-theyool-rose-500    → #a8826f
bg-theyool-rose-100    → #f5f0ed
text-theyool-gray-900  → #1d1d1f
text-theyool-gray-600  → #6e6e73
bg-theyool-cream-50    → #fffcf9
```

### Hex → RGB
```
#a8826f → rgb(168, 130, 111)
#967360 → rgb(150, 115, 96)
#1d1d1f → rgb(29, 29, 31)
#6e6e73 → rgb(110, 110, 115)
```

### RGB → RGBA (Opacity)
```
rgba(168, 130, 111, 0.1) → 10% 로즈 골드
rgba(168, 130, 111, 0.2) → 20% 로즈 골드
rgba(168, 130, 111, 0.5) → 50% 로즈 골드
rgba(29, 29, 31, 0.95)   → 95% 다크 그레이 (헤더)
```

---

## ⚡ One-Liners (한 줄 코드)

```jsx
// Primary button
<button className="bg-[#a8826f] hover:bg-[#967360] text-white px-6 py-3 rounded-lg">예약</button>

// Input field
<input className="border border-[#d2d2d7] focus:border-[#a8826f] px-4 py-3 rounded-lg" />

// Card
<div className="bg-white border-2 border-[#e8e8ed] hover:border-[#a8826f] rounded-2xl p-6">내용</div>

// Badge
<span className="bg-[#faf6f4] text-[#7d5e4d] px-4 py-2 rounded-full">배지</span>

// Selected state
<button className="bg-[#a8826f] text-white px-4 py-2 rounded-lg">선택됨</button>

// Unselected state
<button className="bg-[#f5f0ed] text-[#1d1d1f] px-4 py-2 rounded-lg">비선택</button>
```

---

## 📊 Color Palette Overview

```
Rose Gold Scale (로즈 골드):
50   #faf6f4  ████████████ 매우 연함
100  #f5f0ed  ████████████ 비활성 배경
200  #ebe3dd  ████████████ 호버 배경
300  #d4c3b5  ████████████
400  #bda28d  ████████████
500  #a8826f  ████████████ ← 로고 메인
600  #967360  ████████████ 호버
700  #7d5e4d  ████████████ 액티브
800  #5f4939  ████████████
900  #453426  ████████████ 매우 진함

Cream Scale (크림):
50   #fffcf9  ████████████ 페이지 배경
100  #fef9f3  ████████████ 섹션 배경
200  #fdf2e6  ████████████ 카드 배경
300  #fbebd9  ████████████ 강조 영역

Gray Scale (그레이):
900  #1d1d1f  ████████████ 메인 텍스트
800  #424245  ████████████
700  #515154  ████████████
600  #6e6e73  ████████████ 보조 텍스트
500  #6b7280  ████████████
400  #9ca3af  ████████████ 캡션
300  #d2d2d7  ████████████ 구분선
200  #e8e8ed  ████████████ 카드 테두리
100  #f5f5f7  ████████████
50   #fafafa  ████████████
```

---

## 💡 Pro Tips

1. **메인 색상**: `#a8826f`만 기억하세요
2. **호버**: 항상 한 단계 진한 색상 (500 → 600)
3. **배경**: 순백 대신 `#fffcf9` 사용
4. **텍스트**: 기본은 `#1d1d1f`, 보조는 `#6e6e73`
5. **구분선**: `#e8e8ed` 또는 `#d2d2d7`

---

## 🎯 Context-Specific Colors

### 홈페이지
```
Hero BG:    linear-gradient(#fffcf9 → white)
CTA:        #a8826f (로즈 골드)
Secondary:  #1d1d1f (다크 그레이)
```

### 모달
```
Selected:   #a8826f
Unselected: #f5f0ed
Submit:     #1d1d1f
```

### 성공사례 (기존 유지)
```
Main:       #ec4899 (핑크)
BG:         #fdf2f8 → #fce7f3
```

### 변호사 칼럼 (기존 유지)
```
Main:       #f59e0b (앰버)
BG:         #fffbeb → #fef3c7
```

---

이 문서를 북마크해두고 필요할 때마다 복사해서 사용하세요! 🎨✨
