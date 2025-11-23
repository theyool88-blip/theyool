# The Plan 페이지 개선 가이드

**작성일**: 2025-11-20
**우선순위**: Phase 1 - 즉시 작업

## 📌 개선 목표

### 비즈니스 목표
1. **전환율 향상**: 방문자 → 상담 신청 전환율 증가
2. **신뢰도 구축**: 체계적인 승소 전략으로 전문성 입증
3. **의사결정 촉진**: FAQ를 통한 즉각적 의문 해소

### 사용자 경험 목표
1. **정보 접근성**: 핵심 정보를 빠르게 파악
2. **불안 해소**: FAQ로 주요 우려사항 해결
3. **행동 유도**: 명확한 다음 단계 제시

---

## 🔄 현재 상태 분석

### 기존 구조 (`/app/the-plan/page.tsx`)
```typescript
- 성공사례 6개 연동
- 카테고리별 아이콘 매핑
- 기본적인 메타데이터 설정
```

### 개선이 필요한 부분
1. **FAQ 콘텐츠 부재**: 관련 FAQ가 통합되지 않음
2. **콘텐츠 깊이 부족**: 단순 사례 나열에 그침
3. **CTA 최적화 필요**: 상담 유도 장치 부족
4. **모바일 경험**: 모바일 최적화 검토 필요

---

## 📋 개선 작업 계획

### 1단계: FAQ 통합 (우선순위: 높음)

#### 1-1. 관련 FAQ 선별
```typescript
// The Plan과 관련된 FAQ 카테고리
const relevantCategories = [
  '이혼절차',      // 전체 프로세스 이해
  '변호사선임',    // 변호사 선택 기준
  '이혼비용',      // 비용 관련 우려 해소
  '이혼준비'       // 준비사항 안내
];
```

#### 1-2. FAQ 섹션 구성
```typescript
// 추천 구조
<section className="faq-integration">
  <h2>자주 묻는 질문</h2>

  {/* 탭 또는 아코디언 형식 */}
  <FAQTabs categories={relevantCategories}>
    {/* 카테고리별 FAQ 3-5개씩 노출 */}
  </FAQTabs>

  {/* 더 많은 FAQ로 연결 */}
  <Link href="/faq">
    더 많은 질문 보기 →
  </Link>
</section>
```

### 2단계: 콘텐츠 구조 개선

#### 2-1. 히어로 섹션 강화
```typescript
// 개선된 히어로 섹션
<HeroSection>
  <h1>이겨놓고 설계하는 이혼</h1>
  <p className="subtitle">
    1,200건의 이혼 사건을 통해 검증된
    체계적인 승소 전략
  </p>

  {/* 신뢰 지표 추가 */}
  <div className="trust-indicators">
    <span>✓ 승소율 95%</span>
    <span>✓ 평균 해결 기간 3개월</span>
    <span>✓ 1,200건 이상 수임</span>
  </div>

  <CTAButton primary>
    무료 상담 신청하기
  </CTAButton>
</HeroSection>
```

#### 2-2. 6단계 프로세스 상세화
```typescript
const processSteps = [
  {
    step: 1,
    title: "초기 상담",
    description: "상황 분석 및 전략 수립",
    duration: "1-2일",
    faqs: ["상담 시 준비사항", "상담 비용"]
  },
  {
    step: 2,
    title: "증거 수집",
    description: "승소에 필요한 자료 확보",
    duration: "1-2주",
    faqs: ["필요한 증거 종류", "증거 수집 방법"]
  },
  // ... 나머지 단계
];
```

### 3단계: 성공사례 연동 강화

#### 3-1. 카테고리별 사례 큐레이션
```typescript
// 카테고리별 대표 사례 선정
const featuredCases = {
  '재산분할': [/* 관련 사례 2-3개 */],
  '양육권': [/* 관련 사례 2-3개 */],
  '위자료': [/* 관련 사례 2-3개 */],
  '상간': [/* 관련 사례 2-3개 */]
};
```

