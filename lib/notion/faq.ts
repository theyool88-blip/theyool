import { notion } from './client';

const FAQ_DB_ID = process.env.NOTION_FAQ_DB || '';

export interface FaqPage {
  id: string;
  title: string;
}

function extractTitleFromProperties(props: Record<string, any>): string {
  // Find the title typed property regardless of property name (Name/제목/타이틀 등)
  for (const key of Object.keys(props)) {
    const p = props[key];
    if (p && p.type === 'title') {
      const arr = p.title as Array<any>;
      return arr?.map((t) => t.plain_text).join('') || '';
    }
  }
  return '';
}

export async function listFaqPages(dbId = FAQ_DB_ID): Promise<FaqPage[]> {
  if (!dbId) throw new Error('NOTION_FAQ_DB is not set');
  const pages: FaqPage[] = [];
  let cursor: string | undefined = undefined;
  do {
    const resp = await notion.databases.query({
      database_id: dbId,
      start_cursor: cursor,
      page_size: 50,
    });
    for (const r of resp.results) {
      if ('properties' in r) {
        pages.push({ id: r.id, title: extractTitleFromProperties((r as any).properties) });
      }
    }
    cursor = (resp as any).next_cursor || undefined;
  } while (cursor);
  return pages;
}

export async function clearPageBody(pageId: string) {
  // List children and archive them
  let cursor: string | undefined = undefined;
  const blockIds: string[] = [];
  do {
    const resp = await notion.blocks.children.list({ block_id: pageId, start_cursor: cursor, page_size: 50 });
    blockIds.push(...resp.results.map((b: any) => b.id));
    cursor = (resp as any).next_cursor || undefined;
  } while (cursor);

  // Archive existing blocks (Notion API does not have direct delete)
  await Promise.all(
    blockIds.map((id) => notion.blocks.update({ block_id: id, archived: true }).catch(() => {}))
  );
}

export function buildTossStyleAnswerBlocks(answerText: string) {
  // Split lines. First line = one-liner. Next 2-4 lines as bullets. Rest as plain paragraph.
  const lines = answerText.split(/\n+/).map((s) => s.trim()).filter(Boolean);
  const first = lines.shift() || '';
  const bullets = lines.slice(0, 4);
  const rest = lines.slice(4);

  const blocks: any[] = [];
  if (first) {
    blocks.push({
      paragraph: {
        rich_text: [{ type: 'text', text: { content: first } }],
        color: 'default',
      },
    });
  }
  for (const b of bullets) {
    blocks.push({
      bulleted_list_item: {
        rich_text: [{ type: 'text', text: { content: b } }],
      },
    });
  }
  if (rest.length) {
    blocks.push({
      paragraph: {
        rich_text: [{ type: 'text', text: { content: rest.join('\n') } }],
      },
    });
  }
  // Friendly footer CTA (Toss-ish)
  blocks.push({
    callout: {
      icon: { emoji: '💬' },
      rich_text: [
        {
          type: 'text',
          text: { content: '상황마다 답이 달라질 수 있어요. 3분이면 상담 예약 가능합니다.' },
          annotations: { bold: false },
        },
      ],
      color: 'gray_background',
    },
  });
  return blocks;
}

