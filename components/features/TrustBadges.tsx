'use client';

export default function TrustBadges() {
  return (
    <section className="bg-gray-50 py-12 border-y border-gray-200">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="text-center mb-8">
          <p className="text-sm text-gray-500 mb-2">Trusted by 1,200+ Clients</p>
          <h2 className="text-2xl font-bold text-gray-900">
            검증된 전문성과 신뢰
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* 리뷰 점수 */}
          <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-200">
            <div className="text-3xl font-bold text-blue-600 mb-2">4.9/5.0</div>
            <div className="flex justify-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`w-5 h-5 ${star === 5 ? 'text-gray-300' : 'text-yellow-400'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-xs text-gray-600">328개 리뷰</p>
          </div>

          {/* 경력 */}
          <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-200">
            <div className="text-3xl font-bold text-blue-600 mb-2">15년+</div>
            <p className="text-sm text-gray-600">이혼 전문</p>
            <p className="text-xs text-gray-500 mt-1">누적 경력</p>
          </div>

          {/* 성공률 */}
          <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-200">
            <div className="text-3xl font-bold text-blue-600 mb-2">94%</div>
            <p className="text-sm text-gray-600">승소율</p>
            <p className="text-xs text-gray-500 mt-1">2024년 기준</p>
          </div>

          {/* 인증 */}
          <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-200">
            <div className="text-3xl mb-2">⚖️</div>
            <p className="text-sm text-gray-600">대한변호사협회</p>
            <p className="text-xs text-gray-500 mt-1">정식 등록</p>
          </div>
        </div>

        {/* 변호사 프로필 */}
        <div className="mt-8 bg-white rounded-xl p-6 md:p-8 shadow-sm border border-gray-200">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center text-4xl font-bold text-blue-600">
              임
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-bold text-gray-900 mb-1">임은지 변호사</h3>
              <p className="text-sm text-gray-600 mb-3">법무법인 더율 광고책임변호사 · 이혼전문</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-2 text-xs">
                <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full">서울대학교 법학과</span>
                <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full">사법연수원 수료</span>
                <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full">이혼전문 15년</span>
                <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full">가사소송 1,200건+</span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">1,200+</div>
              <p className="text-sm text-gray-600">처리 사건</p>
            </div>
          </div>
        </div>

        {/* 보안 인증 */}
        <div className="mt-6 flex justify-center items-center gap-6 text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <span>SSL 보안 인증</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>개인정보보호 준수</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>변호사법 준수</span>
          </div>
        </div>
      </div>
    </section>
  );
}
