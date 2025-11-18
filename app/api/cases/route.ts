import { NextRequest, NextResponse } from 'next/server';
import { getCasesByCategory } from '@/lib/supabase/cases';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const limit = searchParams.get('limit');

    if (!category) {
      return NextResponse.json(
        { error: 'Category parameter is required' },
        { status: 400 }
      );
    }

    const cases = await getCasesByCategory(
      category,
      limit ? parseInt(limit, 10) : 10
    );

    return NextResponse.json(cases);
  } catch (error) {
    console.error('Cases API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cases' },
      { status: 500 }
    );
  }
}
