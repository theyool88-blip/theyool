# 법무법인 더율 웹사이트 개발 문서

**마지막 업데이트**: 2025-11-21 (Sage Green 색상 체계 적용)

## 프로젝트 개요
- **프로젝트명**: 법무법인 더율 공식 웹사이트
- **목적**: 이혼 전문 법률 서비스 제공 및 의뢰인 상담 유도
- **기술 스택**: Next.js 16.0.1, React 19, TypeScript, Tailwind CSS 4.0
- **데이터베이스**: Supabase (PostgreSQL + Auth + Storage)

---

## 📌 핵심 프로젝트 정책 (2025-11-20 업데이트)

### 1. FAQ 시스템 전략
- **FAQ 전면 활용**: 모든 페이지에서 관련 FAQ 콘텐츠 적극 활용
- **콘텐츠 재사용**: 76개의 FAQ를 서비스 페이지, 랜딩 페이지 등에서 재활용
- **신규 FAQ 작성 중**: 지속적으로 FAQ 콘텐츠 확충 예정
- **통합 전략**: FAQ를 통한 고객 의문 해소 및 전환율 향상

### 2. SEO 작업 일정
- **SEO 메타데이터**: 사이트 완성 후반부에 일괄 작업 예정
- **현재 우선순위**: SEO 관련 작업은 당분간 보류
- **집중 영역**: 콘텐츠 완성도 및 기능 구현에 집중

### 3. 기존 페이지 개선 계획
- **The Plan (/the-plan)**: ✅ 수정 필요 - FAQ 통합, 콘텐츠 보강
- **오시는길 (/contact)**: ❌ 수정 불필요 - 현상태 유지
- **인스타더율 (/insta-theyool)**: ❌ 수정 불필요 - 현상태 유지

### 4. 모달 사용 정책 (2025-11-22 추가)

**사용하는 모달 (2개만 유지)**:
1. **ConsultationBookingModal** (`components/features/ConsultationBooking/ConsultationBookingModal.tsx`)
   - 용도: 상담 예약 (날짜/시간 선택, 방문 사무소 선택)
   - 호출 위치: 헤더 "상담예약" 버튼, ConsultationTimingGuide 섹션
   - 특징: Sage Green 색상, 단계별 입력 폼

2. **PhonePrepModal** (`components/features/PhonePrepModal.tsx`)
   - 용도: 전화 연결 준비 (카운트다운 후 자동 전화 연결)
   - 호출 위치: 히어로 섹션 전화 버튼, ConsultationTimingGuide "지금 바로 전화" 버튼
   - 특징: Sage Green 색상, 5초 카운트다운

**보조 모달**:
- **Modal** (`components/ui/Modal.tsx`): 범용 모달 wrapper (다른 페이지에서 사용 중이므로 유지)
- **TestimonialModal** (`components/features/TestimonialModal.tsx`): 후기 상세보기용

**삭제된 모달**:
- EnhancedChannelSelector: 메인페이지에서만 사용하던 채널 선택 모달 (삭제됨)
- 기타 상담 관련 중복 모달들

**모달 호출 규칙**:
- 모든 상담 관련 액션은 위 2개 모달만 사용
- 예약 필요 시 → ConsultationBookingModal
- 즉시 전화 필요 시 → PhonePrepModal
- FAQ 안내만 필요 시 → `/faq`로 링크

---

## ✅ 완료된 주요 기능 (2025-11-20 기준)

### 1. 홈페이지 (/)
- 히어로 섹션, 전문성 강조, 서비스 소개
- 수임료 공개, 의뢰인 후기, CTA
- 스크롤 애니메이션, 모바일 최적화
- **플로팅 UI**: TestimonialPulse (좌측 하단 후기 배지, 9초 후 표시) 만 사용
- **Footer 업데이트**: 광고 책임 변호사(임은지), 법인정보, 사업자번호, 링크(개인정보처리방침/이용약관/면책공고/이혼큐레이션)

### 2. 성공사례 (/cases)
- 목록 페이지: 핑크 계열, 카테고리 필터
- 상세 페이지: Markdown 렌더링
- **데이터**: Supabase에 21개 저장

### 3. 변호사 칼럼 (/blog)
- 목록 페이지: Amber/Orange 계열, 추천 칼럼 섹션
- 카테고리 필터, 3열 매거진 스타일
- **데이터**: Supabase에 18개 저장

### 4. 이혼큐레이션 (Q&A) (/faq)
- **브랜딩**: "FAQ" → "이혼큐레이션(Q&A)"로 변경
- 11개 카테고리, 검색 기능
- **데이터**: Supabase에 76개 저장
- **햄버거 메뉴**: "이혼가이드" 서브메뉴 추가 (이혼큐레이션 + 칼럼)