export function generateDefaultAnswer(question: string): string {
  const q = question.toLowerCase();

  const make = (one: string, b: string[], tail = '조금 복잡해도, 저희가 핵심만 추려 드릴게요.') =>
    [one, ...b, tail].join('\n');

  // 위자료
  if (q.includes('위자료')) {
    return make(
      '짧게: 위자료는 “책임 정도 + 입증된 사실”로 결정됩니다.',
      [
        '책임 입증: 폭력·불륜 등 사실관계와 정황을 기록/정리',
        '증거 체크: 대화 내역·계좌내역·사진/영상 등 합법적 수집',
        '시간표 만들기: 발생 시점과 증거 연결, 공백 최소화',
      ]
    );
  }

  // 재산분할
  if (q.includes('재산분할')) {
    return make(
      '짧게: 재산분할은 “기여도 + 재산 파악력”이 전부입니다.',
      [
        '전수 조사: 예금·증권·부동산·퇴직금·코인까지 체크',
        '숨은 재산 힌트: 급격한 이체·법인카드·가상자산 거래소',
        '기여도 설계: 가사/육아·소득·지원 내역을 수치로 표현',
      ]
    );
  }

  // 양육권/면접교섭/양육비
  if (q.includes('양육권') || q.includes('양육') || q.includes('면접')) {
    return make(
      '짧게: 재판부는 “아이의 안정과 일관성”을 봅니다.',
      [
        '양육 환경: 주거, 돌봄 일정, 등·하원 체계, 협력 인력',
        '관계 기록: 아이와의 일상·학습·병원·행사 동행 기록',
        '양육비 설계: 합리적 산정표 + 실제 지출 근거 준비',
      ]
    );
  }

  // 상간/불륜 관련
  if (q.includes('상간') || q.includes('불륜') || q.includes('간통')) {
    return make(
      '짧게: 핵심은 “합법 증거로 사실관계를 단단히”.',
      [
        '증거 가이드: 위치·결제·숙박·메신저 등 정황 → 퍼즐 맞추기',
        '금지 선: 무단 침입/해킹/불법 녹음 등은 절대 금지',
        '실무 팁: 대화 캡처는 원본성 유지, 타임라인과 함께 보관',
      ]
    );
  }

  // 기간/절차
  if (q.includes('기간') || q.includes('얼마나') || q.includes('소요')) {
    return make(
      '짧게: 준비가 빠르면 절차도 짧아집니다.',
      [
        '증거 먼저: 착수 전 핵심 증거 정리 → 협의·조정 활용',
        '절차 선택: 협의/조정/소송 중 목표에 맞는 루트 결정',
        '체크리스트: 청구취지·관할·서류·기한(항소·이의) 관리',
      ]
    );
  }

  // 비용/수임료
  if (q.includes('비용') || q.includes('수임') || q.includes('변호사비')) {
    return make(
      '짧게: 사건 복잡도와 목표에 따라 투명하게 제시합니다.',
      [
        '범위 정의: 목표(위자료/재산/양육)와 쟁점 수를 먼저 확정',
        '견적 원칙: 단계별(조정/1심/항소) + 산출 근거 공유',
        '가성비 전략: 이기는 쟁점에 자원 집중, 기록은 간결하게',
      ]
    );
  }

  // 증거/녹음/카톡
  if (q.includes('증거') || q.includes('녹음') || q.includes('카톡') || q.includes('메신저')) {
    return make(
      '짧게: “합법·명확·연결성” 세 가지가 증거의 품질입니다.',
      [
        '합법 수집: 녹음은 본인 참여 원칙, 계정/기기 무단 접근 금지',
        '명확성: 원본 해상도·전체 맥락·메타정보(시간/상대) 보존',
        '연결성: 타임라인으로 사건 흐름에 맞춰 퍼즐처럼 배치',
      ]
    );
  }

  // 기본 안내
  return make(
    '짧게: 내 상황을 한 문장으로 정리하면, 답이 명확해집니다.',
    [
      '핵심 포인트 3가지: 사실관계·증거·시간표',
      '원하는 결과를 문장으로 써보기(위자료/재산/양육)',
      '필요 서류/증거 체크리스트 만들기',
    ],
  );
}

export async function overwritePageBodyWithAnswer(pageId: string, answerText: string) {
  await clearPageBody(pageId);
  await notion.blocks.children.append({
    block_id: pageId,
    children: buildTossStyleAnswerBlocks(answerText),
  });
}

// 관련 콘텐츠 인터페이스
export interface RelatedPost {
  id: string;
  제목: string;
  slug: string;
  카테고리?: string;
  썸네일?: string;
}

