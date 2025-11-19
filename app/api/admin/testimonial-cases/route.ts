import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getSession } from '@/lib/auth/auth';
import { getAllCases, createCase } from '@/lib/supabase/testimonial-cases';
import type { CaseCreateRequest } from '@/types/testimonial';

/**
 * GET /api/admin/testimonial-cases
 * Get all testimonial cases (admin)
 */
export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data, error } = await getAllCases();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * POST /api/admin/testimonial-cases
 * Create a new testimonial case
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const caseData: CaseCreateRequest = {
      category: body.category,
      highlight_text: body.highlight_text,
      case_result_amount: body.case_result_amount,
      client_initial: body.client_initial,
      client_role: body.client_role,
      client_age_group: body.client_age_group,
      full_story: body.full_story,
      story_before: body.story_before,
      story_journey: body.story_journey,
      story_after: body.story_after,
      case_date: body.case_date,
      case_duration: body.case_duration,
      attorney_name: body.attorney_name,
      attorney_id: body.attorney_id,
      consent_given: body.consent_given || false,
      featured: body.featured || false,
      published: body.published || false,
    };

    // Validation
    if (!caseData.category) {
      return NextResponse.json({ error: 'Category is required' }, { status: 400 });
    }

    if (!caseData.highlight_text) {
      return NextResponse.json({ error: 'Highlight text is required' }, { status: 400 });
    }

    if (!caseData.client_initial) {
      return NextResponse.json({ error: 'Client initial is required' }, { status: 400 });
    }

    if (!caseData.case_date) {
      return NextResponse.json({ error: 'Case date is required' }, { status: 400 });
    }

    const { data, error } = await createCase(caseData, session.id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
