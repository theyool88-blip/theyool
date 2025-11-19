import { createClient } from './server';
import type {
  TestimonialCase,
  CaseCategory,
  CaseWithEvidenceResponse,
  CaseCreateRequest,
  CaseUpdateRequest,
} from '@/types/testimonial';

/**
 * Get all published testimonial cases (public)
 */
export async function getPublishedCases(): Promise<{
  data: TestimonialCase[] | null;
  error: Error | null;
}> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('testimonial_cases')
      .select('*')
      .eq('published', true)
      .eq('consent_given', true)
      .order('display_order', { ascending: true });

    if (error) {
      return { data: null, error };
    }

    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error : new Error('Unknown error'),
    };
  }
}

/**
 * Get featured testimonial cases (public)
 */
export async function getFeaturedCases(limit: number = 6): Promise<{
  data: TestimonialCase[] | null;
  error: Error | null;
}> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('testimonial_cases')
      .select('*')
      .eq('published', true)
      .eq('consent_given', true)
      .eq('featured', true)
      .order('display_order', { ascending: true })
      .limit(limit);

    if (error) {
      return { data: null, error };
    }

    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error : new Error('Unknown error'),
    };
  }
}

/**
 * Get published cases by category (public)
 */
export async function getCasesByCategory(category: CaseCategory): Promise<{
  data: TestimonialCase[] | null;
  error: Error | null;
}> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('testimonial_cases')
      .select('*')
      .eq('category', category)
      .eq('published', true)
      .eq('consent_given', true)
      .order('display_order', { ascending: true });

    if (error) {
      return { data: null, error };
    }

    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error : new Error('Unknown error'),
    };
  }
}

/**
 * Get a single case with its evidence photos (public)
 */
export async function getCaseWithEvidence(
  caseId: string
): Promise<{
  data: CaseWithEvidenceResponse | null;
  error: Error | null;
}> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase.rpc('get_case_with_evidence', {
      case_uuid: caseId,
    });

    if (error) {
      return { data: null, error };
    }

    if (!data || data.length === 0) {
      return { data: null, error: new Error('Case not found') };
    }

    const result = data[0];
    return {
      data: {
        case: result.case_data,
        evidence_photos: result.evidence_photos,
      },
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error : new Error('Unknown error'),
    };
  }
}

/**
 * Get all cases (admin)
 */
export async function getAllCases(): Promise<{
  data: TestimonialCase[] | null;
  error: Error | null;
}> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('testimonial_cases')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return { data: null, error };
    }

    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error : new Error('Unknown error'),
    };
  }
}

/**
 * Get a single case by ID (admin)
 */
export async function getCaseById(caseId: string): Promise<{
  data: TestimonialCase | null;
  error: Error | null;
}> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('testimonial_cases')
      .select('*')
      .eq('id', caseId)
      .single();

    if (error) {
      return { data: null, error };
    }

    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error : new Error('Unknown error'),
    };
  }
}

/**
 * Create a new case (admin)
 */
export async function createCase(
  caseData: CaseCreateRequest,
  userId: string
): Promise<{
  data: TestimonialCase | null;
  error: Error | null;
}> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('testimonial_cases')
      .insert({
        ...caseData,
        created_by: userId,
        updated_by: userId,
      })
      .select()
      .single();

    if (error) {
      return { data: null, error };
    }

    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error : new Error('Unknown error'),
    };
  }
}

/**
 * Update a case (admin)
 */
export async function updateCase(
  caseId: string,
  updates: Partial<CaseUpdateRequest>,
  userId: string
): Promise<{
  data: TestimonialCase | null;
  error: Error | null;
}> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('testimonial_cases')
      .update({
        ...updates,
        updated_by: userId,
      })
      .eq('id', caseId)
      .select()
      .single();

    if (error) {
      return { data: null, error };
    }

    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error : new Error('Unknown error'),
    };
  }
}

/**
 * Delete a case (admin)
 * Evidence photos will be automatically deleted via CASCADE
 */
export async function deleteCase(caseId: string): Promise<{
  success: boolean;
  error: Error | null;
}> {
  try {
    const supabase = await createClient();

    const { error } = await supabase
      .from('testimonial_cases')
      .delete()
      .eq('id', caseId);

    if (error) {
      return { success: false, error };
    }

    return { success: true, error: null };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error : new Error('Unknown error'),
    };
  }
}

/**
 * Get statistics by category
 */
export async function getStatsByCategory(): Promise<{
  data: Array<{
    category: string;
    total_count: number;
    total_amount: number;
    evidence_count: number;
  }> | null;
  error: Error | null;
}> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase.rpc('get_testimonial_stats_by_category');

    if (error) {
      return { data: null, error };
    }

    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error : new Error('Unknown error'),
    };
  }
}
