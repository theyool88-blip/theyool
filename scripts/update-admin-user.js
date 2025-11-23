// 기존 관리자 계정 업데이트 스크립트
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

async function updateAdminUser() {
  console.log('================================================================================');
  console.log('관리자 계정 업데이트');
  console.log('================================================================================\n');

  const email = 'admin@theyool.com';
  const name = '시스템 관리자';

  try {
    // 1. 기존 Auth 사용자 찾기
    console.log('[1/4] 기존 Auth 사용자 찾기...');
    const { data: usersData, error: listError } = await supabase.auth.admin.listUsers();
    if (listError) throw listError;

    const existingUser = usersData.users.find(u => u.email === email);
    if (!existingUser) {
      console.log('  ❌ 사용자를 찾을 수 없습니다.');
      console.log('  새로운 계정을 생성하려면 create-admin-user.js를 사용하세요.');
      process.exit(1);
    }

    console.log(`  ✓ 사용자 발견: ${existingUser.id}`);
    const userId = existingUser.id;

    // 2. 비밀번호 업데이트 (선택적)
    console.log('\n[2/4] 비밀번호 업데이트 중...');
    const newPassword = 'ejdbf007@@';
    const { error: passwordError } = await supabase.auth.admin.updateUserById(
      userId,
      { password: newPassword }
    );

    if (passwordError) {
      console.log(`  ⚠️  비밀번호 업데이트 실패: ${passwordError.message}`);
    } else {
      console.log('  ✓ 비밀번호 업데이트 완료');
    }

    // 3. users_profiles 테이블 확인 및 생성/업데이트
    console.log('\n[3/4] users_profiles 프로필 확인 중...');

    const { data: existingProfile } = await supabase
      .from('users_profiles')
      .select('*')
      .eq('auth_user_id', userId)
      .single();

    if (existingProfile) {
      console.log('  ℹ️  기존 프로필 발견. 업데이트합니다.');

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
      console.log('  ℹ️  프로필이 없습니다. 새로 생성합니다.');

      const { error: insertError } = await supabase
        .from('users_profiles')
        .insert({
          auth_user_id: userId,
          name: name,
          email: email,
          role: 'admin',
          is_active: true
        });

      if (insertError) throw insertError;
      console.log('  ✓ 프로필 생성 완료');
    }

    // 4. 최종 확인
    console.log('\n[4/4] 최종 정보 확인 중...');
    const { data: finalProfile, error: finalError } = await supabase
      .from('users_profiles')
      .select('*')
      .eq('auth_user_id', userId)
      .single();

    if (finalError) throw finalError;

    console.log('\n================================================================================');
    console.log('✅ 관리자 계정 설정 완료!');
    console.log('================================================================================\n');

    console.log('📋 계정 정보:');
    console.log(`  이메일: ${email}`);
    console.log(`  비밀번호: ${newPassword}`);
    console.log(`  이름: ${finalProfile.name}`);
    console.log(`  역할: ${finalProfile.role}`);
    console.log(`  활성 상태: ${finalProfile.is_active ? '✓ 활성' : '✗ 비활성'}`);
    console.log(`  Auth User ID: ${userId}`);
    console.log(`  Profile ID: ${finalProfile.id}`);

    console.log('\n🔐 다음 단계:');
    console.log('  1. theyool-admin 프로젝트 생성');
    console.log('  2. 로그인 페이지 구현');
    console.log('  3. 위 계정 정보로 로그인 테스트');

    console.log('\n');

  } catch (error) {
    console.error('\n❌ 오류 발생:', error.message);
    if (error.details) console.error('상세:', error.details);
    if (error.hint) console.error('힌트:', error.hint);
    process.exit(1);
  }
}

updateAdminUser();
