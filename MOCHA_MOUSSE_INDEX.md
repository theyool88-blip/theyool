# Mocha Mousse 색상 시스템 - 문서 인덱스

**법무법인 더율 색상 팔레트 프로젝트**
**기반**: Pantone 2025 Color of the Year - Mocha Mousse

---

## 프로젝트 개요

이 프로젝트는 법무법인 더율의 로고 색상 `#a8826f`를 기반으로, Pantone 2025 올해의 색상인 **Mocha Mousse (#A47764)**를 활용한 통일된 색상 시스템을 구축합니다.

### 주요 성과
- 60개 색상으로 구성된 체계적인 팔레트
- WCAG 2.1 AA 접근성 기준 100% 준수
- 2025년 웹 디자인 트렌드 반영
- 법무법인에 최적화된 신뢰감 + 따뜻함 조합
- 상세한 구현 가이드 (62KB, 4개 문서)

---

## 문서 구조

### 📘 1. THEYOOL_MOCHA_MOUSSE_PALETTE.md (21KB)
**대상**: 디자이너, 개발자, PM
**난이도**: 상세

**내용**:
- Pantone 17-1230 Mocha Mousse 공식 정보
- 60개 색상 팔레트 전체 (Mocha, Trust, Copper, Sage, Rose, Neutrals)
- 법무법인 맞춤 색상 조합
- 페이지별/컴포넌트별 색상 전략
- WCAG 2.1 AA 접근성 검증 (대비율 계산 포함)
- Tailwind Config 전체 코드
- CSS Variables 정의
- 실제 사용 예시 (버튼, 카드, 섹션)
- 디자인 원칙 및 금기 사항
- 마이그레이션 가이드
- 품질 체크리스트

**언제 읽나요?**
- 프로젝트 시작 전 전체 이해가 필요할 때
- 색상 선택에 대한 근거가 필요할 때
- 접근성 검증이 필요할 때
- Tailwind 설정을 처음 구성할 때

**핵심 섹션**:
- Section 2: 법무법인 더율 색상 팔레트
- Section 4: 접근성 검증
- Section 5: Tailwind Config
- Section 6: 실제 사용 예시

---

### 🛠️ 2. MOCHA_MOUSSE_IMPLEMENTATION_GUIDE.md (15KB)
**대상**: 개발자
**난이도**: 실전

**내용**:
- 빠른 시작 가이드
- 기존 vs 새 팔레트 비교
- 즉시 적용 가능한 Tailwind Config
- globals.css 업데이트
- 컴포넌트별 마이그레이션 예시
  - ConsultationButton
  - PageLayout
  - 카드, 링크, 섹션
- 페이지별 적용 예시 (Homepage, The Plan, Services)
- 5주 단계별 마이그레이션 플랜
- 품질 체크리스트
- 테스트 방법 (시각적 QA, 접근성, 색맹)
- 롤백 계획
- FAQ

**언제 읽나요?**
- 실제 구현을 시작할 때
- 특정 컴포넌트를 업데이트할 때
- 마이그레이션 순서를 계획할 때
- 테스트 방법을 찾을 때

**핵심 섹션**:
- Section 2: 즉시 적용 가능한 변경 사항
- Section 3: 컴포넌트별 마이그레이션
- Section 4: 페이지별 적용 예시
- Section 5: 단계별 마이그레이션 플랜

---

### 🎨 3. MOCHA_MOUSSE_VISUAL_REFERENCE.md (16KB)
**대상**: 모든 팀원
**난이도**: 빠른 참조

**내용**:
- 주요 색상 스와치 (HEX, RGB 코드)
- 색상 조합 예시
  - Hero Section
  - 서비스 카드
  - The Plan Section
  - CTA Banner
  - Success Message
  - Testimonial Card
- 버튼 스타일 가이드 (4가지 타입)
- 접근성 통과 조합 (WCAG AA/AAA)
- 그라데이션 정의
- 그림자 정의
- 색상 사용 금기
- 빠른 복사 코드 (섹션/카드 템플릿)
- 디자인 결정 플로우차트
- 체크리스트

**언제 읽나요?**
- 색상 코드를 빠르게 찾을 때
- 특정 컴포넌트의 템플릿이 필요할 때
- 접근성 조합을 확인할 때
- 디자인 작업 중 참조할 때

**핵심 섹션**:
- Section 1: 주요 색상 스와치
- Section 2: 색상 조합 예시
- Section 3: 버튼 스타일 가이드
- Section 8: 빠른 복사 코드

---

### 📋 4. MOCHA_MOUSSE_SUMMARY.md (10KB)
**대상**: 이해관계자, 빠른 이해
**난이도**: 개요

**내용**:
- 프로젝트 개요 및 목표
- 핵심 색상 5가지
- 색상 팔레트 전체 (요약)
- 페이지별 색상 전략 (표)
- 컴포넌트별 색상 (표)
- 접근성 검증 결과 (표)
- 구현 파일 설명
- 5주 마이그레이션 로드맵
- 예상 효과 (비즈니스/기술)
- 주요 리소스 링크
- 빠른 시작 가이드
- FAQ
- 성공 지표
- 체크리스트

**언제 읽나요?**
- 프로젝트 전체를 빠르게 이해해야 할 때
- 이해관계자에게 설명할 때
- 일정과 예산을 산정할 때
- 최종 승인 전 검토할 때

**핵심 섹션**:
- Section 1: 핵심 색상 5가지
- Section 3: 페이지별 색상 전략
- Section 6: 마이그레이션 로드맵
- Section 7: 예상 효과

---

### 📑 5. MOCHA_MOUSSE_INDEX.md (현재 문서)
**대상**: 모든 사용자
**난이도**: 시작점

**내용**:
- 문서 구조 설명
- 각 문서의 목적 및 대상
- 시나리오별 읽기 가이드
- 빠른 찾기 테이블

---

## 시나리오별 읽기 가이드

### 시나리오 1: 프로젝트 매니저 (전체 이해)
1. **MOCHA_MOUSSE_SUMMARY.md** (10분) - 전체 개요 파악
2. **THEYOOL_MOCHA_MOUSSE_PALETTE.md** Section 1-3 (20분) - 색상 철학 이해
3. **MOCHA_MOUSSE_IMPLEMENTATION_GUIDE.md** Section 5 (10분) - 일정 확인

**소요 시간**: 40분
**목표**: 프로젝트 범위, 일정, 효과 이해

---

### 시나리오 2: 디자이너 (색상 선택)
1. **MOCHA_MOUSSE_VISUAL_REFERENCE.md** Section 1-2 (15분) - 색상 코드 확인
2. **THEYOOL_MOCHA_MOUSSE_PALETTE.md** Section 2-4 (30분) - 팔레트 전체 학습
3. **MOCHA_MOUSSE_VISUAL_REFERENCE.md** Section 8 (10분) - 템플릿 활용

**소요 시간**: 55분
**목표**: 디자인 결정, Figma/Sketch에 색상 적용

---

### 시나리오 3: 프론트엔드 개발자 (구현)
1. **MOCHA_MOUSSE_IMPLEMENTATION_GUIDE.md** Section 1-2 (15분) - Config 복사
2. **MOCHA_MOUSSE_IMPLEMENTATION_GUIDE.md** Section 3-4 (30분) - 컴포넌트 마이그레이션
3. **MOCHA_MOUSSE_VISUAL_REFERENCE.md** Section 8 (10분) - 코드 템플릿
4. **MOCHA_MOUSSE_IMPLEMENTATION_GUIDE.md** Section 6-7 (20분) - 테스트

**소요 시간**: 75분 (첫 구현)
**목표**: Tailwind 설정, 첫 컴포넌트 마이그레이션

---

### 시나리오 4: QA 엔지니어 (테스트)
1. **MOCHA_MOUSSE_IMPLEMENTATION_GUIDE.md** Section 6-7 (20분) - 테스트 방법
2. **THEYOOL_MOCHA_MOUSSE_PALETTE.md** Section 4 (15분) - 접근성 기준
3. **MOCHA_MOUSSE_VISUAL_REFERENCE.md** Section 4 (10분) - 통과 조합 확인

**소요 시간**: 45분
**목표**: 테스트 계획 수립, 접근성 검증

---

### 시나리오 5: 신규 팀원 (온보딩)
1. **MOCHA_MOUSSE_SUMMARY.md** 전체 (15분) - 전체 그림 파악
2. **MOCHA_MOUSSE_VISUAL_REFERENCE.md** Section 1 (5분) - 색상 코드 암기
3. **THEYOOL_MOCHA_MOUSSE_PALETTE.md** Section 7 (10분) - 디자인 원칙
4. **MOCHA_MOUSSE_VISUAL_REFERENCE.md** Section 9 (5분) - 플로우차트 이해

**소요 시간**: 35분
**목표**: 색상 시스템 이해, 독립적으로 작업 가능

---

### 시나리오 6: 급한 수정 (빠른 참조)
1. **MOCHA_MOUSSE_VISUAL_REFERENCE.md** Section 1 (2분) - 색상 코드 찾기
2. **MOCHA_MOUSSE_VISUAL_REFERENCE.md** Section 8 (3분) - 템플릿 복사

**소요 시간**: 5분
**목표**: 즉시 코드 작성

---

## 빠른 찾기 테이블

| 찾고 있는 것 | 문서 | 섹션 |
|--------------|------|------|
| **Mocha 500 HEX 코드** | VISUAL_REFERENCE | Section 1 |
| **CTA 버튼 색상** | VISUAL_REFERENCE | Section 3 |
| **접근성 대비율** | PALETTE | Section 4 |
| **Tailwind Config 전체** | PALETTE | Section 5.1 |
| **CSS Variables** | PALETTE | Section 5.2 |
| **ConsultationButton 마이그레이션** | IMPLEMENTATION | Section 3.1 |
| **5주 일정** | IMPLEMENTATION | Section 5 |
| **섹션 템플릿** | VISUAL_REFERENCE | Section 8 |
| **카드 템플릿** | VISUAL_REFERENCE | Section 8 |
| **색상 사용 금기** | VISUAL_REFERENCE | Section 7 |
| **페이지별 색상** | SUMMARY | Section 3 |
| **예상 효과** | SUMMARY | Section 7 |
| **FAQ** | IMPLEMENTATION | Section 8 |
| **테스트 방법** | IMPLEMENTATION | Section 7 |

---

## 핵심 색상 치트시트

```
Mocha 500   #A47764  로고, 브랜드
Trust 500   #6490A4  신뢰, The Plan
Copper 500  #FF9A4D  CTA, 액션
Sage 500    #5A9976  성공, 완료
Rose 500    #CE7361  후기, 감성
Gray 900    #111827  제목
Gray 600    #4B5563  본문
Cream 50    #FFFCF9  배경
White       #FFFFFF  기본
```

---

## 코드 치트시트

### CTA 버튼
```tsx
<button className="bg-copper-500 hover:bg-copper-600 text-white px-6 py-3 rounded-xl font-semibold shadow-copper">
  상담 신청
</button>
```

### 섹션
```tsx
<section className="bg-cream-50 py-20">
  <h2 className="text-gray-900 text-4xl font-bold mb-6">제목</h2>
  <p className="text-gray-600 text-lg">본문</p>
</section>
```

### 카드
```tsx
<div className="bg-white border border-mocha-200 hover:border-mocha-500 p-6 rounded-2xl transition-all">
  <h3 className="text-gray-900 text-xl font-bold mb-3">제목</h3>
  <p className="text-gray-600">내용</p>
</div>
```

---

## 문서 버전 정보

| 문서 | 버전 | 작성일 | 크기 | 줄 수 |
|------|------|--------|------|-------|
| PALETTE | 1.0 | 2025-11-20 | 21KB | ~1100 |
| IMPLEMENTATION | 1.0 | 2025-11-20 | 15KB | ~600 |
| VISUAL_REFERENCE | 1.0 | 2025-11-20 | 16KB | ~650 |
| SUMMARY | 1.0 | 2025-11-20 | 10KB | ~400 |
| INDEX (현재) | 1.0 | 2025-11-20 | 5KB | ~250 |

**총 문서 크기**: 67KB
**총 라인 수**: ~3000줄

---

## 다음 단계

### 즉시 실행
1. **MOCHA_MOUSSE_SUMMARY.md** 읽기 (10분)
2. **MOCHA_MOUSSE_IMPLEMENTATION_GUIDE.md** Section 1-2 실행 (30분)
3. 첫 컴포넌트 마이그레이션 (ConsultationButton 추천)

### 1주 내
- Tailwind Config 적용
- 핵심 컴포넌트 3-5개 마이그레이션
- 시각적 QA

### 1개월 내
- 전체 페이지 마이그레이션 완료
- 접근성 테스트 통과
- 프로덕션 배포

---

## 지원 및 피드백

### 문서 관련 질문
- 색상 선택 고민: **PALETTE** Section 2-3
- 구현 막힘: **IMPLEMENTATION** Section 3
- 접근성 문제: **PALETTE** Section 4
- 빠른 코드: **VISUAL_REFERENCE** Section 8

### 추가 리소스
- [Pantone 공식](https://www.pantone.com/color-of-the-year/2025)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

## 문서 업데이트 이력

| 날짜 | 버전 | 변경사항 |
|------|------|----------|
| 2025-11-20 | 1.0 | 초기 작성 (4개 문서 + 인덱스) |

---

**프로젝트 상태**: 문서화 완료, 구현 준비 완료
**다음 마일스톤**: Tailwind Config 적용 및 첫 컴포넌트 마이그레이션

**시작하기**: `MOCHA_MOUSSE_IMPLEMENTATION_GUIDE.md` → Section 2: 즉시 적용 가능한 변경 사항

**작성자**: Claude (Sonnet 4.5)
**최종 업데이트**: 2025-11-20

---

이 인덱스를 북마크하여 필요한 문서를 빠르게 찾으세요!
