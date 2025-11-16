# 법무법인 더율 웹사이트 개발 문서

**마지막 업데이트**: 2025-11-15

## 프로젝트 개요
- **프로젝트명**: 법무법인 더율 공식 웹사이트
- **목적**: 이혼 전문 법률 서비스 제공 및 의뢰인 상담 유도
- **기술 스택**: Next.js 16.0.1, React 19, TypeScript, Tailwind CSS 4.0
- **데이터베이스**: Supabase (PostgreSQL + Auth + Storage)

---

## ✅ 완료된 주요 기능 (2025-11-15 기준)

### 1. 홈페이지 (/)
- 히어로 섹션, 전문성 강조, 서비스 소개
- 수임료 공개, 의뢰인 후기, CTA
- 스크롤 애니메이션, 모바일 최적화
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
- (공개 페이지 미구현)

### 6. 정책 페이지
- **개인정보처리방침** (/privacy) ✅
- **면책공고** (/disclaimer) ✅
- 이용약관 (/terms) - 미구현

### 7. 관리자 시스템 (/admin)
- **로그인**: 쿠키 기반 세션 인증
- **대시보드**: 통계 및 빠른 작업 링크
- **성공사례 관리**: 테이블 뷰, CRUD
- **칼럼 관리**: Markdown 에디터, 자동저장, 미리보기
- **Instagram 관리**: 이미지 업로드, 드래그앤드롭
- **FAQ 관리**: 카테고리별 관리, CRUD

### 8. 공통 컴포넌트
- PageLayout (헤더 + Footer)
- MobileMenu (햄버거 메뉴, 아코디언)
- ImageUploader (파일 업로드, 드래그앤드롭)
- ConsultationButton (상담 예약)

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

### Phase 1 (즉시 필요)
1. ⬜ **The Plan 페이지** (/the-plan) - 핵심 승소전략 소개
2. ⬜ **오시는길 페이지** (/contact) - 지도 + 연락처 + 상담 신청 폼
3. ⬜ **이용약관 페이지** (/terms)
4. ⬜ **인스타더율 페이지** (/insta-theyool) - Instagram 게시물 전시

### Phase 2 (중요)
5. ⬜ **구성원소개 페이지** (/team)
6. ⬜ **서비스 상세 페이지 4개**
   - /services/alimony (위자료)
   - /services/property (재산분할)
   - /services/custody (양육권)
   - /services/adultery (상간사건)

### Phase 3 (추가 기능)
7. ⬜ 상담 신청 폼 및 관리
8. ⬜ Google Analytics 연동
9. ⬜ SEO 최적화 (sitemap.xml, robots.txt)

---

## 🌐 네비게이션 구조

```
홈 (/)
The Plan (/the-plan)
성공사례 (/cases)
이혼가이드 (드롭다운)
  ├─ 이혼큐레이션(Q&A) (/faq)
  └─ 변호사 칼럼 (/blog)
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

### 색상 테마
- **성공사례**: 핑크 계열 (#ec4899)
- **변호사 칼럼**: Amber/Orange 계열 (#f59e0b)
- **이혼큐레이션**: Amber 계열
- **공통**: 전문적이면서 따뜻한 느낌

### 레이아웃
- 최대 너비: 1040px
- 모바일 우선 반응형
- 그라데이션 배경 활용
- 부드러운 애니메이션
