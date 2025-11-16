import PageLayout from '@/components/layouts/PageLayout';

export const metadata = {
  title: '면책공고 | 법무법인 더율',
  description: '법무법인 더율 웹사이트 이용 시 유의사항 및 면책 사항을 안내합니다.',
};

export default function DisclaimerPage() {
  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/30 to-white py-20 md:py-32">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          {/* 헤더 */}
          <div className="text-center mb-16">
            <p className="text-xs md:text-sm text-gray-600 mb-4 tracking-[0.2em] uppercase">
              Disclaimer
            </p>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-gray-900">
              면책공고
            </h1>
          </div>

          {/* 본문 */}
          <div className="bg-white border border-gray-200 rounded-lg p-8 md:p-12 shadow-sm">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6">
                본 웹사이트에 등록된 모든 내용은 일반적인 정보를 제공하기 위하여 작성되었습니다.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                구체적인 법률관계에 대해서는 저희 법인이나 다른 변호사와 상담하시기 바랍니다.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                저희 웹사이트에서 취득한 정보로 인하여 직접, 간접적 손해가 발생하였다고 하더라도 저희는 그 어떠한 책임도 지지 않음을 유념하기 바랍니다.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                그럼에도, 저희 더율은 여러분의 모든 문제가 잘 해결되시기를 기원하고 있습니다.
              </p>

              <p className="text-gray-900 font-semibold mt-8">
                감사합니다.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">
              구체적인 법률 상담이 필요하신가요?
            </p>
            <a
              href="/contact"
              className="inline-block px-8 py-3 bg-gray-900 text-white font-semibold rounded-md hover:bg-gray-800 transition-colors"
            >
              상담 문의하기
            </a>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
