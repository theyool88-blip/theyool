import PageLayout from '@/components/layouts/PageLayout';

export const metadata = {
  title: '개인정보처리방침 | 법무법인 더율',
  description: '법무법인 더율의 개인정보 처리방침을 확인하세요. 개인정보 보호법에 따라 정보주체의 개인정보를 보호합니다.',
};

export default function PrivacyPage() {
  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/30 to-white py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          {/* 헤더 */}
          <div className="text-center mb-16">
            <p className="text-xs md:text-sm text-gray-600 mb-4 tracking-[0.2em] uppercase">
              Privacy Policy
            </p>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-gray-900">
              개인정보처리방침
            </h1>
            <p className="text-gray-600 text-sm">
              시행일자: 2025. 1. 1.
            </p>
          </div>

          {/* 본문 */}
          <div className="bg-white border border-gray-200 rounded-lg p-8 md:p-12 shadow-sm">
            <div className="prose prose-lg max-w-none">
              {/* 전문 */}
              <p className="text-gray-700 leading-relaxed mb-8">
                법무법인 더율은 개인정보 보호법 제30조에 따라 정보주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립, 공개합니다.
              </p>

              {/* 제1조 */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-200">
                  제1조 (개인정보의 처리목적)
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  법무법인 더율이 개인정보 보호법 제32조에 따라 등록․공개하는 개인정보파일의 처리목적은 다음과 같습니다.
                </p>
                <div className="bg-gray-50 p-6 rounded-lg space-y-2 text-sm">
                  <p className="text-gray-700"><strong>개인정보 파일명:</strong> 인적사항 및 연락처</p>
                  <p className="text-gray-700"><strong>개인정보의 처리목적:</strong> 법률 서비스 제공</p>
                  <p className="text-gray-700"><strong>수집방법:</strong> 생성정보 수집 툴을 통한 수집, 전화/팩스, 서면양식, 홈페이지</p>
                  <p className="text-gray-700"><strong>보유근거:</strong> 통신비밀보호법 등</p>
                  <p className="text-gray-700"><strong>관련법령:</strong> 표시/광고에 관한 기록: 6개월, 계약 또는 청약철회 등에 관한 기록: 5년, 대금결제 및 재화 등의 공급에 관한 기록: 5년, 소비자의 불만 또는 분쟁처리에 관한 기록: 3년, 신용정보의 수집/처리 및 이용 등에 관한 기록: 3년</p>
                </div>
              </section>

              {/* 제2조 */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-200">
                  제2조 (처리하는 개인정보의 항목)
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  인적사항(이름, 휴대전화번호, 접속 로그 등)
                </p>
              </section>

              {/* 제3조 */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-200">
                  제3조 (개인정보의 파기)
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  법무법인 더율은 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.
                </p>
              </section>

              {/* 제4조 */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-200">
                  제4조 (정보주체와 법정대리인의 권리·의무 및 그 행사방법에 관한 사항)
                </h2>
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    ① 정보주체는 법무법인 더율에 대해 언제든지 개인정보 열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있습니다.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    ② 제1항에 따른 권리 행사는 법무법인 더율에 대해 「개인정보 보호법」 시행령 제41조제1항에 따라 서면, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며 법무법인 더율은 이에 대해 지체 없이 조치하겠습니다.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    ③ 제1항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수 있습니다. 이 경우 "개인정보 처리 방법에 관한 고시(제2020-7호)" 별지 제11호 서식에 따른 위임장을 제출하셔야 합니다.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    ④ 개인정보 열람 및 처리정지 요구는 「개인정보 보호법」 제35조 제4항, 제37조 제2항에 의하여 정보주체의 권리가 제한 될 수 있습니다.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    ⑤ 개인정보의 정정 및 삭제 요구는 다른 법령에서 그 개인정보가 수집 대상으로 명시되어 있는 경우에는 그 삭제를 요구할 수 없습니다.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    ⑥ 법무법인 더율은 정보주체 권리에 따른 열람의 요구, 정정·삭제의 요구, 처리정지의 요구 시 열람 등 요구를 한 자가 본인이거나 정당한 대리인인지를 확인합니다.
                  </p>
                </div>
              </section>

              {/* 제5조 */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-200">
                  제5조 (개인정보의 안전성 확보조치에 관한 사항)
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  법무법인 더율은 개인정보의 안전성 확보를 위해 내부관리계획의 수립 및 시행-개인정보의 안전한 처리를 위하여 내부관리계획을 수립하고 시행하고 있습니다.
                </p>
              </section>

              {/* 제6조 */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-200">
                  제6조 (개인정보를 자동으로 수집하는 장치의 설치·운영 및 그 거부에 관한 사항)
                </h2>
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    ① 법무법인 더율은 이용자에게 개별적인 맞춤서비스를 제공하기 위해 이용정보를 저장하고 수시로 불러오는 '쿠키(cookie)'를 사용합니다.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    ② 쿠키는 웹사이트를 운영하는데 이용되는 서버(http)가 이용자의 컴퓨터 브라우저에게 보내는 소량의 정보이며 이용자들의 PC 컴퓨터내의 하드디스크에 저장되기도 합니다.
                  </p>
                  <div className="pl-6 space-y-3">
                    <p className="text-gray-700 leading-relaxed">
                      가. 쿠키의 사용 목적: 이용자가 방문한 각 서비스와 웹 사이트들에 대한 방문 및 이용형태, 인기 검색어, 보안접속 여부 등을 파악하여 이용자에게 최적화된 정보 제공을 위해 사용됩니다.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      나. 쿠키의 설치•운영 및 거부: 웹브라우저 상단의 도구→인터넷 옵션→개인정보 메뉴의 옵션 설정을 통해 쿠키 저장을 거부 할 수 있습니다.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      다. 쿠키 저장을 거부할 경우 맞춤형 서비스 이용에 어려움이 발생할 수 있습니다.
                    </p>
                  </div>
                </div>
              </section>

              {/* 제7조 */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-200">
                  제7조 (개인정보 보호책임자에 관한 사항)
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  법무법인 더율은 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
                </p>
                <div className="bg-gray-50 p-6 rounded-lg space-y-2">
                  <p className="text-lg font-bold text-gray-900 mb-3">▶ 개인정보 보호책임자</p>
                  <p className="text-gray-700"><strong>성명:</strong> 임은지</p>
                  <p className="text-gray-700"><strong>직책:</strong> 변호사</p>
                  <p className="text-gray-700"><strong>연락처:</strong> 031-647-3777</p>
                </div>
              </section>

              {/* 제9조 */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-200">
                  제9조 (정보주체의 권익침해에 대한 구제방법)
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  정보주체는 개인정보침해로 인한 구제를 받기 위하여 개인정보분쟁조정위원회, 한국인터넷진흥원 개인정보침해신고센터 등에 분쟁해결이나 상담 등을 신청할 수 있습니다. 이 밖에 기타 개인정보침해의 신고, 상담에 대하여는 아래의 기관에 문의하시기 바랍니다.
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li className="text-gray-700">개인정보분쟁조정위원회: (국번없이) 1833-6972 (www.kopico.go.kr)</li>
                  <li className="text-gray-700">개인정보침해신고센터: (국번없이) 118 (privacy.kisa.or.kr)</li>
                  <li className="text-gray-700">대검찰청: (국번없이) 1301 (www.spo.go.kr)</li>
                  <li className="text-gray-700">경찰청: (국번없이) 182 (ecrm.cyber.go.kr)</li>
                </ul>
                <p className="text-gray-700 leading-relaxed text-sm">
                  「개인정보보호법」제35조(개인정보의 열람), 제36조(개인정보의 정정·삭제), 제37조(개인정보의 처리정지 등)의 규정에 의한 요구에 대하여 공공기관의 장이 행한 처분 또는 부작위로 인하여 권리 또는 이익의 침해를 받은 자는 행정심판법이 정하는 바에 따라 행정심판을 청구할 수 있습니다.
                </p>
                <p className="text-gray-600 text-sm mt-2">
                  ※ 행정심판에 대해 자세한 사항은 중앙행정심판위원회(www.simpan.go.kr) 홈페이지를 참고하시기 바랍니다.
                </p>
              </section>

              {/* 제10조 */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-200">
                  제10조 (개인정보 처리방침 변경)
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  이 개인정보처리방침은 2025. 1. 1.부터 적용됩니다.
                </p>
              </section>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">
              개인정보 처리와 관련하여 문의사항이 있으신가요?
            </p>
            <a
              href="/contact"
              className="inline-block px-8 py-3 bg-gray-900 text-white font-semibold rounded-md hover:bg-gray-800 transition-colors"
            >
              문의하기
            </a>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
