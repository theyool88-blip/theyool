#!/usr/bin/env node

/**
 * 법무법인 더율 사건 데이터 CSV 마이그레이션 스크립트
 * Created: 2025-11-21
 *
 * CSV 파일에서 의뢰인과 사건 데이터를 추출하여 Supabase에 저장
 */

const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

// Supabase 클라이언트 초기화 (Service Role Key 사용)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// CSV 파일 경로
const CSV_PATH = '/Users/hskim/Desktop/Private & Shared/송무_사건목록_DB 60f2df1f3d9a4833b71f4a336511a1d4.csv';

/**
 * CSV 파일을 파싱하여 객체 배열로 반환
 */
function parseCSV(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n').filter(line => line.trim());

  // 헤더 파싱 (BOM 제거)
  const headers = lines[0].replace(/^\uFEFF/, '').split(',').map(h => h.trim());

  console.log('CSV Headers:', headers);
  console.log('Total lines (including header):', lines.length);

  const rows = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);

    if (values.length !== headers.length) {
      console.warn(`Line ${i + 1}: Column count mismatch (expected ${headers.length}, got ${values.length})`);
    }

    const row = {};
    headers.forEach((header, index) => {
      row[header] = values[index] || '';
    });

    rows.push(row);
  }

  return rows;
}

/**
 * CSV 라인 파싱 (쉼표로 구분, 따옴표 내부 쉼표 무시)
 */
function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }

  result.push(current.trim());
  return result;
}

/**
 * 금액 문자열을 숫자로 변환
 * "5,000,000" -> 5000000
 */
function parseAmount(amountStr) {
  if (!amountStr || amountStr.trim() === '') return 0;

  const cleaned = amountStr.replace(/[,\s]/g, '');
  const parsed = parseInt(cleaned, 10);

  return isNaN(parsed) ? 0 : parsed;
}

/**
 * 날짜 문자열을 ISO 형식으로 변환
 * "2024/01/26" -> "2024-01-26"
 */
function parseDate(dateStr) {
  if (!dateStr || dateStr.trim() === '') return null;

  const cleaned = dateStr.trim();

  // YYYY/MM/DD 형식
  if (/^\d{4}\/\d{1,2}\/\d{1,2}$/.test(cleaned)) {
    const [year, month, day] = cleaned.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }

  return null;
}

/**
 * 의뢰인 이름과 Notion ID 추출
 * "최금하 (https://www.notion.so/...)" -> { name: "최금하", notion_id: "..." }
 */
function parseClientInfo(clientStr) {
  if (!clientStr || clientStr.trim() === '') {
    return { name: '', notion_id: null };
  }

  const match = clientStr.match(/^(.+?)\s*\(https:\/\/www\.notion\.so\/([^)]+)\)/);

  if (match) {
    return {
      name: match[1].trim(),
      notion_id: match[2].trim()
    };
  }

  return { name: clientStr.trim(), notion_id: null };
}

/**
 * 전화번호에서 첫 번째 번호만 추출
 * "010-5551-9497, 010-3714-4131(김순환)" -> { phone: "010-5551-9497", phone2: "010-3714-4131(김순환)" }
 */
