export type BlockType = 'date' | 'time_slot';
export type OfficeLocation = '천안' | '평택' | null;

export interface BlockedTime {
  id: string;
  block_type: BlockType;
  blocked_date: string | null;  // ISO date string
  blocked_time_start: string | null;  // HH:MM format
  blocked_time_end: string | null;    // HH:MM format
  office_location: OfficeLocation;
  reason: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateBlockedTimeInput {
  block_type: BlockType;
  blocked_date?: string;
  blocked_time_start?: string;
  blocked_time_end?: string;
  office_location?: OfficeLocation;
  reason?: string;
  created_by?: string;
}

export interface UpdateBlockedTimeInput {
  reason?: string;
}
