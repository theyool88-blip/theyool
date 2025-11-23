// @ts-nocheck - blocked_times table types not in database.ts
import { createClient } from '@/lib/supabase/server';
import type { BlockedTime, CreateBlockedTimeInput } from '@/types/blocked-time';

/**
 * Get all blocked times
 */
export async function getBlockedTimes(): Promise<BlockedTime[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('blocked_times')
    .select('*')
    .order('blocked_date', { ascending: true });

  if (error) {
    console.error('Error fetching blocked times:', error);
    throw new Error('Failed to fetch blocked times');
  }

  return data || [];
}

/**
 * Get blocked times for a specific date
 */
export async function getBlockedTimesForDate(date: string, officeLocation?: string): Promise<BlockedTime[]> {
  const supabase = await createClient();

  let query = supabase
    .from('blocked_times')
    .select('*')
    .eq('blocked_date', date);

  // Filter by office location if specified, or include null (applies to all)
  if (officeLocation) {
    query = query.or(`office_location.eq.${officeLocation},office_location.is.null`);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching blocked times for date:', error);
    throw new Error('Failed to fetch blocked times for date');
  }

  return data || [];
}

/**
 * Check if a specific date is fully blocked
 */
export async function isDateBlocked(date: string, officeLocation?: string): Promise<boolean> {
  const supabase = await createClient();

  let query = supabase
    .from('blocked_times')
    .select('id')
    .eq('blocked_date', date)
    .eq('block_type', 'date');

  if (officeLocation) {
    query = query.or(`office_location.eq.${officeLocation},office_location.is.null`);
  }

  const { data, error } = await query.limit(1).single();

  return !error && !!data;
}

/**
 * Check if a specific time slot is blocked
 */
export async function isTimeSlotBlocked(
  date: string,
  time: string,
  officeLocation?: string
): Promise<boolean> {
  // First check if entire date is blocked
  const dateBlocked = await isDateBlocked(date, officeLocation);
  if (dateBlocked) return true;

  // Then check for specific time slot blocks
  const supabase = await createClient();

  let query = supabase
    .from('blocked_times')
    .select('*')
    .eq('blocked_date', date)
    .eq('block_type', 'time_slot');

  if (officeLocation) {
    query = query.or(`office_location.eq.${officeLocation},office_location.is.null`);
  }

  const { data, error } = await query;

  if (error || !data) return false;

  // Check if the time falls within any blocked time range
  return data.some((block) => {
    if (!block.blocked_time_start || !block.blocked_time_end) return false;
    return time >= block.blocked_time_start && time < block.blocked_time_end;
  });
}

/**
 * Create a new blocked time
 */
export async function createBlockedTime(input: CreateBlockedTimeInput): Promise<BlockedTime> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('blocked_times')
    .insert(input)
    .select()
    .single();

  if (error) {
    console.error('Error creating blocked time:', error);
    throw new Error('Failed to create blocked time');
  }

  return data;
}

/**
 * Delete a blocked time
 */
export async function deleteBlockedTime(id: string): Promise<void> {
  const supabase = await createClient();

  const { error } = await supabase
    .from('blocked_times')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting blocked time:', error);
    throw new Error('Failed to delete blocked time');
  }
}

/**
 * Update a blocked time (only reason can be updated)
 */
export async function updateBlockedTime(id: string, reason: string): Promise<BlockedTime> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('blocked_times')
    .update({ reason })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating blocked time:', error);
    throw new Error('Failed to update blocked time');
  }

  return data;
}
