import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { Database } from '@/types/database';

/**
 * 서버 컴포넌트 및 API Routes용 Supabase 클라이언트
 * 가능한 경우 service role 키를 사용하여 RLS 영향을 받지 않도록 처리
 */
export async function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl) {
    throw new Error('Supabase URL이 설정되지 않았습니다. .env.local을 확인해주세요.');
  }

  if (!serviceRoleKey && !anonKey) {
    throw new Error('Supabase 키가 설정되지 않았습니다. .env.local을 확인해주세요.');
  }

  const cookieStore = await cookies();

  return createServerClient<Database>(
    supabaseUrl,
    serviceRoleKey ?? anonKey!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Server Component에서 호출되면 예외가 발생할 수 있지만 안전하게 무시
          }
        },
      },
    }
  );
}
