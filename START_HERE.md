# 개발 시작 가이드

**최종 업데이트**: 2025-11-05
**상태**: 계획 완료, 개발 시작 준비

---

## 핵심 결정사항

### ✅ 확정된 것들
1. **기술 스택**: Next.js 16 + Supabase + TypeScript + Tailwind
2. **디자인**: Toss 스타일 미니멀리즘
3. **상담 루트**: **"상담문의" 단일 폼** (복잡하게 하지 않음)
4. **게시판**: 성공사례 + 칼럼 (검색, 필터, 페이지네이션)

---

## Phase 1: 즉시 개발 (1주일)

### 목표
사용자가 사이트를 방문하여 정보를 얻고, 상담 신청을 할 수 있는 **최소 기능 제품(MVP)**

### 개발 순서

#### 1. 상담문의 시스템 🔥
**파일**:
- `components/features/ConsultationForm.tsx` - 상담 폼 컴포넌트
- `components/ui/ConsultationButton.tsx` - 고정 버튼 (헤더 + 하단)
- `app/api/consultations/route.ts` - API (Supabase 저장)

**기능**:
- 이름, 전화번호, 이메일, 상담 분야, 메시지
- 개인정보 동의 체크박스
- 제출 시 Supabase consultations 테이블에 저장
- 성공 시 안내 메시지

**위치**:
- 헤더: "상담문의" 버튼
- 각 페이지 하단: CTA 섹션
- 모바일: 하단 고정 플로팅 버튼

---

#### 2. FAQ 페이지 📋
**파일**:
- `app/faq/page.tsx`
- `components/features/FAQItem.tsx` - 아코디언 UI

**내용 (10~15개)**:
- Q: 상담 비용이 있나요?
- A: 초기 상담은 무료입니다. 30분간 상황을 파악하고 방향을 안내해 드립니다.

- Q: 비용은 얼마나 드나요?
- A: 사건의 복잡도에 따라 다릅니다. 자세한 내용은 수임료 안내 페이지를 참고해주세요.

- Q: 기간은 얼마나 걸리나요?
- A: 협의이혼은 3~6개월, 재판이혼은 1~2년 정도 소요됩니다.

*(더 추가 필요)*

**기능**:
- 카테고리별 분류 (비용, 절차, 위자료, 재산분할, 양육권, 상간사건)
- 아코디언 UI (클릭 시 펼침/접기)
- 검색 기능 (선택)

---

#### 3. 법적 필수 페이지 ⚖️
**파일**:
- `app/privacy/page.tsx` - 개인정보처리방침
- `app/terms/page.tsx` - 이용약관

**내용**:
- 템플릿 사용 (법률 사이트 표준)
- 수집 항목: 이름, 전화번호, 이메일, 상담 내용
- 보관 기간: 상담 완료 후 1년
- 제3자 제공: 하지 않음

---

#### 4. 오시는길 페이지 🗺️
**파일**:
- `app/contact/page.tsx`

**내용**:
- 주소
- 전화번호
- 이메일
- 운영시간
- 지도 (Kakao Map 또는 Google Maps)
- 대중교통 안내
- 주차 안내
- 상담문의 폼

---

#### 5. 모바일 네비게이션 📱
**파일**:
- `components/layout/MobileMenu.tsx` - 햄버거 메뉴
- `components/layout/Header.tsx` - 업데이트

**기능**:
- 햄버거 아이콘 (모바일만)
- 슬라이드 인 메뉴
- 모든 페이지 링크
- 상담문의 강조

---

#### 6. Supabase 설정 ⚡
**작업**:
1. Supabase 프로젝트 생성
2. consultations 테이블 생성
3. 환경 변수 설정 (.env.local)
4. lib/supabase/client.ts 작성
5. lib/supabase/server.ts 작성

