// 관리자 사용자 생성 스크립트
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ 환경 변수가 설정되지 않았습니다.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function createAdminUser() {
  console.log('================================================================================');
  console.log('관리자 계정 생성');
  console.log('================================================================================\n');

  const email = 'admin@theyool.com';
  const password = 'ejdbf007@@';
  const name = '시스템 관리자';

  try {
    // 1. Supabase Auth에 사용자 생성
    console.log('[1/3] Supabase Auth 사용자 생성 중...');
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: email,
      password: password,
      email_confirm: true, // 이메일 확인 자동 처리
      user_metadata: {
        name: name,
        role: 'admin'
      }
    });

    if (authError) {
      if (authError.message.includes('already registered')) {
        console.log('  ℹ️  사용자가 이미 존재합니다. 기존 사용자 정보를 가져옵니다.');

        // 기존 사용자 조회
        const { data: existingUsers, error: listError } = await supabase.auth.admin.listUsers();
        if (listError) throw listError;

        const existingUser = existingUsers.users.find(u => u.email === email);
        if (!existingUser) throw new Error('사용자를 찾을 수 없습니다.');

        authData.user = existingUser;
        console.log(`  ✓ 기존 사용자 ID: ${existingUser.id}`);
      } else {
        throw authError;
      }
    } else {
      console.log(`  ✓ Auth 사용자 생성 완료: ${authData.user.id}`);
    }

    const userId = authData.user.id;

    // 2. users_profiles 테이블에 프로필 생성
    console.log('\n[2/3] users_profiles 테이블에 프로필 생성 중...');

    // 기존 프로필 확인
    const { data: existingProfile, error: checkError } = await supabase
      .from('users_profiles')
      .select('*')
      .eq('auth_user_id', userId)
      .single();

    if (existingProfile) {
      console.log('  ℹ️  프로필이 이미 존재합니다. 업데이트합니다.');

      const { error: updateError } = await supabase
        .from('users_profiles')
        .update({
          name: name,
          email: email,
          role: 'admin',
          is_active: true
        })
        .eq('auth_user_id', userId);

      if (updateError) throw updateError;
      console.log('  ✓ 프로필 업데이트 완료');
    } else {
      const { data: profileData, error: profileError } = await supabase
        .from('users_profiles')
        .insert({
          auth_user_id: userId,
          name: name,
          email: email,
          role: 'admin',
          is_active: true
        })
        .select()
        .single();

      if (profileError) throw profileError;
      console.log(`  ✓ 프로필 생성 완료: ${profileData.id}`);
    }

    // 3. 최종 확인
    console.log('\n[3/3] 생성된 관리자 정보 확인 중...');
    const { data: finalProfile, error: finalError } = await supabase
      .from('users_profiles')
      .select('*')
      .eq('auth_user_id', userId)
      .single();

    if (finalError) throw finalError;

    console.log('\n================================================================================');
    console.log('✅ 관리자 계정 생성 완료!');
    console.log('================================================================================\n');

    console.log('📋 계정 정보:');
    console.log(`  이메일: ${email}`);
    console.log(`  비밀번호: ${password}`);
    console.log(`  이름: ${name}`);
    console.log(`  역할: ${finalProfile.role}`);
    console.log(`  활성 상태: ${finalProfile.is_active ? '활성' : '비활성'}`);
    console.log(`  Auth User ID: ${userId}`);
    console.log(`  Profile ID: ${finalProfile.id}`);

    console.log('\n🔐 로그인 URL:');
    console.log('  http://localhost:3000/admin/login (개발 환경)');
    console.log('  또는 배포된 관리자 페이지 URL');

    console.log('\n');

  } catch (error) {
    console.error('\n❌ 오류 발생:', error.message);
    console.error(error);
    process.exit(1);
  }
}

createAdminUser();
