# 법무법인 더율 웹사이트

이혼 전문 법률 서비스를 제공하는 법무법인 더율의 공식 웹사이트입니다.

## 🚀 빠른 시작

```bash
# 의존성 설치
npm install

# 개발 서버 시작
npm run dev

# 프로덕션 빌드
npm run build
npm start
```

개발 서버: http://localhost:3000

## 📚 프로젝트 문서

- **[CLAUDE.md](./CLAUDE.md)** - 전체 프로젝트 계획 및 개발 현황 (Claude Code AI 에이전트용)
- **[NOTION_SETUP.md](./NOTION_SETUP.md)** - Notion CMS 설정 가이드
- **[DEVELOPMENT.md](./DEVELOPMENT.md)** - 개발 가이드 및 코딩 규칙

## 🛠️ 기술 스택

- **프레임워크**: Next.js 16.0.1 (App Router)
- **언어**: TypeScript, React 19
- **스타일링**: Tailwind CSS 4.0
- **CMS**: Notion API
- **데이터베이스**: Supabase (향후)
- **배포**: Vercel (예정)

## 📁 프로젝트 구조

```
theyool/
├── app/                    # Next.js App Router
│   ├── page.tsx           # 홈페이지
│   ├── cases/             # 성공사례
│   ├── blog/              # 변호사 칼럼
│   └── ...
├── components/            # React 컴포넌트
│   ├── features/          # 기능별 컴포넌트
│   ├── layouts/           # 레이아웃 컴포넌트
│   └── ui/                # UI 컴포넌트
├── lib/                   # 유틸리티 & API
│   └── notion/            # Notion CMS
└── public/                # 정적 파일
```

## 🔑 환경 변수

`.env.local` 파일을 생성하고 다음 값을 설정하세요:

```bash
# Notion API
NOTION_API_KEY=your_notion_api_key
NOTION_CASES_DB=your_cases_database_id
NOTION_BLOG_DB=your_blog_database_id
NOTION_INSTAGRAM_DB=your_instagram_database_id

# Supabase (향후)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## ✅ 현재 완성된 페이지

- ✅ 홈페이지 (/)
- ✅ 성공사례 목록/상세 (/cases, /cases/[slug])
- ✅ 변호사 칼럼 목록/상세 (/blog, /blog/[slug])

## 🚧 개발 중

- ⬜ The Plan 페이지 (/the-plan)
- ⬜ 오시는길 (/contact)
- ⬜ 인스타더율 (/insta-theyool)
- ⬜ 구성원소개 (/team)

## 📝 라이선스

Private - All Rights Reserved
