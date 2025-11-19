import { createClient } from './server';
import type { EvidencePhoto, TestimonialCase, CaseWithEvidenceResponse } from '@/types/testimonial';

/**
 * Get evidence photos for a specific case (server-side, published only)
 */
export async function getEvidencePhotos(caseId: string): Promise<{
  data: EvidencePhoto[] | null;
  error: Error | null;
}> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('testimonial_evidence_photos')
      .select('*')
      .eq('case_id', caseId)
      .eq('blur_applied', true)
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
 * Get all evidence photos for a case (admin, all status)
 */
export async function getAllEvidencePhotos(caseId: string): Promise<{
  data: EvidencePhoto[] | null;
  error: Error | null;
}> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('testimonial_evidence_photos')
      .select('*')
      .eq('case_id', caseId)
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
 * Count evidence photos for a case
 */
export async function countEvidencePhotos(caseId: string): Promise<{
  count: number;
  error: Error | null;
}> {
  try {
    const supabase = await createClient();

    const { count, error } = await supabase
      .from('testimonial_evidence_photos')
      .select('*', { count: 'exact', head: true })
      .eq('case_id', caseId)
      .eq('blur_applied', true);

    if (error) {
      return { count: 0, error };
    }

    return { count: count || 0, error: null };
  } catch (error) {
    return {
      count: 0,
      error: error instanceof Error ? error : new Error('Unknown error'),
    };
  }
}

/**
 * Get evidence photo statistics by type
 */
export async function getEvidenceStatsByType(): Promise<{
  data: Array<{
    photo_type: string;
    total_count: number;
    verified_count: number;
  }> | null;
  error: Error | null;
}> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase.rpc('get_evidence_stats_by_type');

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
 * Delete evidence photo from storage and database
 */
export async function deleteEvidencePhoto(photoId: string): Promise<{
  success: boolean;
  error: Error | null;
}> {
  try {
    const supabase = await createClient();

    // 1. Get photo URL from database
    const { data: photo, error: fetchError } = await supabase
      .from('testimonial_evidence_photos')
      .select('photo_url')
      .eq('id', photoId)
      .single();

    if (fetchError) {
      return { success: false, error: fetchError };
    }

    if (!photo) {
      return { success: false, error: new Error('Photo not found') };
    }

    // 2. Delete from storage
    const filePath = photo.photo_url.split('testimonial-photos/')[1];
    if (filePath) {
      const { error: storageError } = await supabase.storage
        .from('testimonial-photos')
        .remove([filePath]);

      if (storageError) {
        console.error('Storage delete error:', storageError);
        // Continue even if storage deletion fails
      }
    }

    // 3. Delete from database
    const { error: deleteError } = await supabase
      .from('testimonial_evidence_photos')
      .delete()
      .eq('id', photoId);

    if (deleteError) {
      return { success: false, error: deleteError };
    }

    return { success: true, error: null };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error : new Error('Unknown error'),
    };
  }
}