function parsePhoneNumbers(phoneStr) {
  if (!phoneStr || phoneStr.trim() === '') {
    return { phone: null, phone2: null };
  }

  const cleaned = phoneStr.trim().replace(/["\s]/g, '');
  const numbers = cleaned.split(',');

  return {
    phone: numbers[0] || null,
    phone2: numbers.slice(1).join(', ') || null
  };
}

/**
 * 의뢰인 데이터 추출 및 중복 제거
 */
function extractClients(rows) {
  const clientsMap = new Map();

  rows.forEach(row => {
    const clientInfo = parseClientInfo(row['의뢰인']);
    const phoneInfo = parsePhoneNumbers(row['전화번호']);

    if (!clientInfo.name) return;

    // 이름을 키로 사용 (중복 제거)
    const key = clientInfo.name;

    if (!clientsMap.has(key)) {
      clientsMap.set(key, {
        name: clientInfo.name,
        phone: phoneInfo.phone,
        phone2: phoneInfo.phone2,
        notion_id: clientInfo.notion_id,
        email: null,
        address: null,
        notes: null
      });
    } else {
      // 이미 존재하는 경우, 더 많은 정보를 가진 것으로 업데이트
      const existing = clientsMap.get(key);
      if (!existing.phone && phoneInfo.phone) {
        existing.phone = phoneInfo.phone;
      }
      if (!existing.phone2 && phoneInfo.phone2) {
        existing.phone2 = phoneInfo.phone2;
      }
      if (!existing.notion_id && clientInfo.notion_id) {
        existing.notion_id = clientInfo.notion_id;
      }
    }
  });

  return Array.from(clientsMap.values());
}

/**
 * 사건 데이터 변환
 */
function transformCaseData(row) {
  return {
    contract_number: row['계약서번호'] || null,
    case_name: row['사건'] || 'Unknown',
    assigned_lawyer: null, // 담당변호사 정보가 CSV에 없음
    status: row['진행'] === '종결' ? '종결' : '진행중',
    case_type: row['사건종류'] || null,
    court_case_number: row['사건번호'] || null,
    court_name: row['관할법원'] || null,
    default_courtroom: row['디폴트 법정'] || null,
    office: row['수임사무실'] || null,
    contract_date: parseDate(row['수임일']),
    completion_date: null,
    retainer_fee: parseAmount(row['착수금']),
    total_received: parseAmount(row['입금액']),
    outstanding_balance: parseAmount(row['미수금']),
    success_fee_agreement: row['성보약정'] || null,
    calculated_success_fee: parseAmount(row['발생성보']),
    installment_terms: row['분납조건'] || null,
    payment_plan_notes: row['미수금 처리 방안'] || null,
    related_case_info: row['관계사건'] || null,
    notes: null
  };
}

/**
 * 메인 마이그레이션 함수
 */
async function migrate() {
  console.log('='.repeat(80));
  console.log('법무법인 더율 사건 데이터 마이그레이션 시작');
  console.log('='.repeat(80));
  console.log('');

  try {
    // 1. CSV 파일 읽기
    console.log('[1/5] CSV 파일 파싱 중...');
    const rows = parseCSV(CSV_PATH);
    console.log(`  ✓ ${rows.length}건의 사건 데이터 로드 완료\n`);

    // 2. 의뢰인 추출
    console.log('[2/5] 의뢰인 데이터 추출 중...');
    const clients = extractClients(rows);
    console.log(`  ✓ ${clients.length}명의 의뢰인 추출 완료\n`);

    // 3. 의뢰인 데이터 삽입
    console.log('[3/5] 의뢰인 데이터 Supabase 삽입 중...');
    const { data: insertedClients, error: clientError } = await supabase
      .from('clients')
      .insert(clients)
      .select();

    if (clientError) {
      throw new Error(`의뢰인 삽입 실패: ${clientError.message}`);
    }

    console.log(`  ✓ ${insertedClients.length}명의 의뢰인 삽입 완료\n`);

    // 4. 의뢰인 이름 -> ID 매핑 생성
    const clientNameToId = new Map();
    insertedClients.forEach(client => {
      clientNameToId.set(client.name, client.id);
    });

    // 5. 사건 데이터 변환 및 삽입
    console.log('[4/5] 사건 데이터 변환 및 삽입 중...');
    const cases = rows.map(row => {
      const caseData = transformCaseData(row);
      const clientInfo = parseClientInfo(row['의뢰인']);

      // client_id 매핑
      if (clientInfo.name && clientNameToId.has(clientInfo.name)) {
        caseData.client_id = clientNameToId.get(clientInfo.name);
      }

      return caseData;
    });

    const { data: insertedCases, error: caseError } = await supabase
      .from('legal_cases')
      .insert(cases)
      .select();

    if (caseError) {
      throw new Error(`사건 삽입 실패: ${caseError.message}`);
    }

    console.log(`  ✓ ${insertedCases.length}건의 사건 삽입 완료\n`);

    // 6. 결과 요약
    console.log('='.repeat(80));
    console.log('마이그레이션 완료!');
    console.log('='.repeat(80));
    console.log('');
    console.log(`총 ${insertedClients.length}명의 의뢰인 등록`);
    console.log(`총 ${insertedCases.length}건의 사건 등록`);
    console.log('');

    // 통계 정보
    const statusCounts = insertedCases.reduce((acc, c) => {
      acc[c.status] = (acc[c.status] || 0) + 1;
      return acc;
    }, {});

    console.log('사건 상태별 통계:');
    Object.entries(statusCounts).forEach(([status, count]) => {
      console.log(`  - ${status}: ${count}건`);
    });
    console.log('');

    const officeCounts = insertedCases.reduce((acc, c) => {
      const office = c.office || '미지정';
      acc[office] = (acc[office] || 0) + 1;
      return acc;
    }, {});

    console.log('사무실별 통계:');
    Object.entries(officeCounts).forEach(([office, count]) => {
      console.log(`  - ${office}: ${count}건`);
    });
    console.log('');

    // 금액 통계
    const totalReceived = insertedCases.reduce((sum, c) => sum + (c.total_received || 0), 0);
    const totalOutstanding = insertedCases.reduce((sum, c) => sum + (c.outstanding_balance || 0), 0);

    console.log('금액 통계:');
    console.log(`  - 총 입금액: ${totalReceived.toLocaleString()}원`);
    console.log(`  - 총 미수금: ${totalOutstanding.toLocaleString()}원`);
    console.log('');

  } catch (error) {
    console.error('마이그레이션 실패:', error.message);
    process.exit(1);
  }
}

// 실행
migrate();
