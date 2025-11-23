# 이메일/SMS 알림 시스템 가이드

**작성일**: 2025-11-20
**시스템**: 법무법인 더율 예약 알림 시스템

---

## 📌 개요

예약 시스템에 통합된 자동 이메일/SMS 알림 시스템입니다.

### 주요 기능

1. **예약 접수 알림** - 고객이 예약 신청 시 즉시 발송
2. **예약 확정 알림** - 관리자가 예약 확정 시 발송
3. **예약 취소 알림** - 예약 취소 시 발송
4. **리마인더 알림** - 상담 하루 전 자동 발송 (오후 7시)

---

## 🏗️ 시스템 구조

```
lib/email/
├── config.ts           # 이메일 설정 및 Resend 클라이언트
├── templates.ts        # HTML 이메일 템플릿 (4종)
└── notifications.ts    # 알림 발송 로직

app/api/
├── bookings/route.ts                    # 예약 생성 시 알림
├── admin/bookings/[id]/route.ts         # 예약 확정/취소 시 알림
└── cron/
    ├── auto-confirm-bookings/route.ts   # 자동 확정 (매일 오전 9시)
    └── send-reminders/route.ts          # 리마인더 발송 (매일 오후 7시)

vercel.json             # Vercel Cron Job 설정
```

---

## 🔧 설정 방법

### 1. Resend API 키 발급

