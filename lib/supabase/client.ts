import { createBrowserClient } from '@supabase/ssr';
import { Database } from '@/types/database';

/**
 * 클라이언트 컴포넌트용 Supabase 클라이언트
 * 브라우저에서 실행되는 코드에서 사용
 */
export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
