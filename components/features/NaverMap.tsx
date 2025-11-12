'use client';

import { useEffect, useRef } from 'react';

interface NaverMapProps {
  latitude: number;
  longitude: number;
  title: string;
  address: string;
}

declare global {
  interface Window {
    naver: any;
  }
}

export default function NaverMap({ latitude, longitude, title, address }: NaverMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    // 네이버 지도 스크립트 로드
    const clientId = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID;

    if (!clientId) {
      console.error('Naver Map Client ID is not set');
      return;
    }

    const script = document.createElement('script');
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${clientId}`;
    script.async = true;

    script.onload = () => {
      if (mapRef.current && window.naver) {
        const location = new window.naver.maps.LatLng(latitude, longitude);

        const mapOptions = {
          center: location,
          zoom: 17,
          zoomControl: true,
          zoomControlOptions: {
            position: window.naver.maps.Position.TOP_RIGHT,
          },
        };

        const map = new window.naver.maps.Map(mapRef.current, mapOptions);
        mapInstanceRef.current = map;

        // 마커 생성
        new window.naver.maps.Marker({
          position: location,
          map: map,
          title: title,
        });

        // 정보창 생성
        const infoWindow = new window.naver.maps.InfoWindow({
          content: `
            <div style="padding: 15px; min-width: 200px;">
              <h3 style="margin: 0 0 8px; font-size: 16px; font-weight: bold;">${title}</h3>
              <p style="margin: 0; font-size: 13px; color: #666;">${address}</p>
            </div>
          `,
        });

        infoWindow.open(map, location);
      }
    };

    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [latitude, longitude, title, address]);

  return (
    <div
      ref={mapRef}
      className="w-full h-full rounded-3xl overflow-hidden"
      style={{ minHeight: '400px' }}
    />
  );
}
