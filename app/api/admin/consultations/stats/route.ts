import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/auth';
import { getConsultationStats } from '@/lib/supabase/consultations';

/**
 * GET /api/admin/consultations/stats
 * Get consultation statistics
 */
export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const stats = await getConsultationStats();

    // Return stats directly to match frontend interface
    return NextResponse.json(stats);
  } catch (error: any) {
    console.error('Error fetching consultation stats:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch consultation stats' },
      { status: 500 }
    );
  }
}
