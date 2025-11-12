'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import MobileMenu from '@/components/ui/MobileMenu';
import Modal from '@/components/ui/Modal';
import ConsultationForm from '@/components/features/ConsultationForm';
import NaverMap from '@/components/features/NaverMap';

export default function ContactPage() {
  const [isTalkModalOpen, setIsTalkModalOpen] = useState(false);
  const [activeOffice, setActiveOffice] = useState<'pyeongtaek' | 'cheonan'>('pyeongtaek');

  const offices = {
    pyeongtaek: {
      name: '평택 분사무소',
      subtitle: '평택법원 바로 앞',
      address: '경기도 평택시 평남로 1029-1 6층',
      phone: '031-647-3777',
      naverMapUrl: 'https://naver.me/GV2jdJq8',
      naverBookingUrl: 'https://booking.naver.com/booking/6/bizes/1076817',
      latitude: 37.009490,
      longitude: 127.096918,
      markerTitle: '더율 평택',
    },
    cheonan: {
      name: '천안 주사무소',
      subtitle: '천안법원 바로 앞',
      address: '충청남도 천안시 동남구 청수5로 11, 9층 (센타타워)',
      phone: '041-417-5551',
      naverMapUrl: 'https://naver.me/Gip6GYfp',
      naverBookingUrl: 'https://booking.naver.com/booking/6/bizes/1076817',
      latitude: 36.784405,
      longitude: 127.153929,
      markerTitle: '더율 천안',
    },
  };

  const currentOffice = offices[activeOffice];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-[100] bg-white/95 backdrop-blur-sm">
        <nav className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <MobileMenu />
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <Link href="/">
                <Image
                  src="/images/logo-horizontal.png"
                  alt="법무법인 더율"
                  width={180}
                  height={45}
                  className="h-6 md:h-7 w-auto cursor-pointer brightness-0"
                  priority
                />
              </Link>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => setIsTalkModalOpen(true)}
                className="text-sm font-normal text-black hover:text-gray-600 transition-colors"
              >
                상담예약
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Talk 버튼 */}
      <div className="fixed bottom-8 right-4 z-50 animate-float">
        <button
          onClick={() => setIsTalkModalOpen(true)}
          className="w-14 h-14 md:w-16 md:h-16 bg-black rounded-full text-white font-medium shadow-2xl hover:bg-gray-800 hover:scale-110 transition-all duration-300 flex items-center justify-center border-[0.5px] border-white"
        >
          <span className="text-xs md:text-sm">Talk</span>
        </button>
      </div>

      <Modal isOpen={isTalkModalOpen} onClose={() => setIsTalkModalOpen(false)} maxWidth="lg">
        <ConsultationForm onCancel={() => setIsTalkModalOpen(false)} />
      </Modal>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-purple-50/30 via-pink-50/20 to-white">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="text-center">
            <p className="text-xs md:text-sm text-purple-400 mb-3 tracking-[0.2em] uppercase font-medium">Location</p>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4 md:mb-6 tracking-tight">
              오시는 길
            </h1>
            <p className="text-base md:text-xl text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
              평택법원과 천안법원 바로 앞에 위치한<br />
              법무법인 더율을 찾아주세요
            </p>
          </div>
        </div>
      </section>

      {/* 사무소 선택 탭 */}
      <section className="py-8 bg-gradient-to-r from-purple-50/30 to-pink-50/30 border-b border-purple-100/50">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setActiveOffice('pyeongtaek')}
              className={`px-8 py-3 rounded-full font-medium transition-all duration-300 ${
                activeOffice === 'pyeongtaek'
                  ? 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 shadow-md border border-purple-200/50'
                  : 'bg-white text-gray-600 hover:bg-purple-50/50 border border-purple-100/30'
              }`}
            >
              평택 분사무소
            </button>
            <button
              onClick={() => setActiveOffice('cheonan')}
              className={`px-8 py-3 rounded-full font-medium transition-all duration-300 ${
                activeOffice === 'cheonan'
                  ? 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 shadow-md border border-purple-200/50'
                  : 'bg-white text-gray-600 hover:bg-purple-50/50 border border-purple-100/30'
              }`}
            >
              천안 주사무소
            </button>
          </div>
        </div>
      </section>

      {/* 지도 및 정보 */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white via-purple-50/20 to-pink-50/20">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* 지도 영역 - 네이버 지도 */}
            <div className="order-2 lg:order-1">
              <div className="relative w-full h-[400px] md:h-[500px] shadow-lg border border-purple-100/30">
                <NaverMap
                  latitude={currentOffice.latitude}
                  longitude={currentOffice.longitude}
                  title={currentOffice.markerTitle}
                  address={currentOffice.address}
                />
              </div>
              <div className="mt-6 flex flex-col gap-3">
                <a
                  href={currentOffice.naverBookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 font-medium rounded-2xl hover:from-purple-200 hover:to-pink-200 transition-all duration-300 shadow-md border border-purple-200/50"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                  </svg>
                  네이버 예약하기
                </a>
                <a
                  href={`tel:${currentOffice.phone.replace(/-/g, '')}`}
                  className="flex items-center justify-center gap-2 px-6 py-4 bg-gray-50 text-gray-800 font-medium rounded-2xl hover:bg-gray-100 transition-all duration-300 shadow-md border border-gray-200"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                  전화 상담 {currentOffice.phone}
                </a>
              </div>
            </div>

            {/* 정보 */}
            <div className="order-1 lg:order-2">
              <div className="bg-gradient-to-br from-purple-50/40 via-pink-50/30 to-white rounded-3xl p-8 md:p-10 shadow-lg border border-purple-100/30">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {currentOffice.name}
                </h2>
                <p className="text-lg text-purple-400 mb-8 font-medium">{currentOffice.subtitle}</p>

                <div className="space-y-5">
                  {/* 주소 */}
                  <div className="flex items-start gap-4 bg-white/70 backdrop-blur-sm p-5 rounded-2xl border border-purple-50">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center shadow-sm">
                      <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-purple-400 mb-1">주소</h3>
                      <p className="text-base text-gray-800">{currentOffice.address}</p>
                    </div>
                  </div>

                  {/* 전화번호 */}
                  <div className="flex items-start gap-4 bg-white/70 backdrop-blur-sm p-5 rounded-2xl border border-purple-50">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center shadow-sm">
                      <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-blue-400 mb-1">전화번호</h3>
                      <a href={`tel:${currentOffice.phone.replace(/-/g, '')}`} className="text-base text-gray-800 hover:text-purple-600 transition-colors font-medium">
                        {currentOffice.phone}
                      </a>
                    </div>
                  </div>

                  {/* 운영시간 */}
                  <div className="flex items-start gap-4 bg-white/70 backdrop-blur-sm p-5 rounded-2xl border border-purple-50">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center shadow-sm">
                      <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-pink-400 mb-1">운영시간</h3>
                      <p className="text-base text-gray-800 font-medium">평일 09:00 - 18:00</p>
                      <p className="text-sm text-gray-500 mt-1">주말 및 공휴일 휴무</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-gray-900 to-black text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-[1040px] px-6 md:px-12 mx-auto relative z-10">
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              방문 전 상담 예약을<br />권장합니다
            </h2>
            <p className="text-lg md:text-xl mb-10 text-white/80 leading-relaxed max-w-2xl mx-auto">
              더 나은 상담을 위해 사전 예약 후 방문해 주세요
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => setIsTalkModalOpen(true)}
                className="inline-flex items-center gap-2 px-8 py-3 md:px-10 md:py-4 bg-white text-gray-900 font-bold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-xl text-sm md:text-base"
              >
                상담 문의하기
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