### 5. Instagram (/insta-theyool)
- **데이터**: Supabase에 12개 저장
- **공개 페이지**: ✅ 구현 완료
- 그리드 레이아웃, 모달 뷰어

### 6. 정책 페이지
- **개인정보처리방침** (/privacy) ✅
- **면책공고** (/disclaimer) ✅
- **이용약관** (/terms) ✅

### 7. 관리자 시스템 (/admin)
- **로그인**: 쿠키 기반 세션 인증
- **대시보드**: 통계 및 빠른 작업 링크
- **성공사례 관리**: 테이블 뷰, CRUD
- **칼럼 관리**: Markdown 에디터, 자동저장, 미리보기
- **Instagram 관리**: 이미지 업로드, 드래그앤드롭
- **FAQ 관리**: 카테고리별 관리, CRUD

### 8. The Plan (/the-plan)
- **페이지 상태**: ✅ 구현 완료
- 승소 전략 소개, 6단계 프로세스
- 성공사례 연동, CTA 배치

### 9. 오시는길 (/contact)
- **페이지 상태**: ✅ 구현 완료
- Kakao 지도 연동, 교통편 안내
- 상담 예약 폼 통합

### 10. 서비스 상세 페이지
- **위자료 청구** (/services/alimony) ✅
- **재산분할** (/services/property-division) ✅
- **양육권/양육비** (/services/custody) ✅
- **불륜/상간** (/services/adultery) ✅
- FAQ 통합, 프로세스 설명, 관련 성공사례 연동

### 11. 공통 컴포넌트
- PageLayout (헤더 + Footer)
- MobileMenu (햄버거 메뉴, 아코디언) - 서비스 메뉴 추가
- ServicePageLayout (서비스 페이지 공통 레이아웃)
- ImageUploader (파일 업로드, 드래그앤드롭)
- TestimonialPulse (좌측 하단 후기 배지 - 9초 후 표시)
- EnhancedChannelSelector (상담 채널 선택 모달)

---

## 🔧 기술 스택

### Core
- Next.js 16.0.1 (App Router, React 19)
- TypeScript, Tailwind CSS 4.0

### Backend
- Supabase: PostgreSQL, Auth, Storage
- API Routes: REST API

### UI & Libraries
- @uiw/react-md-editor: Markdown 에디터
- react-markdown: 콘텐츠 렌더링
- ScrollReveal: 커스텀 애니메이션

### Storage
- Supabase Storage Buckets:
  - `blog-images/`: 칼럼 이미지
  - `case-images/`: 성공사례 이미지

### 2025-11-15 작업 요약
- WordPress → Supabase 마이그레이션 파이프라인 정비: 모든 이미지를 `public-content/cases/...`에 업로드하고, 대표 이미지를 `<!--bg:URL-->` 메타데이터로 저장. 한글 도메인 URL도 `theyool-divorce.com`으로 재다운로드 시도.
- `lib/supabase/cases.ts` 등 성공사례 로더가 메타데이터를 읽어 카드/히어로 배경을 결정하도록 수정(업로드 없으면 기존 그라데이션 유지).
- 관리자 UI: 성공사례·칼럼을 단일 Markdown 에디터 + 커서 기반 이미지 업로드로 통일, 카드/히어로 배경 이미지를 별도 업로드/삭제 가능.
- Markdown 렌더링: 사례/칼럼 상세에 “Contents” 목차를 자동 삽입하고 모바일 친화적인 타이포그래피/이미지 스타일을 전역 적용.
- 성공사례 slug를 직접 입력·저장할 수 있게 Supabase 스키마/관리자 폼/마이그레이션 스크립트를 확장.
- 사례/칼럼 상세 페이지에 canonical/OG 메타데이터, Article/Breadcrumb JSON-LD, sticky ToC, 외부 링크 처리 등을 추가해 SEO를 강화.
  - `instagram-media/`: Instagram 미디어

---

## 📊 Supabase 데이터베이스

### 테이블
1. **cases**: 21개 (성공사례)
2. **blog_posts**: 18개 (칼럼)
3. **faqs**: 76개 (이혼큐레이션)
4. **instagram_posts**: 12개 (Instagram)
5. **consultations**: 상담 신청 (미사용)

### 인증
- 관리자: admin@theyool.com
- 쿠키 기반 세션 관리

---

## 🚀 다음 개발 우선순위

### Phase 1: 완료된 작업 (2025-11-20)
1. ✅ **The Plan 페이지 개선** (/the-plan)
   - FAQ 콘텐츠 통합 완료
   - 콘텐츠 보강 및 구조 개선 완료
   - 성공사례 연동 강화 완료
   - 상담 유도 CTA 최적화 완료

