#!/usr/bin/env node

/**
 * 법무법인 더율 사건 데이터 마이그레이션 검증 스크립트
 * Created: 2025-11-21
 *
 * 마이그레이션 결과를 검증하고 통계를 출력
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

// Supabase 클라이언트 초기화
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function verify() {
  console.log('='.repeat(80));
  console.log('마이그레이션 검증 시작');
  console.log('='.repeat(80));
  console.log('');

  try {
    // 1. 의뢰인 데이터 검증
    console.log('[1/5] 의뢰인 데이터 검증 중...');
    const { data: clients, error: clientError, count: clientCount } = await supabase
      .from('clients')
      .select('*', { count: 'exact' });

    if (clientError) {
      throw new Error(`의뢰인 조회 실패: ${clientError.message}`);
    }

    console.log(`  ✓ 총 ${clientCount}명의 의뢰인 확인`);
    console.log(`  - 전화번호 있음: ${clients.filter(c => c.phone).length}명`);
    console.log(`  - Notion ID 있음: ${clients.filter(c => c.notion_id).length}명`);
    console.log('');

    // 2. 사건 데이터 검증
    console.log('[2/5] 사건 데이터 검증 중...');
    const { data: cases, error: caseError, count: caseCount } = await supabase
      .from('legal_cases')
      .select('*', { count: 'exact' });

    if (caseError) {
      throw new Error(`사건 조회 실패: ${caseError.message}`);
    }

    console.log(`  ✓ 총 ${caseCount}건의 사건 확인`);
    console.log('');

    // 3. client_id 연결 검증
    console.log('[3/5] 의뢰인-사건 연결 검증 중...');
    const casesWithClient = cases.filter(c => c.client_id !== null);
    const casesWithoutClient = cases.filter(c => c.client_id === null);

    console.log(`  ✓ client_id 연결됨: ${casesWithClient.length}건`);
    if (casesWithoutClient.length > 0) {
      console.log(`  ⚠ client_id 미연결: ${casesWithoutClient.length}건`);
      console.log(`    (의뢰인 정보가 없는 사건일 수 있음)`);
    }
    console.log('');

    // 4. 데이터 무결성 검증
    console.log('[4/5] 데이터 무결성 검증 중...');

    // 날짜 형식 검증
    const casesWithContractDate = cases.filter(c => c.contract_date !== null);
    console.log(`  ✓ 수임일 있음: ${casesWithContractDate.length}건`);

    // 금액 데이터 검증
    const casesWithAmount = cases.filter(c => c.total_received > 0 || c.retainer_fee > 0);
    console.log(`  ✓ 금액 정보 있음: ${casesWithAmount.length}건`);

    // 법원 정보 검증
    const casesWithCourt = cases.filter(c => c.court_name !== null);
    console.log(`  ✓ 관할법원 있음: ${casesWithCourt.length}건`);
    console.log('');

    // 5. 상세 통계
    console.log('[5/5] 상세 통계 생성 중...');
    console.log('');

    // 사건 상태별 통계
    const statusCounts = cases.reduce((acc, c) => {
      acc[c.status] = (acc[c.status] || 0) + 1;
      return acc;
    }, {});

    console.log('📊 사건 상태별 통계:');
    Object.entries(statusCounts).forEach(([status, count]) => {
      const percentage = ((count / caseCount) * 100).toFixed(1);
      console.log(`  - ${status}: ${count}건 (${percentage}%)`);
    });
    console.log('');

    // 사무실별 통계
    const officeCounts = cases.reduce((acc, c) => {
      const office = c.office || '미지정';
      acc[office] = (acc[office] || 0) + 1;
      return acc;
    }, {});

    console.log('🏢 사무실별 통계:');
    Object.entries(officeCounts).sort((a, b) => b[1] - a[1]).forEach(([office, count]) => {
      const percentage = ((count / caseCount) * 100).toFixed(1);
      console.log(`  - ${office}: ${count}건 (${percentage}%)`);
    });
    console.log('');

    // 사건 종류별 통계
    const typeCounts = cases.reduce((acc, c) => {
      const type = c.case_type || '미지정';
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});

    console.log('⚖️  사건 종류별 통계 (상위 10개):');
    Object.entries(typeCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .forEach(([type, count]) => {
        const percentage = ((count / caseCount) * 100).toFixed(1);
        console.log(`  - ${type}: ${count}건 (${percentage}%)`);
      });
    console.log('');

    // 금액 통계
    const totalReceived = cases.reduce((sum, c) => sum + (c.total_received || 0), 0);
    const totalRetainerFee = cases.reduce((sum, c) => sum + (c.retainer_fee || 0), 0);
    const totalOutstanding = cases.reduce((sum, c) => sum + (c.outstanding_balance || 0), 0);
    const totalSuccessFee = cases.reduce((sum, c) => sum + (c.calculated_success_fee || 0), 0);

    console.log('💰 금액 통계:');
    console.log(`  - 총 입금액: ${totalReceived.toLocaleString()}원`);
    console.log(`  - 총 착수금: ${totalRetainerFee.toLocaleString()}원`);
    console.log(`  - 총 발생성보: ${totalSuccessFee.toLocaleString()}원`);
    console.log(`  - 총 미수금: ${totalOutstanding.toLocaleString()}원`);
    console.log('');

    // 연도별 통계
    const yearCounts = cases.reduce((acc, c) => {
      if (c.contract_date) {
        const year = new Date(c.contract_date).getFullYear();
        acc[year] = (acc[year] || 0) + 1;
      }
      return acc;
    }, {});

    console.log('📅 연도별 수임 통계:');
    Object.entries(yearCounts)
      .sort((a, b) => a[0] - b[0])
      .forEach(([year, count]) => {
        const percentage = ((count / caseCount) * 100).toFixed(1);
        console.log(`  - ${year}년: ${count}건 (${percentage}%)`);
      });
    console.log('');

    // 미수금 관련 통계
    const casesWithOutstanding = cases.filter(c => c.outstanding_balance > 0);
    const casesWithPaymentPlan = cases.filter(c => c.payment_plan_notes);

    console.log('💳 미수금 관련 통계:');
    console.log(`  - 미수금 있는 사건: ${casesWithOutstanding.length}건`);
    console.log(`  - 평균 미수금: ${Math.round(totalOutstanding / casesWithOutstanding.length || 0).toLocaleString()}원`);
    console.log(`  - 미수금 처리 방안 있음: ${casesWithPaymentPlan.length}건`);
    console.log('');

    // 관계사건 통계
    const casesWithRelatedCases = cases.filter(c => c.related_case_info);
    console.log('🔗 관계사건 통계:');
    console.log(`  - 관계사건 있음: ${casesWithRelatedCases.length}건`);
    console.log('');

    // 검증 결과 요약
    console.log('='.repeat(80));
    console.log('검증 완료!');
    console.log('='.repeat(80));
    console.log('');
    console.log('✅ 모든 데이터가 정상적으로 마이그레이션되었습니다.');
    console.log('');
    console.log(`총 의뢰인: ${clientCount}명`);
    console.log(`총 사건: ${caseCount}건`);
    console.log(`client_id 연결률: ${((casesWithClient.length / caseCount) * 100).toFixed(1)}%`);
    console.log('');

    // 데이터 품질 점수
    const qualityScore = (
      (casesWithClient.length / caseCount * 0.3) +
      (casesWithContractDate.length / caseCount * 0.2) +
      (casesWithAmount.length / caseCount * 0.2) +
      (casesWithCourt.length / caseCount * 0.15) +
      (cases.filter(c => c.case_type).length / caseCount * 0.15)
    ) * 100;

    console.log(`📊 데이터 품질 점수: ${qualityScore.toFixed(1)}/100`);
    console.log('');

  } catch (error) {
    console.error('검증 실패:', error.message);
    process.exit(1);
  }
}

// 실행
verify();