export interface RelatedCase {
  id: string;
  제목: string;
  slug: string;
  badge?: string;
  카테고리: string[];
  아이콘?: string;
}

// FAQ 전체 인터페이스
export interface FAQ {
  id: string;
  질문: string;
  카테고리: string[];
  순서: number;
  공개: boolean;
  추천: boolean;
  작성일: string;
  요약?: string;
  content?: string;
  관련칼럼?: RelatedPost[];
  관련사례?: RelatedCase[];
}

// Relation에서 연결된 칼럼 정보 가져오기
async function fetchRelatedPosts(relationIds: string[]): Promise<RelatedPost[]> {
  if (!relationIds || relationIds.length === 0) return [];

  try {
    const posts = await Promise.all(
      relationIds.map(async (id) => {
        const page = await notion.pages.retrieve({ page_id: id });
        const props = (page as any).properties;

        return {
          id: page.id,
          제목: extractTitleFromProperties(props),
          slug: props.slug?.rich_text?.[0]?.plain_text || '',
          카테고리: props.카테고리?.select?.name || '',
          썸네일: props.썸네일?.files?.[0]?.file?.url || props.썸네일?.files?.[0]?.external?.url,
        };
      })
    );

    return posts;
  } catch (error) {
    console.error('Error fetching related posts:', error);
    return [];
  }
}

// Relation에서 연결된 사례 정보 가져오기
async function fetchRelatedCases(relationIds: string[]): Promise<RelatedCase[]> {
  if (!relationIds || relationIds.length === 0) return [];

  try {
    const cases = await Promise.all(
      relationIds.map(async (id) => {
        const page = await notion.pages.retrieve({ page_id: id });
        const props = (page as any).properties;

        return {
          id: page.id,
          제목: extractTitleFromProperties(props),
          slug: props.slug?.rich_text?.[0]?.plain_text || '',
          badge: props.badge?.rich_text?.[0]?.plain_text || '',
          카테고리: props.카테고리?.multi_select?.map((cat: any) => cat.name) || [],
          아이콘: props.아이콘?.rich_text?.[0]?.plain_text || '',
        };
      })
    );

    return cases;
  } catch (error) {
    console.error('Error fetching related cases:', error);
    return [];
  }
}

// 공개된 FAQ 목록 조회 (속성 포함)
export async function getFAQs(): Promise<FAQ[]> {
  try {
    const response = await notion.databases.query({
      database_id: FAQ_DB_ID,
      filter: {
        property: '공개',
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          property: '순서',
          direction: 'ascending',
        },
      ],
    });

    const faqs: FAQ[] = response.results.map((page: any) => {
      const props = page.properties;

      return {
        id: page.id,
        질문: extractTitleFromProperties(props),
        카테고리: props.카테고리?.multi_select?.map((cat: any) => cat.name) || [],
        순서: props.순서?.number || 0,
        공개: props.공개?.checkbox || false,
        추천: props.추천?.checkbox || false,
        작성일: props.작성일?.date?.start || '',
        요약: props.요약?.rich_text?.[0]?.plain_text || '',
      };
    });

    return faqs;
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    return [];
  }
}

// 추천 FAQ만 조회
export async function getFeaturedFAQs(): Promise<FAQ[]> {
  try {
    const response = await notion.databases.query({
      database_id: FAQ_DB_ID,
      filter: {
        and: [
          {
            property: '공개',
            checkbox: {
              equals: true,
            },
          },
          {
            property: '추천',
            checkbox: {
              equals: true,
            },
          },
        ],
      },
      sorts: [
        {
          property: '순서',
          direction: 'ascending',
        },
      ],
    });

    const faqs: FAQ[] = response.results.map((page: any) => {
      const props = page.properties;

      return {
        id: page.id,
        질문: extractTitleFromProperties(props),
        카테고리: props.카테고리?.multi_select?.map((cat: any) => cat.name) || [],
        순서: props.순서?.number || 0,
        공개: props.공개?.checkbox || false,
        추천: props.추천?.checkbox || false,
        작성일: props.작성일?.date?.start || '',
      };
    });

    return faqs;
  } catch (error) {
    console.error('Error fetching featured FAQs:', error);
    return [];
  }
}