2. ✅ **서비스 상세 페이지 4개** (FAQ 활용)
   - /services/alimony (위자료) - 18개 FAQ 통합
   - /services/property-division (재산분할) - 21개 FAQ 통합
   - /services/custody (양육권/양육비) - 40개 FAQ 통합
   - /services/adultery (불륜/상간) - 3개 FAQ + 추가 콘텐츠

### Phase 2: 다음 작업 목표
3. ⬜ **구성원소개 페이지 개선** (/team)
   - 변호사 프로필 상세 정보 추가
   - 전문 분야별 경력 소개
   - FAQ 통합 (법률 지원, 변호사 선임 등)

### Phase 3: 전환율 최적화
4. ⬜ **상담 시스템 고도화**
   - 상담 예약 관리 시스템
   - 자동 알림 및 확인 메일
   - 상담 일정 관리

5. ⬜ **랜딩 페이지 제작** (FAQ 기반)
   - 카테고리별 랜딩 페이지
   - FAQ 콘텐츠를 활용한 정보 제공
   - 전환 최적화된 구조

### Phase 4: 마무리 작업
6. ⬜ **Analytics & Tracking**
   - Google Analytics 4 설정
   - 전환 추적 설정
   - 히트맵 분석 도구

7. ⬜ **SEO 일괄 작업** (후반부)
   - 모든 페이지 메타데이터 최적화
   - sitemap.xml 생성
   - robots.txt 설정
   - 구조화된 데이터 (JSON-LD)

---

## 🌐 네비게이션 구조

```
홈 (/)
The Plan (/the-plan)
성공사례 (/cases)
이혼가이드 (드롭다운)
  ├─ 이혼큐레이션(Q&A) (/faq)
  └─ 변호사 칼럼 (/blog)
전문 서비스 (드롭다운)
  ├─ 위자료 청구 (/services/alimony)
  ├─ 재산분할 (/services/property-division)
  ├─ 양육권/양육비 (/services/custody)
  └─ 불륜/상간 (/services/adultery)
구성원소개 (/team)
오시는길 (/contact)
```

**Footer 링크**:
- 개인정보처리방침 (/privacy)
- 이용약관 (/terms)
- 면책공고 (/disclaimer)
- 이혼큐레이션 (/faq)

---

## 📁 주요 폴더 구조

```
theyool/
├── app/
│   ├── page.tsx                   # 홈페이지
│   ├── cases/                     # 성공사례
│   ├── blog/                      # 변호사 칼럼
│   ├── faq/                       # 이혼큐레이션(Q&A)
│   ├── privacy/                   # 개인정보처리방침
│   ├── disclaimer/                # 면책공고
│   └── admin/                     # 관리자 시스템
│       ├── login/
│       ├── cases/
│       ├── blog/
│       ├── instagram/
│       ├── faqs/
│       └── page.tsx               # 대시보드
│
├── components/
│   ├── layouts/
│   │   └── PageLayout.tsx
│   ├── ui/
│   │   └── MobileMenu.tsx
│   ├── features/
│   │   └── ConsultationButton.tsx
│   └── admin/
│       └── ImageUploader.tsx
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   ├── cases.ts
│   │   ├── blog.ts
│   │   └── faq.ts
│   └── auth/
│       └── auth.ts
│
└── app/api/
    ├── auth/
    ├── admin/
    │   ├── cases/
    │   ├── blog/
    │   ├── instagram/
    │   ├── faqs/
    │   └── upload/
    └── ...
```

---

## 🔑 환경 변수 (.env.local)

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://kqqyipnlkmmprfgygauk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=***
SUPABASE_SERVICE_ROLE_KEY=***

# Admin Credentials
ADMIN_EMAIL=admin@theyool.com
ADMIN_PASSWORD=***
```

---

## 📝 법인 정보 (Footer)

```
법무법인 더율
이혼전문변호사
광고 책임 변호사: 임은지

연락처: 02-1234-5678
이메일: info@theyool.com

상담시간
평일: 09:00 - 18:00
주말/공휴일: 예약 상담

법인명: 법무법인 더율
대표자: 육심원외 1
사업자번호: 354-85-01451(평택), 514-86-01593(천안)

Copyright © 2025 법무법인 더율 | Powered by 법무법인 더율
```

---

## 🛠️ 개발 명령어

```bash
# 개발 서버 시작
npm run dev

# 빌드
npm run build

