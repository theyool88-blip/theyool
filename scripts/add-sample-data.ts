import { Client } from '@notionhq/client';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// .env.local 파일 로드
dotenv.config({ path: resolve(__dirname, '../.env.local') });

const notion = new Client({ auth: process.env.NOTION_API_KEY });

// 재시도 헬퍼 함수
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 4,
  initialDelay: number = 2000
): Promise<T> {
  let lastError: any;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error: any) {
      lastError = error;

      if (i < maxRetries - 1) {
        const delay = initialDelay * Math.pow(2, i);
        console.log(`⏳ 재시도 ${i + 1}/${maxRetries - 1} (${delay}ms 후)...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError;
}

const BLOG_DB_ID = process.env.NOTION_BLOG_DB!;
const CASES_DB_ID = process.env.NOTION_CASES_DB!;
const INSTAGRAM_DB_ID = process.env.NOTION_INSTAGRAM_DB!;

// 블로그 샘플 데이터
const sampleBlogPosts = [
  {
    title: '이혼 시 재산분할, 어떻게 준비해야 할까요?',
    slug: 'divorce-property-division-guide',
    category: '재산분할',
    tags: ['이혼', '재산분할', '법률상담'],
    published: true,
    featured: true,
    date: '2024-01-15',
    views: 150,
  },
  {
    title: '위자료 청구의 핵심 요건과 판례 분석',
    slug: 'alimony-requirements-analysis',
    category: '위자료',
    tags: ['위자료', '판례', '손해배상'],
    published: true,
    featured: false,
    date: '2024-01-20',
    views: 230,
  },
  {
    title: '양육권 분쟁, 아이의 최선의 이익은?',
    slug: 'custody-dispute-child-welfare',
    category: '양육권',
    tags: ['양육권', '친권', '아동복지'],
    published: true,
    featured: true,
    date: '2024-01-25',
    views: 180,
  },
];

// 케이스 샘플 데이터
const sampleCases = [
  {
    title: '혼인 파탄 원인 입증으로 위자료 5천만원 승소',
    slug: 'alimony-50million-win',
    category: '위자료',
    result: '의뢰인이 배우자의 지속적인 폭언과 외도로 인한 정신적 고통을 입증하여 위자료 5천만원 판결을 받았습니다.',
    bgColor: 'pink',
    published: true,
    date: '2023-12-10',
  },
  {
    title: '복잡한 자산 구조 분석으로 재산분할 65% 확보',
    slug: 'property-division-65-percent',
    category: '재산분할',
    result: '배우자가 숨긴 부동산과 주식 자산을 모두 찾아내어 총 재산의 65%를 분할받는 데 성공했습니다.',
    bgColor: 'green',
    published: true,
    date: '2023-12-15',
  },
  {
    title: '부적절한 양육 환경 입증으로 양육권 확보',
    slug: 'custody-win-unsafe-environment',
    category: '양육권',
    result: '상대방의 부적절한 양육 환경과 아동 학대 증거를 제시하여 친권과 양육권을 모두 확보했습니다.',
    bgColor: 'purple',
    published: true,
    date: '2023-12-20',
  },
];

// 인스타그램 샘플 데이터 (케이스/블로그 ID는 추가 후 연결)
const sampleInstagramPosts = [
  {
    title: '💰 재산분할 성공 사례',
    type: '성공사례',
    caption: '복잡한 자산 구조도 꼼꼼히 분석하면\n정당한 몫을 찾을 수 있습니다.\n\n#이혼전문변호사 #재산분할 #성공사례',
    views: 320,
    likes: 45,
    published: true,
    date: '2024-01-10',
  },
  {
    title: '📚 이혼 재산분할 가이드',
    type: '칼럼',
    caption: '이혼 시 재산분할, 제대로 알고 준비하세요!\n더율 변호사가 알려드립니다.\n\n#이혼상담 #재산분할 #법률정보',
    views: 280,
    likes: 38,
    published: true,
    date: '2024-01-12',
  },
  {
    title: '⚖️ 더율 법률사무소 소개',
    type: '홍보',
    caption: '가족법 전문, 더율 법률사무소입니다.\n당신의 권리를 지키는 든든한 파트너가 되겠습니다.\n\n#더율 #가족법전문 #이혼변호사',
    views: 410,
    likes: 52,
    published: true,
    date: '2024-01-08',
  },
];

async function addBlogPosts() {
  console.log('\n📝 블로그 포스트 추가 중...');
  const addedPosts = [];

  for (const post of sampleBlogPosts) {
    try {
      const response = await retryWithBackoff(() =>
        notion.pages.create({
          parent: { database_id: BLOG_DB_ID },
          properties: {
            제목: {
              title: [{ text: { content: post.title } }],
            },
            slug: {
              rich_text: [{ text: { content: post.slug } }],
            },
            카테고리: {
              select: { name: post.category },
            },
            태그: {
              multi_select: post.tags.map(tag => ({ name: tag })),
            },
            공개: {
              checkbox: post.published,
            },
            추천: {
              checkbox: post.featured,
            },
            작성일: {
              date: { start: post.date },
            },
            조회수: {
              number: post.views,
            },
          },
        })
      );

      addedPosts.push({ id: response.id, ...post });
      console.log(`✅ 추가됨: ${post.title}`);
    } catch (error) {
      console.error(`❌ 실패: ${post.title}`, error);
    }
  }

  return addedPosts;
}

async function addCases() {
  console.log('\n📋 케이스 추가 중...');
  const addedCases = [];

  for (const caseData of sampleCases) {
    try {
      const response = await retryWithBackoff(() =>
        notion.pages.create({
          parent: { database_id: CASES_DB_ID },
          properties: {
            제목: {
              title: [{ text: { content: caseData.title } }],
            },
            slug: {
              rich_text: [{ text: { content: caseData.slug } }],
            },
            카테고리: {
              select: { name: caseData.category },
            },
            결과: {
              rich_text: [{ text: { content: caseData.result } }],
            },
            배경색: {
              select: { name: caseData.bgColor },
            },
            공개: {
              checkbox: caseData.published,
            },
            작성일: {
              date: { start: caseData.date },
            },
          },
        })
      );

      addedCases.push({ id: response.id, ...caseData });
      console.log(`✅ 추가됨: ${caseData.title}`);
    } catch (error) {
      console.error(`❌ 실패: ${caseData.title}`, error);
    }
  }

  return addedCases;
}

async function addInstagramPosts(caseIds: string[], blogIds: string[]) {
  console.log('\n📸 인스타그램 포스트 추가 중...');

  for (let i = 0; i < sampleInstagramPosts.length; i++) {
    const post = sampleInstagramPosts[i];

    try {
      const properties: any = {
        제목: {
          title: [{ text: { content: post.title } }],
        },
        타입: {
          select: { name: post.type },
        },
        캡션: {
          rich_text: [{ text: { content: post.caption } }],
        },
        조회수: {
          number: post.views,
        },
        좋아요수: {
          number: post.likes,
        },
        공개: {
          checkbox: post.published,
        },
        게시일: {
          date: { start: post.date },
        },
      };

      // 첫 번째 포스트는 케이스와 연결
      if (i === 0 && caseIds.length > 0) {
        properties.성공사례 = {
          relation: [{ id: caseIds[0] }],
        };
      }

      // 두 번째 포스트는 블로그와 연결
      if (i === 1 && blogIds.length > 0) {
        properties.변호사칼럼 = {
          relation: [{ id: blogIds[0] }],
        };
      }

      await retryWithBackoff(() =>
        notion.pages.create({
          parent: { database_id: INSTAGRAM_DB_ID },
          properties,
        })
      );

      console.log(`✅ 추가됨: ${post.title}`);
    } catch (error) {
      console.error(`❌ 실패: ${post.title}`, error);
    }
  }
}

async function main() {
  console.log('🚀 샘플 데이터 추가 시작...\n');
  console.log('환경 변수 확인:');
  console.log(`- NOTION_API_KEY: ${process.env.NOTION_API_KEY ? '설정됨' : '없음'}`);
  console.log(`- BLOG_DB_ID: ${BLOG_DB_ID}`);
  console.log(`- CASES_DB_ID: ${CASES_DB_ID}`);
  console.log(`- INSTAGRAM_DB_ID: ${INSTAGRAM_DB_ID}`);

  try {
    // 1. 블로그 포스트 추가
    const addedBlogs = await addBlogPosts();

    // 2. 케이스 추가
    const addedCases = await addCases();

    // 3. 인스타그램 포스트 추가 (케이스/블로그와 연결)
    const caseIds = addedCases.map(c => c.id);
    const blogIds = addedBlogs.map(b => b.id);
    await addInstagramPosts(caseIds, blogIds);

    console.log('\n✨ 모든 샘플 데이터 추가 완료!');
    console.log(`\n📊 추가된 데이터:`);
    console.log(`- 블로그 포스트: ${addedBlogs.length}개`);
    console.log(`- 성공 사례: ${addedCases.length}개`);
    console.log(`- 인스타그램 포스트: ${sampleInstagramPosts.length}개`);
  } catch (error) {
    console.error('❌ 오류 발생:', error);
    process.exit(1);
  }
}

main();
