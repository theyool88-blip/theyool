'use client';

interface LitigationTimelineProps {
  pageType: 'alimony' | 'custody' | 'property';
}

export default function LitigationTimeline({ pageType }: LitigationTimelineProps) {
  const timelineData = {
    alimony: {
      title: '위자료 방어 소송 진행 과정',
      subtitle: '평균 4~8개월 소요 (협의 시 2~3개월)',
      steps: [
        {
          number: '01',
          title: '긴급 법률 검토',
          duration: '당일',
          description: '위자료 청구서 분석 및 대응 전략 수립',
          tasks: ['청구 근거 법적 검토', '증거 자료 1차 분석', '감액 가능성 평가', '즉시 대응 사항 확인'],
          icon: '⚡',
          color: 'red',
        },
        {
          number: '02',
          title: '답변서 제출',
          duration: '2주 내',
          description: '법원에 정식 답변서 및 증거 제출',
          tasks: ['반박 논리 구성', '유리한 증거 수집·제출', '과실상계 주장 준비', '감액 근거 법리 작성'],
          icon: '📝',
          color: 'blue',
        },
        {
          number: '03',
          title: '재판 진행',
          duration: '3~6개월',
          description: '변론기일 출석 및 공방',
          tasks: ['1~3회 변론기일', '추가 증거 제출', '증인 신문 (필요시)', '조정 시도'],
          icon: '⚖️',
          color: 'purple',
        },
        {
          number: '04',
          title: '판결/합의',
          duration: '최종',
          description: '판결 선고 또는 조정 성립',
          tasks: ['판결문 수령', '항소 여부 검토', '합의 시 합의서 작성', '이행 확인'],
          icon: '✅',
          color: 'green',
        },
      ],
    },
    custody: {
      title: '양육권 소송 진행 과정',
      subtitle: '평균 6~12개월 소요 (긴급 시 임시양육자 지정 3~7일)',
      steps: [
        {
          number: '01',
          title: '긴급 상황 평가',
          duration: '당일',
          description: '자녀 현황 파악 및 긴급 조치 필요성 판단',
          tasks: ['자녀 현재 위치 확인', '양육 환경 1차 평가', '긴급 신청 필요성 검토', '증거 자료 목록 작성'],
          icon: '🚨',
          color: 'red',
        },
        {
          number: '02',
          title: '임시양육자 지정 신청',
          duration: '3~7일',
          description: '긴급한 경우 임시로 양육권 확보 (선택)',
          tasks: ['신청서 작성·제출', '긴급 변론기일', '판사 면담 (필요시)', '임시 결정 받음'],
          icon: '⚡',
          color: 'orange',
        },
        {
          number: '03',
          title: '본안 소송',
          duration: '6~10개월',
          description: '정식 양육권 소송 진행',
          tasks: ['소장/답변서 제출', '가사조사관 조사', '자녀 면담 (필요시)', '여러 차례 변론'],
          icon: '⚖️',
          color: 'blue',
        },
        {
          number: '04',
          title: '판결 확정',
          duration: '최종',
          description: '양육권자 결정 및 양육비 산정',
          tasks: ['판결문 수령', '양육비 결정', '면접교섭권 확정', '이행 강제 방법 안내'],
          icon: '✅',
          color: 'green',
        },
      ],
    },
    property: {
      title: '재산분할 소송 진행 과정',
      subtitle: '평균 8~14개월 소요 (재산조회 기간 포함)',
      steps: [
        {
          number: '01',
          title: '재산 조사',
          duration: '2~4주',
          description: '은닉 재산 추적 및 전체 재산 목록 작성',
          tasks: ['금융거래정보 조회 신청', '부동산 등기부 전국 조회', '사업체·법인 재산 파악', '가족 명의 재산 확인'],
          icon: '🔍',
          color: 'orange',
        },
        {
          number: '02',
          title: '소장 제출',
          duration: '1주',
          description: '재산분할 청구 소장 작성 및 제출',
          tasks: ['재산 목록 첨부', '기여도 주장 논리 구성', '특유재산 입증 자료', '관할 법원 제출'],
          icon: '📄',
          color: 'blue',
        },
        {
          number: '03',
          title: '재판 진행',
          duration: '6~12개월',
          description: '재산 평가 및 기여도 공방',
          tasks: ['재산 가액 감정 (필요시)', '기여도 입증 자료 제출', '여러 차례 변론', '조정 시도'],
          icon: '⚖️',
          color: 'purple',
        },
        {
          number: '04',
          title: '판결/이행',
          duration: '최종',
          description: '재산분할 비율 확정 및 이행',
          tasks: ['판결문 수령', '부동산 이전 등기', '금전 지급 이행', '미이행 시 강제집행'],
          icon: '✅',
          color: 'green',
        },
      ],
    },
  };

  const data = timelineData[pageType];

  return (
    <section className="max-w-[1200px] mx-auto px-6 md:px-12 mb-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          {data.title}
        </h2>
        <p className="text-gray-600">{data.subtitle}</p>
      </div>

      {/* 타임라인 */}
      <div className="relative">
        {/* 연결선 (데스크탑) */}
        <div className="hidden md:block absolute top-12 left-0 right-0 h-1 bg-gradient-to-r from-gray-200 via-blue-200 to-green-200"></div>

        <div className="grid md:grid-cols-4 gap-8 relative">
          {data.steps.map((step, idx) => (
            <div key={idx} className="relative">
              {/* 단계 번호 */}
              <div className="flex flex-col items-center mb-4">
                <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-3xl md:text-4xl bg-white border-4 ${
                  step.color === 'red' ? 'border-red-500 shadow-red-200' :
                  step.color === 'orange' ? 'border-orange-500 shadow-orange-200' :
                  step.color === 'blue' ? 'border-blue-500 shadow-blue-200' :
                  step.color === 'purple' ? 'border-purple-500 shadow-purple-200' :
                  'border-green-500 shadow-green-200'
                } shadow-lg z-10 relative`}>
                  {step.icon}
                </div>
                <div className={`mt-2 px-3 py-1 rounded-full text-xs font-bold ${
                  step.color === 'red' ? 'bg-red-100 text-red-700' :
                  step.color === 'orange' ? 'bg-orange-100 text-orange-700' :
                  step.color === 'blue' ? 'bg-blue-100 text-blue-700' :
                  step.color === 'purple' ? 'bg-purple-100 text-purple-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {step.duration}
                </div>
              </div>

              {/* 내용 카드 */}
              <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-100 hover:border-blue-200 transition-all">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-2xl font-bold ${
                    step.color === 'red' ? 'text-red-500' :
                    step.color === 'orange' ? 'text-orange-500' :
                    step.color === 'blue' ? 'text-blue-500' :
                    step.color === 'purple' ? 'text-purple-500' :
                    'text-green-500'
                  }`}>{step.number}</span>
                  <h3 className="text-lg font-bold text-gray-900">{step.title}</h3>
                </div>

                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  {step.description}
                </p>

                <div className="space-y-2">
                  {step.tasks.map((task, taskIdx) => (
                    <div key={taskIdx} className="flex items-start gap-2 text-sm">
                      <span className={`mt-1 ${
                        step.color === 'red' ? 'text-red-400' :
                        step.color === 'orange' ? 'text-orange-400' :
                        step.color === 'blue' ? 'text-blue-400' :
                        step.color === 'purple' ? 'text-purple-400' :
                        'text-green-400'
                      }`}>✓</span>
                      <span className="text-gray-700">{task}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 안내 */}
      <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-200">
        <p className="text-center text-gray-700">
          <strong className="text-blue-600">💡 참고:</strong> 위 기간은 평균 소요 기간이며,
          사건의 복잡도와 상대방 협조 여부에 따라 달라질 수 있습니다.
          정확한 일정은 <strong>초회 상담 시 안내</strong>드립니다.
        </p>
      </div>
    </section>
  );
}