# 프로덕션 실행
npm start
```

---

## 📋 필요한 콘텐츠

### 즉시 필요
- [ ] The Plan 상세 설명 텍스트
- [ ] 오시는길 정보 (주소, 지도, 교통편, 주차)
- [ ] 이용약관 전문
- [ ] 구성원 프로필 (사진, 학력, 경력)

### 추가 리소스
- [ ] 지도 API 키 (Kakao Maps 또는 Google Maps)
- [ ] 도메인 설정 및 호스팅
- [ ] Google Analytics 설정

---

## 🎨 디자인 가이드

### 색상 테마 (2025-11-21 업데이트)

#### 메인 브랜드 컬러: Sage Green (쑥색)
임신 앱 스타일에서 영감을 받은 차분하고 신뢰감 있는 색상 체계

**Sage Green 팔레트 및 사용 가이드:**
- **sage-50**: #F0F9F7 → 매우 연한 배경, 섹션 배경
- **sage-100**: #E8F5F2 → 뱃지 배경, 카드 배경
- **sage-500**: #6DB5A4 → 메인 브랜드 컬러, 헤드라인 강조, 보조 아이콘
- **sage-600**: #5A9988 → CTA 버튼, 강조 버튼
- **sage-700**: #487A6C → **포인트 아이콘 (눈에 띄어야 할 체크마크)**, 강조 요소
- **sage-800**: #365B51 → 텍스트, 뱃지 텍스트

**사용 원칙:**
- 같은 섹션 내에서 다양한 농도 활용으로 시각적 깊이 연출
- 히어로 섹션: sage-700 체크마크 (강조) ← 첫인상이 중요
- 일반 섹션: sage-500 아이콘 (자연스러움) ← 과도한 강조 방지
- 뱃지: sage-100 배경 + sage-800 텍스트 조합

#### CSS 변수 시스템 (globals.css)
**전역 색상 변수로 한 곳에서 관리:**

```css
/* 배경 & 패턴 */
--sage-bg-light: linear-gradient(to bottom, white, rgba(240, 249, 247, 0.2), white);
--sage-bg-medium: linear-gradient(to bottom, rgba(240, 249, 247, 1), white, white);
--sage-accent-pattern: radial-gradient(circle at top right, rgba(109, 181, 164, 0.2), rgba(90, 153, 136, 0.1));

/* 뱃지 컬러 */
--sage-badge-bg: rgba(232, 245, 242, 1); /* sage-100 */
--sage-badge-text: rgba(54, 91, 81, 1); /* sage-800 */
--sage-badge-dot: rgba(109, 181, 164, 1); /* sage-500 */

/* 버튼 컬러 */
--sage-btn-primary: rgba(90, 153, 136, 1); /* sage-600 */
--sage-btn-primary-hover: rgba(72, 122, 108, 1); /* sage-700 */
--sage-btn-shadow: rgba(90, 153, 136, 0.35);

/* 아이콘 */
--sage-icon-emphasis: rgba(72, 122, 108, 1); /* sage-700 - 강조용 */
--sage-icon-regular: rgba(109, 181, 164, 1); /* sage-500 - 일반용 */

/* 그라데이션 전환 */
--sage-gradient-top: linear-gradient(to bottom, white, rgba(240, 249, 247, 0.3), transparent);
--sage-gradient-bottom: linear-gradient(to bottom, transparent, rgba(240, 249, 247, 0.2), white);
```

**사용 예시:**
```tsx
// Tailwind 클래스 사용
<div className="bg-sage-100 text-sage-800" />

// CSS 변수 직접 사용 (복잡한 그라데이션 등)
<div style={{ background: 'var(--sage-bg-light)' }} />
```

**색상 변경 방법:**
1. `app/globals.css`의 CSS 변수만 수정
2. 모든 컴포넌트에 자동 적용
3. RealStory와 InstaTheyool 섹션은 개별 색상 유지 (사용자 선호)

**Coral Pink 팔레트 (보조 컬러):**
- **coral-500**: #F4A5B0 (따뜻한 강조색)
- **coral-600**: #EF7E90 (진한 강조)

**적용 예시:**
- **홈페이지 히어로**: Sage Green 배경, sage-500 CTA 버튼
- **상담 프로세스**: Sage Green 버튼 및 강조 요소
- **상담 타이밍 가이드**: Sage → Coral 그라데이션으로 긴급성 표현
- **체크마크/아이콘**: sage-700 (짙은 쑥색)으로 포인트

**기존 페이지별 색상:**
- **성공사례**: 핑크 계열 (#ec4899) - 유지
- **변호사 칼럼**: Amber/Orange 계열 (#f59e0b) - 유지
- **이혼큐레이션**: Amber 계열 - 유지

**디자인 철학:**
- 이혼 상담 고객의 불안감을 줄이는 차분한 색상
- 전문성과 접근성의 균형 (60% 친근함, 40% 권위)
- 임신 앱의 현대적이고 따뜻한 느낌 차용
- 법률 업계의 딱딱한 Navy/Gray 탈피

### 레이아웃
- 최대 너비: 1200px (홈페이지), 1040px (콘텐츠 페이지)
- 모바일 우선 반응형
- 그라데이션 배경 활용
- 부드러운 애니메이션
- 넉넉한 여백 (불안감 감소)
