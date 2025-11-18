#!/usr/bin/env node

/**
 * Instagram 배포 환경 진단 스크립트
 *
 * 사용법:
 *   node scripts/check-instagram-deployment.js [DEPLOYMENT_URL]
 *
 * 예시:
 *   node scripts/check-instagram-deployment.js https://theyool.vercel.app
 *   node scripts/check-instagram-deployment.js http://localhost:3000
 */

const deploymentUrl = process.argv[2] || 'http://localhost:3000';

console.log('╔═══════════════════════════════════════════════════════════╗');
console.log('║   Instagram 배포 환경 진단 도구                           ║');
console.log('╚═══════════════════════════════════════════════════════════╝\n');

console.log(`🔍 검사 대상: ${deploymentUrl}\n`);

async function checkEnvironment() {
  const results = {
    passed: [],
    failed: [],
    warnings: []
  };

  // 1. 환경 변수 확인
  console.log('1️⃣  로컬 환경 변수 확인...');
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (supabaseUrl && supabaseUrl !== 'https://placeholder.supabase.co') {
    results.passed.push('✅ NEXT_PUBLIC_SUPABASE_URL 설정됨');
  } else {
    results.failed.push('❌ NEXT_PUBLIC_SUPABASE_URL 누락');
  }

  if (anonKey && anonKey !== 'placeholder-key') {
    results.passed.push('✅ NEXT_PUBLIC_SUPABASE_ANON_KEY 설정됨');
  } else {
    results.failed.push('❌ NEXT_PUBLIC_SUPABASE_ANON_KEY 누락');
  }

  if (serviceRoleKey && serviceRoleKey !== 'placeholder-key') {
    results.passed.push('✅ SUPABASE_SERVICE_ROLE_KEY 설정됨');
  } else {
    results.failed.push('❌ SUPABASE_SERVICE_ROLE_KEY 누락 (배포 환경에서 필수!)');
  }

  // 2. API 엔드포인트 테스트
  console.log('\n2️⃣  API 엔드포인트 테스트...');
  try {
    const apiUrl = `${deploymentUrl}/api/instagram`;
    console.log(`   요청: ${apiUrl}`);

    const response = await fetch(apiUrl, {
      cache: 'no-store',
      headers: {
        'User-Agent': 'Instagram-Deployment-Check/1.0'
      }
    });

    if (!response.ok) {
      results.failed.push(`❌ API 응답 에러 (${response.status} ${response.statusText})`);
    } else {
      results.passed.push('✅ API 응답 성공 (200 OK)');
    }

    const data = await response.json();

    if (data.error) {
      results.failed.push(`❌ API 에러: ${data.error}`);
    }

    if (data.posts && Array.isArray(data.posts)) {
      const count = data.posts.length;
      if (count > 0) {
        results.passed.push(`✅ ${count}개의 게시물 로드 성공`);

        // 샘플 게시물 정보
        const sample = data.posts[0];
        console.log(`\n   📋 샘플 게시물:`);
        console.log(`      - ID: ${sample.id}`);
        console.log(`      - 제목: ${sample.title || '(없음)'}`);
        console.log(`      - 타입: ${sample.type || '(없음)'}`);
        console.log(`      - 이미지 수: ${sample.images?.length || 0}`);
        console.log(`      - 썸네일: ${sample.thumbnail ? '✓' : '✗'}`);
      } else {
        results.warnings.push(`⚠️  게시물이 0개입니다 (published=true인 게시물 확인 필요)`);
      }
    } else {
      results.failed.push('❌ API 응답에 posts 배열 없음');
    }

  } catch (error) {
    results.failed.push(`❌ API 요청 실패: ${error.message}`);
  }

  // 3. Debug 엔드포인트 테스트
  console.log('\n3️⃣  Debug 엔드포인트 테스트...');
  try {
    const debugUrl = `${deploymentUrl}/api/instagram/debug`;
    console.log(`   요청: ${debugUrl}`);

    const response = await fetch(debugUrl, {
      cache: 'no-store'
    });

    if (response.ok) {
      const data = await response.json();
      results.passed.push('✅ Debug API 응답 성공');

      console.log(`\n   📊 데이터베이스 상태:`);
      console.log(`      - 전체 게시물: ${data.count || 0}개`);
      console.log(`      - 제목 없음: ${data.hasEmptyTitles || 0}개`);
      console.log(`      - 캡션 없음: ${data.hasEmptyCaptions || 0}개`);

      if (data.count === 0) {
        results.warnings.push('⚠️  데이터베이스에 게시물이 없습니다');
      }
    } else {
      results.warnings.push(`⚠️  Debug API 응답 에러 (${response.status})`);
    }
  } catch (error) {
    results.warnings.push(`⚠️  Debug API 요청 실패: ${error.message}`);
  }

  // 결과 출력
  console.log('\n╔═══════════════════════════════════════════════════════════╗');
  console.log('║   진단 결과                                               ║');
  console.log('╚═══════════════════════════════════════════════════════════╝\n');

  if (results.passed.length > 0) {
    console.log('✅ 통과한 검사:\n');
    results.passed.forEach(item => console.log(`   ${item}`));
  }

  if (results.warnings.length > 0) {
    console.log('\n⚠️  경고:\n');
    results.warnings.forEach(item => console.log(`   ${item}`));
  }

  if (results.failed.length > 0) {
    console.log('\n❌ 실패한 검사:\n');
    results.failed.forEach(item => console.log(`   ${item}`));
  }

  const totalChecks = results.passed.length + results.failed.length + results.warnings.length;
  const passRate = Math.round((results.passed.length / totalChecks) * 100);

  console.log(`\n${'='.repeat(60)}`);
  console.log(`총 ${totalChecks}개 검사 중 ${results.passed.length}개 통과 (${passRate}%)`);
  console.log('='.repeat(60));

  if (results.failed.length === 0 && results.warnings.length === 0) {
    console.log('\n🎉 모든 검사 통과! Instagram 페이지가 정상 작동합니다.');
  } else if (results.failed.length > 0) {
    console.log('\n🔧 문제 발견: INSTAGRAM_DEPLOYMENT_FIX.md 문서를 참조하세요.');
    process.exit(1);
  } else {
    console.log('\n⚠️  경고가 있습니다. 확인이 필요합니다.');
  }

  console.log('\n💡 자세한 해결 방법: INSTAGRAM_DEPLOYMENT_FIX.md\n');
}

checkEnvironment().catch(error => {
  console.error('\n❌ 진단 스크립트 실행 오류:', error);
  process.exit(1);
});