#### 3-2. 사례 카드 개선
```typescript
<CaseCard>
  {/* 결과 강조 */}
  <div className="result-highlight">
    승소 | 위자료 5천만원
  </div>

  {/* 핵심 전략 요약 */}
  <div className="strategy-summary">
    핵심 전략: 상대방 유책 입증
  </div>

  {/* 관련 FAQ 연결 */}
  <div className="related-faqs">
    관련 FAQ: 위자료 산정 기준은?
  </div>
</CaseCard>
```

### 4단계: CTA 최적화

#### 4-1. 다중 CTA 배치
```typescript
// 위치별 CTA 전략
const ctaPositions = {
  hero: "무료 상담 신청하기",        // 메인 CTA
  afterProcess: "지금 시작하기",      // 프로세스 후
  afterCases: "내 사례 상담받기",     // 사례 후
  afterFAQ: "더 궁금한 점 문의하기",  // FAQ 후
  floating: "카톡 상담"              // 플로팅 버튼
};
```

#### 4-2. CTA 문구 A/B 테스트
```typescript
const ctaVariants = [
  "30분 무료 상담 신청",
  "전문가와 상담하기",
  "승소 가능성 진단받기",
  "나의 사례 검토받기"
];
```

### 5단계: 모바일 최적화

#### 5-1. 반응형 레이아웃
```typescript
// 모바일 우선 설계
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* 컨텐츠 */}
</div>
```

#### 5-2. 터치 친화적 UI
```typescript
// 모바일 터치 영역 최적화
.mobile-button {
  min-height: 44px;  // 최소 터치 영역
  padding: 12px 24px;
}
```

---

## 🛠️ 구현 체크리스트

### 필수 작업
- [ ] FAQ 데이터 로더 구현 (`lib/supabase/faq.ts` 활용)
- [ ] FAQ 컴포넌트 제작 (아코디언 or 탭)
- [ ] 프로세스 섹션 상세 콘텐츠 작성
- [ ] CTA 버튼 다양화 및 배치
- [ ] 모바일 레이아웃 점검

### 추가 개선
- [ ] 스크롤 기반 애니메이션 추가
- [ ] 로딩 성능 최적화
- [ ] 접근성 개선 (ARIA labels)
- [ ] 프로그레시브 인핸스먼트

---

## 📊 성과 측정 지표

### 정량 지표
1. **페이지 체류 시간**: 현재 대비 +30% 목표
2. **상담 신청 전환율**: 현재 대비 +50% 목표
3. **FAQ 클릭률**: 30% 이상 목표
4. **바운스율**: 현재 대비 -20% 목표

### 정성 지표
1. 사용자 피드백 수집
2. 히트맵 분석 (핫자 등)
3. 사용자 경로 분석

---

## 📝 콘텐츠 요구사항

### 즉시 필요
1. **프로세스 상세 설명**: 각 단계별 2-3문장
2. **FAQ 큐레이션**: The Plan 관련 FAQ 10-15개 선정
3. **신뢰 지표**: 구체적인 수치 (승소율, 해결 기간 등)

### 추가 필요
1. **고객 후기**: 프로세스 경험 후기 2-3개
2. **비교 콘텐츠**: 일반 이혼 vs The Plan 비교표
3. **비디오 콘텐츠**: 프로세스 설명 영상 (선택)

---

## 🚀 실행 순서

### Day 1-2: 기획 및 설계
1. FAQ 통합 방식 결정
2. 와이어프레임 작성
3. 콘텐츠 준비

### Day 3-4: 개발
1. FAQ 컴포넌트 구현
2. 페이지 구조 개선
3. CTA 배치

### Day 5: 테스트 및 배포
1. 모바일 테스트
2. 성능 최적화
3. 배포

---

## 💡 참고사항

### 기술 스택
- Next.js 16.0.1 (App Router)
- Supabase (FAQ 데이터)
- Tailwind CSS 4.0

### 관련 파일
- `/app/the-plan/page.tsx` - 서버 컴포넌트
- `/app/the-plan/ThePlanClient.tsx` - 클라이언트 컴포넌트
- `/lib/supabase/faq.ts` - FAQ 데이터 로더
- `/components/features/FAQSection.tsx` - FAQ 컴포넌트 (신규)

### 디자인 가이드라인
- 색상: 전문적이면서 따뜻한 톤
- 폰트: 가독성 우선
- 여백: 충분한 breathing space
- 애니메이션: 부드럽고 절제된 모션