1. [Resend](https://resend.com)에 가입
2. API Keys 메뉴에서 새 API 키 생성
3. `.env.local`에 추가:

```bash
RESEND_API_KEY=re_xxxxxxxxxxxxx
EMAIL_FROM=info@theyool.com
EMAIL_REPLY_TO=info@theyool.com
```

### 2. 도메인 인증 (선택사항)

Resend에서 커스텀 도메인 사용을 위해:

1. Resend 대시보드 → Domains 메뉴
2. 도메인 추가 (예: theyool.com)
3. DNS 레코드 추가 (MX, TXT, CNAME)
4. 인증 완료 후 `EMAIL_FROM` 업데이트

```bash
EMAIL_FROM=no-reply@theyool.com
```

### 3. SMS 설정 (선택사항)

현재 SMS는 로그만 출력하도록 구현되어 있습니다.
실제 SMS 발송을 원하시면 아래 중 선택:

#### Option A: Twilio

```bash
SMS_PROVIDER=twilio
TWILIO_ACCOUNT_SID=ACxxxxx
TWILIO_AUTH_TOKEN=xxxxx
TWILIO_PHONE_NUMBER=+821012345678
```

#### Option B: AWS SNS

```bash
SMS_PROVIDER=aws-sns
AWS_REGION=ap-northeast-2
AWS_ACCESS_KEY_ID=xxxxx
AWS_SECRET_ACCESS_KEY=xxxxx
```

#### Option C: KakaoTalk 알림톡

```bash
SMS_PROVIDER=kakao
KAKAO_REST_API_KEY=xxxxx
```

**Note**: SMS 구현은 `lib/email/notifications.ts`의 `sendSMS()` 함수에서 추가 작업 필요

---

## 📧 이메일 템플릿

### 1. 예약 접수 확인 (`bookingCreatedEmail`)

**발송 시점**: 고객이 예약 신청 즉시
**제목**: `[법무법인 더율] 상담 예약이 접수되었습니다`

**내용**:
- 예약 대기 상태 안내
- 예약 정보 (날짜, 시간, 상담 방식)
- 24시간 이내 확정 안내

### 2. 예약 확정 (`bookingConfirmedEmail`)

**발송 시점**: 관리자가 예약 확정 시
**제목**: `[법무법인 더율] 상담 예약이 확정되었습니다`

**내용**:
- 확정된 예약 정보
- 화상 상담 링크 (화상인 경우)
- 방문 준비사항 (방문인 경우)
- 오시는 길 정보

### 3. 예약 취소 (`bookingCancelledEmail`)

**발송 시점**: 예약 취소 시
**제목**: `[법무법인 더율] 상담 예약이 취소되었습니다`

**내용**:
- 취소된 예약 정보
- 재예약 안내
- 다시 예약하기 버튼

### 4. 리마인더 (`reminderEmail`)

**발송 시점**: 상담 하루 전 오후 7시 (자동)
**제목**: `[법무법인 더율] 내일 상담 예약이 있습니다`

**내용**:
- 내일 예정된 상담 안내
- 예약 정보 확인
- 준비사항 안내
- 변경/취소 연락처

---

## 🤖 자동화 시스템

### Cron Job 스케줄 (`vercel.json`)

```json
{
  "crons": [
    {
      "path": "/api/cron/auto-confirm-bookings",
      "schedule": "0 9 * * *"
    },
    {
      "path": "/api/cron/send-reminders",
      "schedule": "0 19 * * *"
    }
  ]
}
```

### 1. 자동 예약 확정

**스케줄**: 매일 오전 9시 (KST)
**경로**: `/api/cron/auto-confirm-bookings`

**동작**:
1. 24시간 이상 대기 중인 `pending` 예약 조회
2. 시간 충돌 검사
3. 충돌 없으면 자동 확정 → 확정 알림 발송
4. 충돌 있으면 건너뜀

### 2. 리마인더 발송

**스케줄**: 매일 오후 7시 (KST)
**경로**: `/api/cron/send-reminders`

**동작**:
1. 내일 예정된 `confirmed` 예약 조회
2. 각 예약에 대해 리마인더 이메일/SMS 발송
3. 발송 결과 로깅

---

## 🧪 테스트 방법

### 1. 이메일 발송 테스트

개발 서버를 실행한 후:

```bash
# 개발 서버 시작
npm run dev

# 예약 생성 (자동으로 이메일 발송)
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "type": "video",
    "name": "테스트",
    "phone": "010-1234-5678",
    "email": "test@example.com",
    "preferred_date": "2025-11-25",
    "preferred_time": "14:00",
    "category": "위자료 청구"
  }'
```

### 2. 자동 확정 Cron 테스트

```bash
# Cron Job 수동 실행
curl http://localhost:3000/api/cron/auto-confirm-bookings \
  -H "Authorization: Bearer theyool-cron-secret-key-2025"
```

### 3. 리마인더 Cron 테스트

```bash
# 내일 예정된 예약이 있어야 함
curl http://localhost:3000/api/cron/send-reminders \
  -H "Authorization: Bearer theyool-cron-secret-key-2025"
```

---

## 📊 모니터링

### 로그 확인

모든 알림 발송은 콘솔에 로그됩니다:

```
✅ Notification sent: { emailSent: true, smsSent: false }
[SMS] Not configured - would send: { phone: '010-1234-5678', message: '...' }
```

### Vercel Cron Logs

Vercel 대시보드에서:
1. Project → Settings → Cron Jobs
2. 각 Cron Job의 실행 로그 확인

### Resend Dashboard

Resend 대시보드에서:
1. Emails 메뉴 → 발송 이력 확인
2. Delivery status, Open rate 등 확인

---

## 🔒 보안

### 1. Cron Job 인증

모든 Cron endpoint는 `CRON_SECRET`으로 보호됩니다:

```typescript
const authHeader = request.headers.get('authorization');
const cronSecret = process.env.CRON_SECRET;

if (authHeader !== `Bearer ${cronSecret}`) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
```

### 2. 환경 변수 보호

`.env.local`은 절대 Git에 커밋하지 마세요:
- `.gitignore`에 포함 확인
- Vercel 환경 변수에서 프로덕션 키 관리

---

## 🚀 프로덕션 배포

### 1. Vercel 환경 변수 설정

Vercel 대시보드 → Project Settings → Environment Variables:

```
RESEND_API_KEY=re_xxxxx
EMAIL_FROM=info@theyool.com
EMAIL_REPLY_TO=info@theyool.com
CRON_SECRET=your-secret-key
```

### 2. Cron Job 활성화

`vercel.json`이 있으면 Vercel이 자동으로 Cron Job을 설정합니다.
배포 후 확인:

1. Vercel Dashboard → Cron Jobs 메뉴
2. 등록된 Cron Job 2개 확인
3. 수동 실행으로 테스트

### 3. 도메인 이메일 설정

프로덕션에서는 커스텀 도메인 이메일 사용 권장:
- Resend에서 도메인 인증
- DNS 레코드 추가
- `EMAIL_FROM` 업데이트

---

## 🛠️ 커스터마이징

### 이메일 템플릿 수정

`lib/email/templates.ts`에서 HTML 템플릿 수정:

```typescript
// 색상 변경
.header {
  background: linear-gradient(135deg, #YOUR_COLOR 0%, #YOUR_COLOR 100%);
}

// 문구 수정
<p>${booking.name}님, 안녕하세요.</p>

// 추가 정보 표시
${booking.customField ? `
  <div class="info-row">
    <span class="label">Custom:</span>
    <span class="value">${booking.customField}</span>
  </div>
` : ''}
```

### SMS 문구 수정

`lib/email/notifications.ts`에서 SMS 메시지 수정:

```typescript
await sendSMS(
  booking.phone,
  `[법무법인 더율] 상담 예약이 확정되었습니다.\n\n날짜: ${booking.preferred_date}\n...`
);
```

### 알림 타이밍 변경

`vercel.json`에서 Cron 스케줄 수정:

```json
{
  "schedule": "0 18 * * *"  // 오후 6시로 변경
}
```

---

## ❓ FAQ

### Q1. 이메일이 발송되지 않아요

**확인사항**:
1. `RESEND_API_KEY` 환경 변수 설정 확인
2. Resend 대시보드에서 API 키 유효성 확인
3. 콘솔 로그에서 에러 메시지 확인
4. Resend 대시보드 → Emails에서 발송 이력 확인

### Q2. SMS를 실제로 발송하려면?

**단계**:
1. SMS 제공자 선택 (Twilio, AWS SNS, KakaoTalk)
2. API 키 발급
3. `.env.local`에 설정 추가
4. `lib/email/notifications.ts`의 `sendSMS()` 함수 구현

**Twilio 예시**:
```typescript
async function sendTwilioSMS(phone: string, message: string) {
  const twilio = require('twilio');
  const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );

  await client.messages.create({
    body: message,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: phone,
  });
}
```

### Q3. Cron Job이 실행되지 않아요

**로컬 환경**:
- Cron Job은 Vercel 프로덕션에서만 작동
- 로컬 테스트는 수동 API 호출로 진행

**프로덕션 환경**:
1. `vercel.json` 파일 확인
2. Vercel 대시보드 → Cron Jobs 메뉴 확인
3. Environment Variables 설정 확인

### Q4. 이메일 템플릿을 미리 보려면?

**방법 1**: 테스트 예약 생성
**방법 2**: HTML 파일로 저장해서 브라우저로 열기

```bash
# 템플릿 추출 스크립트 작성
node -e "
const { bookingCreatedEmail } = require('./lib/email/templates');
const fs = require('fs');

const testBooking = {
  name: '테스트',
  preferred_date: '2025-11-25',
  preferred_time: '14:00',
  type: 'video',
  category: '위자료 청구',
};

fs.writeFileSync('email-preview.html', bookingCreatedEmail(testBooking));
console.log('Preview saved to email-preview.html');
"
```

---

## 📝 체크리스트

배포 전 확인사항:

- [ ] Resend API 키 발급 완료
- [ ] `.env.local`에 `RESEND_API_KEY` 설정
- [ ] Vercel 환경 변수 설정 완료
- [ ] 이메일 템플릿 테스트 완료
- [ ] Cron Job 수동 실행 테스트 완료
- [ ] 도메인 이메일 인증 완료 (선택)
- [ ] SMS 제공자 설정 완료 (선택)

---

## 📞 문의

기술 지원이 필요하시면:
- 개발팀 이메일: dev@theyool.com
- Resend 문서: https://resend.com/docs
- Vercel Cron 문서: https://vercel.com/docs/cron-jobs

---

**작성일**: 2025-11-20
**버전**: 1.0.0
**최종 업데이트**: 2025-11-20
