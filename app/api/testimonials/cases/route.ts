import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * GET /api/testimonials/cases
 * Get published testimonial cases with evidence photos (public)
 *
 * Query params:
 * - limit: number of cases to return (default: 6)
 * - featured: return only featured cases (default: false)
 * - category: filter by category
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '6');
    const featured = searchParams.get('featured') === 'true';
    const category = searchParams.get('category');

    const supabase = await createClient();

    // Build query
    let query = supabase
      .from('testimonial_cases')
      .select('*, evidence_photos:testimonial_evidence_photos(*)')
      .eq('published', true)
      .eq('consent_given', true)
      .order('display_order', { ascending: true })
      .limit(limit);

    if (featured) {
      query = query.eq('featured', true);
    }

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Filter evidence photos to only include blurred ones
    const casesWithEvidence = data?.map((testimonialCase) => ({
      ...testimonialCase,
      evidence_photos: (testimonialCase.evidence_photos || [])
        .filter((photo: any) => photo.blur_applied)
        .sort((a: any, b: any) => a.display_order - b.display_order),
    }));

    return NextResponse.json({ data: casesWithEvidence });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