// 같은 카테고리의 다른 FAQ 가져오기
export async function getRelatedFAQs(currentId: string, categories: string[], limit: number = 3): Promise<FAQ[]> {
  try {
    const allFAQs = await getFAQs();

    // 현재 FAQ 제외하고 같은 카테고리인 FAQ 필터링
    const related = allFAQs
      .filter(faq => faq.id !== currentId)
      .filter(faq => faq.카테고리.some(cat => categories.includes(cat)))
      .slice(0, limit);

    return related;
  } catch (error) {
    console.error('Error fetching related FAQs:', error);
    return [];
  }
}

// 다른 카테고리의 인기 FAQ 가져오기 (추천 우선)
export async function getOtherCategoryFAQs(excludeCategories: string[], limit: number = 3): Promise<FAQ[]> {
  try {
    const allFAQs = await getFAQs();

    // 다른 카테고리이면서 추천 FAQ 우선
    const other = allFAQs
      .filter(faq => !faq.카테고리.some(cat => excludeCategories.includes(cat)))
      .sort((a, b) => {
        // 추천 FAQ를 우선 정렬
        if (a.추천 && !b.추천) return -1;
        if (!a.추천 && b.추천) return 1;
        return a.순서 - b.순서;
      })
      .slice(0, limit);

    return other;
  } catch (error) {
    console.error('Error fetching other category FAQs:', error);
    return [];
  }
}

// 본문 포함한 단일 FAQ 조회
export async function getFAQWithContent(id: string): Promise<FAQ | null> {
  try {
    const page = await notion.pages.retrieve({ page_id: id });
    const props = (page as any).properties;

    // 본문 블록 가져오기
    const blocks = await notion.blocks.children.list({
      block_id: id,
      page_size: 100,
    });

    // 블록을 텍스트로 변환 (간단 버전)
    let content = '';
    for (const block of blocks.results) {
      const b = block as any;
      if (b.type === 'paragraph' && b.paragraph?.rich_text) {
        content += b.paragraph.rich_text.map((t: any) => t.plain_text).join('') + '\n\n';
      } else if (b.type === 'bulleted_list_item' && b.bulleted_list_item?.rich_text) {
        content += '- ' + b.bulleted_list_item.rich_text.map((t: any) => t.plain_text).join('') + '\n';
      } else if (b.type === 'callout' && b.callout?.rich_text) {
        content += '\n💬 ' + b.callout.rich_text.map((t: any) => t.plain_text).join('') + '\n\n';
      }
    }

    // Relation 데이터 가져오기
    const relatedPostIds = props.관련칼럼?.relation?.map((r: any) => r.id) || [];
    const relatedCaseIds = props.관련사례?.relation?.map((r: any) => r.id) || [];

    const [관련칼럼, 관련사례] = await Promise.all([
      fetchRelatedPosts(relatedPostIds),
      fetchRelatedCases(relatedCaseIds),
    ]);

    return {
      id: page.id,
      질문: extractTitleFromProperties(props),
      카테고리: props.카테고리?.multi_select?.map((cat: any) => cat.name) || [],
      순서: props.순서?.number || 0,
      공개: props.공개?.checkbox || false,
      추천: props.추천?.checkbox || false,
      작성일: props.작성일?.date?.start || '',
      요약: props.요약?.rich_text?.[0]?.plain_text || '',
      content: content.trim(),
      관련칼럼,
      관련사례,
    };
  } catch (error) {
    console.error('Error fetching FAQ with content:', error);
    return null;
  }
}