**테이블**:
```sql
CREATE TABLE consultations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  category TEXT,
  message TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## Phase 2: 콘텐츠 페이지 (2주)

### 7. The Plan 페이지
**파일**: `app/the-plan/page.tsx`

**내용**:
- 더 플랜 소개
- 3단계 전략 프로세스
- 차별화 포인트
- 성공 사례 하이라이트

---

### 8. 서비스 상세 페이지 4개
**파일**:
- `app/services/alimony/page.tsx`
- `app/services/property/page.tsx`
- `app/services/custody/page.tsx`
- `app/services/adultery/page.tsx`

**공통 구조**:
1. 서비스 정의
2. 관련 법률 근거
3. 진행 절차
4. 성공 사례 (2~3개)
5. 예상 비용/기간
6. FAQ (서비스별)
7. 상담문의 CTA

---

### 9. 상담 프로세스 안내
**파일**: `app/process/page.tsx`

**내용**:
- 6단계 프로세스 인포그래픽
  1. 상담 신청
  2. 초기 상담 (30분 무료)
  3. 사건 분석 및 전략 수립
  4. 계약
  5. 진행 (소 제기, 조정, 심리)
  6. 완료
- 각 단계별 소요 시간
- 필요 서류 안내

---

### 10. 이혼 절차 가이드
**파일**: `app/guide/page.tsx`

**내용**:
- 협의이혼 vs 재판이혼
- 재판이혼 절차 상세
- 필요 서류
- 예상 기간
- 변호사 역할

---

### 11. 수임료 안내
**파일**: `app/fees/page.tsx`

**내용**:
- 투명한 비용 공개
- 협의이혼 vs 재판이혼 비용
- 추가 비용 발생 조건
- 결제 방법
- 분할 납부 가능 여부
- 상담문의 CTA

---

### 12. 성공사례 페이지 (공개)
**파일**:
- `app/cases/page.tsx` - 목록
- `app/cases/[id]/page.tsx` - 상세

**기능**:
- 카테고리 필터
- 검색
- 정렬
- 페이지네이션
- 조회수
- 관련 사례

---

### 13. 구성원 소개
**파일**: `app/team/page.tsx`

**내용**:
- 대표 변호사 프로필
- 소속 변호사 프로필
- 학력, 경력, 전문 분야
- 팀 철학

---

## Phase 3: 관리자 시스템 (3주)

### 14. 관리자 로그인
**파일**:
- `app/admin/login/page.tsx`
- `app/api/auth/login/route.ts`
- `middleware.ts`

---

### 15. 관리자 대시보드
**파일**: `app/admin/page.tsx`

**기능**:
- 통계 (상담 신청, 사례, 칼럼 수)
- 최근 상담 신청 5개
- 빠른 작업 링크

---

### 16. 상담 신청 관리
**파일**: `app/admin/consultations/page.tsx`

**기능**:
- 목록 조회
- 상태 관리 (대기/진행중/완료)
- 메모 추가

---

### 17. 성공사례 CRUD
**파일**:
- `app/admin/cases/page.tsx` - 목록
- `app/admin/cases/new/page.tsx` - 생성
- `app/admin/cases/[id]/page.tsx` - 수정

---

### 18. 칼럼 CRUD
**파일**:
- `app/admin/blog/page.tsx` - 목록
- `app/admin/blog/new/page.tsx` - 생성
- `app/admin/blog/[id]/page.tsx` - 수정

---

## 개발 시작 전 체크리스트

- [ ] Supabase 계정 생성
- [ ] 프로젝트 생성 완료
- [ ] 환경 변수 확인 (.env.local)
- [ ] 필요한 콘텐츠 준비 (FAQ, 서비스 설명 등)
- [ ] 로고 확인 ✅
- [ ] 지도 API 키 (Kakao 또는 Google)

---

## 현재 상태

### 완료 ✅
- 홈페이지 기본 구조
- 디자인 시스템 (Toss 스타일)
- 로고 적용
- 스크롤 애니메이션

### 다음 작업
1. **Supabase 설정** (가장 먼저)
2. **상담문의 폼** 구현
3. **FAQ 페이지** 작성
4. **법적 필수 페이지** 작성

---

## 빠른 시작

### Option A: Supabase부터 설정
```bash
# Supabase 프로젝트 생성 후
npm install @supabase/supabase-js @supabase/ssr

# .env.local 생성
NEXT_PUBLIC_SUPABASE_URL=your-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key
```

### Option B: 정적 페이지부터 개발
- FAQ 페이지 (정적 콘텐츠)
- 개인정보처리방침 (정적)
- 이용약관 (정적)
- The Plan (정적)

### 추천: **Option A → Option B 순서**
1. Supabase 설정 (10분)
2. 상담문의 폼 (30분)
3. FAQ 작성 (1시간)
4. 법적 페이지 (30분)

---

**준비 완료!** 어디서부터 시작하시겠습니까?
