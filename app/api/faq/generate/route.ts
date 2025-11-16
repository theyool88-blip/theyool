import { NextRequest, NextResponse } from 'next/server';
import { listFaqPages, overwritePageBodyWithAnswer, generateDefaultAnswer } from '@/lib/notion/faq';

export const dynamic = 'force-dynamic';

type Body = {
  databaseId?: string;
  answersByTitle?: Record<string, string>;
  limit?: number;
  dryRun?: boolean;
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Body;
    const pages = await listFaqPages(body.databaseId);
    const limit = body.limit && body.limit > 0 ? body.limit : pages.length;
    const used: Array<{ id: string; title: string }> = [];

    for (const p of pages.slice(0, limit)) {
      const answer = body.answersByTitle?.[p.title] ?? generateDefaultAnswer(p.title);
      if (!body.dryRun) {
        await overwritePageBodyWithAnswer(p.id, answer);
      }
      used.push({ id: p.id, title: p.title });
    }

    return NextResponse.json({ ok: true, count: used.length, pages: used, dryRun: !!body.dryRun });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || 'unknown_error' }, { status: 500 });
  }
}

