import PageLayout from '@/components/layouts/PageLayout';
import ConsultationButton from '@/components/features/ConsultationButton';

export default function ContactPage() {
  return (
    <PageLayout>
      <div className="bg-white py-20 md:py-32">
        <div className="max-w-[1040px] mx-auto px-6">
          {/* 헤더 */}
          <div className="text-center mb-16 md:mb-20">
            <h1 className="text-4xl md:text-6xl font-bold text-[var(--primary)] mb-6">
              오시는 길
            </h1>
            <p className="text-lg md:text-xl text-[var(--gray-600)]">
              언제든 편안하게 방문해주세요
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {/* 연락처 정보 */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--primary)] mb-8">
                연락처
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[var(--accent)]/10 flex items-center justify-center">
                    <svg className="w-6 h-6 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-[var(--gray-900)] mb-1">전화번호</h3>
                    <a href="tel:02-1234-5678" className="text-lg text-[var(--accent)] hover:text-[var(--accent-dark)] font-semibold">
                      02-1234-5678
                    </a>
                    <p className="text-sm text-[var(--gray-600)] mt-1">
                      평일 09:00 - 18:00
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[var(--accent)]/10 flex items-center justify-center">
                    <svg className="w-6 h-6 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-[var(--gray-900)] mb-1">이메일</h3>
                    <a href="mailto:info@theyool.com" className="text-lg text-[var(--accent)] hover:text-[var(--accent-dark)] font-semibold">
                      info@theyool.com
                    </a>
                    <p className="text-sm text-[var(--gray-600)] mt-1">
                      24시간 접수 가능
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[var(--accent)]/10 flex items-center justify-center">
                    <svg className="w-6 h-6 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-[var(--gray-900)] mb-1">주소</h3>
                    <p className="text-base text-[var(--gray-700)]">
                      서울특별시 서초구 서초대로 123<br />
                      법조타워 10층
                    </p>
                    <p className="text-sm text-[var(--gray-600)] mt-2">
                      지하철 2호선 서초역 4번 출구 도보 5분
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[var(--accent)]/10 flex items-center justify-center">
                    <svg className="w-6 h-6 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-[var(--gray-900)] mb-1">상담 시간</h3>
                    <p className="text-base text-[var(--gray-700)]">
                      평일: 09:00 - 18:00<br />
                      점심시간: 12:00 - 13:00
                    </p>
                    <p className="text-sm text-[var(--gray-600)] mt-2">
                      주말/공휴일: 사전 예약 상담
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 오시는 길 안내 */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--primary)] mb-8">
                찾아오시는 길
              </h2>
              <div className="space-y-6">
                <div className="bg-[var(--gray-50)] p-6 rounded-xl">
                  <h3 className="font-bold text-[var(--gray-900)] mb-3 flex items-center gap-2">
                    <span className="text-blue-600">🚇</span>
                    지하철 이용 시
                  </h3>
                  <ul className="space-y-2 text-[var(--gray-700)]">
                    <li>• 2호선 서초역 4번 출구 → 도보 5분</li>
                    <li>• 3호선 교대역 3번 출구 → 도보 10분</li>
                  </ul>
                </div>

                <div className="bg-[var(--gray-50)] p-6 rounded-xl">
                  <h3 className="font-bold text-[var(--gray-900)] mb-3 flex items-center gap-2">
                    <span className="text-green-600">🚗</span>
                    자가용 이용 시
                  </h3>
                  <ul className="space-y-2 text-[var(--gray-700)]">
                    <li>• 강남대로 → 서초대로 진입</li>
                    <li>• 법조타워 주차장 이용 가능</li>
                    <li>• 2시간 무료 주차 지원</li>
                  </ul>
                </div>

                <div className="bg-[var(--gray-50)] p-6 rounded-xl">
                  <h3 className="font-bold text-[var(--gray-900)] mb-3 flex items-center gap-2">
                    <span className="text-orange-600">🚌</span>
                    버스 이용 시
                  </h3>
                  <ul className="space-y-2 text-[var(--gray-700)]">
                    <li>• 간선: 140, 441, 462, 540</li>
                    <li>• 지선: 5413, 6411</li>
                    <li>• 정류장: 서초역 하차</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* 지도 영역 (추후 구현) */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--primary)] mb-8 text-center">
              위치
            </h2>
            <div className="bg-[var(--gray-100)] rounded-3xl aspect-video flex items-center justify-center">
              <div className="text-center">
                <svg className="w-16 h-16 mx-auto mb-4 text-[var(--gray-400)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-[var(--gray-600)]">지도가 표시될 영역입니다</p>
                <p className="text-sm text-[var(--gray-500)] mt-2">
                  Kakao Map 또는 Naver Map 연동 예정
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-hero text-white rounded-3xl p-12 text-center">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              방문 전 상담 예약을 권장합니다
            </h3>
            <p className="text-lg mb-8 opacity-90">
              예약 상담 시 대기 없이 전문 변호사와 충분한 시간 상담이 가능합니다
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="tel:02-1234-5678"
                className="inline-block bg-white text-[var(--primary)] font-bold px-8 py-4 rounded-full text-lg hover:bg-[var(--gray-100)] transition-all hover-lift shadow-toss-xl"
              >
                📞 전화 상담 예약
              </a>
              <ConsultationButton
                variant="secondary"
                size="lg"
              />
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
