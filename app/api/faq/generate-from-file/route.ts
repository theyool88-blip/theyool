import { NextRequest, NextResponse } from 'next/server';
import { listFaqPages, overwritePageBodyWithAnswer, buildTossStyleAnswerBlocks } from '@/lib/notion/faq';
import fs from 'fs/promises';

export const dynamic = 'force-dynamic';

type Body = {
  databaseId?: string;
  filePath?: string; // workspace-relative, e.g., data/divorce.txt
  limit?: number;
  dryRun?: boolean;
};

function tokenizeKorean(text: string): string[] {
  return text
    .replace(/[\t\r]+/g, ' ')
    .replace(/\s+/g, ' ')
    .split(/\s+/)
    .map((w) => w.trim())
    .filter(Boolean);
}

function splitSentences(text: string): string[] {
  // Rough splitter: split by period, question/exclamation, or newline
  return text
    .split(/(?<=\.|\?|!|\n)/)
    .map((s) => s.replace(/\s+/g, ' ').trim())
    .filter((s) => s.length > 0);
}

function scoreSentence(qTokens: string[], sTokens: string[]): number {
  const setQ = new Set(qTokens);
  let hit = 0;
  for (const t of sTokens) if (setQ.has(t)) hit++;
  return hit / Math.max(3, sTokens.length);
}

function buildAnswerFromCorpus(question: string, corpus: string): string {
  const sentences = splitSentences(corpus).slice(0, 3000); // safety cap
  const qTokens = tokenizeKorean(question);
  const ranked = sentences
    .map((s) => ({ s, score: scoreSentence(qTokens, tokenizeKorean(s)) }))
    .sort((a, b) => b.score - a.score);

  const top = ranked.slice(0, 4).map((r) => r.s.length > 180 ? r.s.slice(0, 177) + '…' : r.s);
  if (top.length === 0) {
    return '짧게: 내 상황을 먼저 정리하면 답이 보입니다.\n- 핵심사실·증거·시간표\n- 원하는 결과를 한 문장으로\n- 필요한 서류 체크\n저희가 한 단계씩 함께 정리해 드릴게요.';
  }

  const oneLiner = `짧게: ${top[0]}`;
  const bullets = top.slice(1, 4);
  const close = '조금 복잡해 보여도, 저희가 핵심만 추려 드릴게요.';
  return [oneLiner, ...bullets, close].join('\n');
}

export async function POST(req: NextRequest) {
  try {
    const { databaseId, filePath = 'data/faq_corpus.txt', limit, dryRun } = (await req.json()) as Body;
    const absText = await fs.readFile(process.cwd() + '/' + filePath, 'utf8');
    const pages = await listFaqPages(databaseId);
    const useN = limit && limit > 0 ? limit : pages.length;

    const processed: Array<{ id: string; title: string }> = [];
    for (const p of pages.slice(0, useN)) {
      const answer = buildAnswerFromCorpus(p.title, absText);
      if (!dryRun) {
        await overwritePageBodyWithAnswer(p.id, answer);
      }
      processed.push({ id: p.id, title: p.title });
    }

    return NextResponse.json({ ok: true, count: processed.length, pages: processed, dryRun: !!dryRun });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || 'unknown_error' }, { status: 500 });
  }
}

