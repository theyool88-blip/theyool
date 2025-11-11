# 개발 가이드

## 🎯 코딩 규칙

### 파일 명명 규칙
- **Server Components**: `page.tsx`, `layout.tsx`
- **Client Components**: `ComponentName.tsx` (파스칼 케이스)
- **Utility Functions**: `functionName.ts` (카멜 케이스)

### 컴포넌트 구조
```typescript
// Server Component (기본)
export default async function Page() {
  const data = await fetchData();
  return <ClientComponent data={data} />;
}

// Client Component (상호작용 필요시)
'use client';
export default function ClientComponent({ data }) {
  const [state, setState] = useState();
  // ...
}
```

### ISR (Incremental Static Regeneration)
```typescript
// 60초마다 재생성
export const revalidate = 60;
```

## 📦 Notion CMS 사용법

### 1. 데이터 가져오기
```typescript
import { getCases } from '@/lib/notion/cases';

// Server Component에서
const cases = await getCases();
```

### 2. Notion 데이터베이스 속성 추가
```typescript
await notion.databases.update({
  database_id: DATABASE_ID,
  properties: {
    '새속성': {
      select: {
        options: [
          { name: '옵션1', color: 'blue' },
          { name: '옵션2', color: 'green' }
        ]
      }
    }
  }
});
```

### 3. Notion에 데이터 쓰기
```typescript
await notion.pages.create({
  parent: { database_id: DATABASE_ID },
  properties: {
    '제목': {
      title: [{ text: { content: '제목 텍스트' } }]
    },
    '카테고리': {
      select: { name: '카테고리명' }
    }
  }
});
```

## 🎨 디자인 시스템

### 색상 체계
- **성공사례**: Pink 계열 (`from-pink-50`, `bg-pink-600`)
- **변호사 칼럼**: Amber/Orange 계열 (`from-amber-50`, `bg-amber-600`)
- **Primary**: Gray-900 (`bg-gray-900`, `text-gray-900`)

### 그라디언트 패턴
```tsx
<div className="bg-gradient-to-br from-amber-50 via-orange-50/30 to-white">
  {/* 따뜻한 느낌 */}
</div>
```

### 카드 스타일
```tsx
<div className="bg-white rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 border border-gray-100">
  {/* 카드 내용 */}
</div>
```

## 🚀 새 페이지 추가하기

### 1. Server Component 생성
```typescript
// app/new-page/page.tsx
import { getData } from '@/lib/notion/data';
import ClientComponent from './ClientComponent';

export const revalidate = 60;

export default async function NewPage() {
  const data = await getData();
  return <ClientComponent data={data} />;
}
```

### 2. Client Component 생성
```typescript
// app/new-page/ClientComponent.tsx
'use client';

import PageLayout from '@/components/layouts/PageLayout';
import ScrollReveal from '@/components/ScrollReveal';

export default function ClientComponent({ data }) {
  return (
    <PageLayout>
      <section className="py-20 px-6">
        <ScrollReveal>
          <h1>New Page</h1>
        </ScrollReveal>
      </section>
    </PageLayout>
  );
}
```

### 3. 네비게이션 추가
```typescript
// components/ui/MobileMenu.tsx
const sectionLinks = [
  // ... 기존 링크
  { label: '새 페이지', href: '/new-page' },
];
```

## 🔍 디버깅 팁

### Notion API 테스트
```bash
node -e "const { Client } = require('@notionhq/client'); const notion = new Client({ auth: 'YOUR_API_KEY' }); notion.databases.query({ database_id: 'YOUR_DB_ID' }).then(res => console.log(res.results.length));"
```

### 빌드 캐시 삭제
```bash
rm -rf .next && npm run dev
```

### 포트 충돌 해결
```bash
lsof -ti:3000 | xargs kill
```

## 📝 커밋 메시지 규칙

```
feat: 새 기능 추가
fix: 버그 수정
docs: 문서 변경
style: 코드 포맷팅 (기능 변경 없음)
refactor: 리팩토링
test: 테스트 추가
chore: 빌드 프로세스 또는 도구 변경
```

예시:
```
feat: Add blog detail page with prose typography
fix: Fix Notion image rendering on mobile
docs: Update CLAUDE.md with latest development status
```

## 🐛 자주 발생하는 문제

### 1. Notion API 버전 문제
**문제**: `notion.databases.query is not a function`
**해결**: `@notionhq/client` v2.2.15 사용
```bash
npm uninstall @notionhq/client
npm install @notionhq/client@2.2.15
```

### 2. 이미지 로딩 실패
**문제**: Next.js Image component 에러
**해결**: `next.config.ts`에 도메인 추가
```typescript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: '*.amazonaws.com',
    },
  ],
}
```

### 3. 빌드 타임아웃
**문제**: `generateStaticParams` 타임아웃
**해결**: ISR 사용 또는 경로 제한
```typescript
export const dynamic = 'force-dynamic';
// 또는
export const revalidate = 60;
```

## 🚢 배포 전 체크리스트

- [ ] `.env.local` 값 확인
- [ ] 빌드 테스트 (`npm run build`)
- [ ] 이미지 최적화 확인
- [ ] 모바일 반응형 테스트
- [ ] 메타 태그 및 SEO 설정
- [ ] 에러 페이지 테스트
- [ ] 라이트하우스 점수 확인
