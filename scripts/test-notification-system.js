/**
 * Notification System Comprehensive Test
 *
 * Tests:
 * 1. Email configuration check
 * 2. Notification system structure
 * 3. Template generation
 * 4. API integration
 * 5. Cron jobs configuration
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 알림 시스템 검수 시작\n');
console.log('='.repeat(80) + '\n');

// Test results
const results = {
  passed: 0,
  failed: 0,
  warnings: 0,
  details: [],
};

function pass(test) {
  results.passed++;
  results.details.push({ status: '✅', test });
  console.log(`✅ ${test}`);
}

function fail(test, reason) {
  results.failed++;
  results.details.push({ status: '❌', test, reason });
  console.log(`❌ ${test}`);
  if (reason) console.log(`   → ${reason}`);
}

function warn(test, reason) {
  results.warnings++;
  results.details.push({ status: '⚠️ ', test, reason });
  console.log(`⚠️  ${test}`);
  if (reason) console.log(`   → ${reason}`);
}

// 1. File Structure Check
console.log('📁 1. 파일 구조 검사\n');

const requiredFiles = [
  'lib/email/config.ts',
  'lib/email/templates.ts',
  'lib/email/notifications.ts',
  'app/api/cron/send-reminders/route.ts',
  'vercel.json',
  'NOTIFICATION_SYSTEM_README.md',
  'NOTIFICATION_SYSTEM_SUMMARY.md',
];

requiredFiles.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    pass(`${file} (${stats.size} bytes)`);
  } else {
    fail(`${file}`, '파일이 존재하지 않습니다');
  }
});

console.log('');

// 2. Configuration Check
console.log('⚙️  2. 설정 검사\n');

try {
  const envPath = path.join(process.cwd(), '.env.local');
  const envContent = fs.readFileSync(envPath, 'utf8');

  // Check for required environment variables
  const requiredVars = [
    'CRON_SECRET',
    'EMAIL_FROM',
    'EMAIL_REPLY_TO',
  ];

  const optionalVars = [
    'RESEND_API_KEY',
    'SMS_PROVIDER',
  ];

  requiredVars.forEach(varName => {
    if (envContent.includes(`${varName}=`)) {
      pass(`환경 변수 ${varName} 설정됨`);
    } else {
      fail(`환경 변수 ${varName}`, '설정되지 않음');
    }
  });

  optionalVars.forEach(varName => {
    if (envContent.includes(`${varName}=`) && !envContent.includes(`# ${varName}=`)) {
      pass(`선택 환경 변수 ${varName} 설정됨`);
    } else {
      warn(`선택 환경 변수 ${varName}`, '설정되지 않음 (프로덕션에서 필요)');
    }
  });

} catch (err) {
  fail('.env.local 파일 읽기', err.message);
}

console.log('');

// 3. Template Check
console.log('📧 3. 이메일 템플릿 검사\n');

try {
  const templatesPath = path.join(process.cwd(), 'lib/email/templates.ts');
  const templatesContent = fs.readFileSync(templatesPath, 'utf8');

  const templates = [
    'bookingCreatedEmail',
    'bookingConfirmedEmail',
    'bookingCancelledEmail',
    'reminderEmail',
  ];

  templates.forEach(template => {
    if (templatesContent.includes(`export function ${template}`)) {
      pass(`템플릿 함수 ${template} 정의됨`);
    } else {
      fail(`템플릿 함수 ${template}`, '정의되지 않음');
    }
  });

  // Check for Korean content
  if (templatesContent.includes('법무법인 더율')) {
    pass('한글 콘텐츠 포함됨');
  } else {
    warn('한글 콘텐츠', '브랜딩 확인 필요');
  }

  // Check for HTML structure
  if (templatesContent.includes('<!DOCTYPE html>')) {
    pass('HTML 구조 포함됨');
  } else {
    fail('HTML 구조', 'DOCTYPE 선언 없음');
  }

} catch (err) {
  fail('templates.ts 파일 읽기', err.message);
}

console.log('');

// 4. Notification Service Check
console.log('🔔 4. 알림 서비스 검사\n');

try {
  const notificationsPath = path.join(process.cwd(), 'lib/email/notifications.ts');
  const notificationsContent = fs.readFileSync(notificationsPath, 'utf8');

  const functions = [
    'sendBookingCreatedNotification',
    'sendBookingConfirmedNotification',
    'sendBookingCancelledNotification',
    'sendReminderNotification',
  ];

  functions.forEach(func => {
    if (notificationsContent.includes(`export async function ${func}`)) {
      pass(`알림 함수 ${func} 정의됨`);
    } else {
      fail(`알림 함수 ${func}`, '정의되지 않음');
    }
  });

  // Check for SMS support
  if (notificationsContent.includes('sendSMS')) {
    pass('SMS 발송 함수 포함됨');
  } else {
    warn('SMS 발송 함수', 'SMS 기능 미구현');
  }

  // Check for error handling
  if (notificationsContent.includes('try') && notificationsContent.includes('catch')) {
    pass('에러 핸들링 구현됨');
  } else {
    warn('에러 핸들링', '에러 처리 확인 필요');
  }

} catch (err) {
  fail('notifications.ts 파일 읽기', err.message);
}

console.log('');

// 5. API Integration Check
console.log('🔌 5. API 통합 검사\n');

try {
  // Check booking creation API
  const bookingApiPath = path.join(process.cwd(), 'app/api/bookings/route.ts');
  const bookingApiContent = fs.readFileSync(bookingApiPath, 'utf8');

  if (bookingApiContent.includes('sendBookingCreatedNotification')) {
    pass('예약 생성 API에 알림 통합됨');
  } else {
    fail('예약 생성 API 통합', '알림 함수 호출 없음');
  }

  // Check booking update API
  const updateApiPath = path.join(process.cwd(), 'app/api/admin/bookings/[id]/route.ts');
  const updateApiContent = fs.readFileSync(updateApiPath, 'utf8');

  if (updateApiContent.includes('sendBookingConfirmedNotification')) {
    pass('예약 확정 API에 알림 통합됨');
  } else {
    fail('예약 확정 API 통합', '알림 함수 호출 없음');
  }

  if (updateApiContent.includes('sendBookingCancelledNotification')) {
    pass('예약 취소 API에 알림 통합됨');
  } else {
    fail('예약 취소 API 통합', '알림 함수 호출 없음');
  }

} catch (err) {
  fail('API 파일 읽기', err.message);
}

console.log('');

// 6. Cron Jobs Check
console.log('⏰ 6. Cron Job 검사\n');

try {
  const vercelJsonPath = path.join(process.cwd(), 'vercel.json');
  const vercelJsonContent = fs.readFileSync(vercelJsonPath, 'utf8');
  const vercelConfig = JSON.parse(vercelJsonContent);

  if (vercelConfig.crons && Array.isArray(vercelConfig.crons)) {
    pass(`Cron Job ${vercelConfig.crons.length}개 설정됨`);

    vercelConfig.crons.forEach(cron => {
      if (cron.path === '/api/cron/auto-confirm-bookings') {
        pass(`자동 확정 Cron: ${cron.schedule} (${cron.path})`);
      } else if (cron.path === '/api/cron/send-reminders') {
        pass(`리마인더 Cron: ${cron.schedule} (${cron.path})`);
      } else {
        warn(`알 수 없는 Cron: ${cron.path}`, '확인 필요');
      }
    });
  } else {
    fail('Cron Jobs', 'vercel.json에 crons 설정 없음');
  }

  // Check reminder cron endpoint
  const reminderCronPath = path.join(process.cwd(), 'app/api/cron/send-reminders/route.ts');
  if (fs.existsSync(reminderCronPath)) {
    const reminderCronContent = fs.readFileSync(reminderCronPath, 'utf8');

    if (reminderCronContent.includes('sendReminderNotification')) {
      pass('리마인더 Cron에 알림 함수 통합됨');
    } else {
      fail('리마인더 Cron 통합', '알림 함수 호출 없음');
    }

    if (reminderCronContent.includes('CRON_SECRET')) {
      pass('Cron Job 인증 구현됨');
    } else {
      fail('Cron Job 보안', '인증 코드 없음');
    }
  }

} catch (err) {
  fail('Cron Job 설정 검사', err.message);
}

console.log('');

// 7. Documentation Check
console.log('📚 7. 문서 검사\n');

const docs = [
  { file: 'NOTIFICATION_SYSTEM_README.md', minSize: 10000 },
  { file: 'NOTIFICATION_SYSTEM_SUMMARY.md', minSize: 8000 },
];

docs.forEach(doc => {
  const docPath = path.join(process.cwd(), doc.file);
  try {
    const stats = fs.statSync(docPath);
    if (stats.size >= doc.minSize) {
      pass(`${doc.file} (${Math.round(stats.size / 1024)}KB)`);
    } else {
      warn(`${doc.file}`, `파일 크기가 작음 (${stats.size} bytes < ${doc.minSize} bytes)`);
    }
  } catch (err) {
    fail(`${doc.file}`, '파일 없음');
  }
});

console.log('');

// Final Report
console.log('='.repeat(80));
console.log('\n📊 검수 결과 요약\n');
console.log(`✅ 통과: ${results.passed}개`);
console.log(`❌ 실패: ${results.failed}개`);
console.log(`⚠️  경고: ${results.warnings}개`);
console.log(`📝 총 검사: ${results.passed + results.failed + results.warnings}개\n`);

const successRate = ((results.passed / (results.passed + results.failed)) * 100).toFixed(1);
console.log(`🎯 성공률: ${successRate}%\n`);

if (results.failed === 0) {
  console.log('✨ 모든 필수 검사를 통과했습니다!');
  if (results.warnings > 0) {
    console.log(`⚠️  ${results.warnings}개의 경고가 있습니다. 프로덕션 배포 전 확인하세요.`);
  }
} else {
  console.log(`❌ ${results.failed}개의 필수 검사에 실패했습니다. 수정이 필요합니다.`);
}

console.log('\n' + '='.repeat(80) + '\n');

// Exit with appropriate code
process.exit(results.failed > 0 ? 1 : 0);
