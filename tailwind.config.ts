import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // 법무법인 더율 - 임신 앱 스타일 파스텔 색상 팔레트
        sage: {
          50: '#F0F9F7',
          100: '#E8F5F2',
          200: '#D1EBE5',
          300: '#B3DDD4',
          400: '#8CCABE',
          500: '#6DB5A4',  // Primary Sage Green (임신 앱 메인 컬러)
          600: '#5A9988',
          700: '#487A6C',
          800: '#365B51',
          900: '#243D36',
        },
        coral: {
          50: '#FEF7F8',
          100: '#FDEFF1',
          200: '#FBD9DF',
          300: '#F8BECB',
          400: '#F6A4B7',
          500: '#F4A5B0',  // Accent Coral Pink (임신 앱 보조 컬러)
          600: '#EF7E90',
          700: '#E85A72',
          800: '#D13C5A',
          900: '#A12E45',
        },
        cream: {
          50: '#FEFEFE',
          100: '#FAFAFA',  // Main background (임신 앱 배경)
          200: '#F5F5F5',
          300: '#F0F0F0',
          400: '#EBEBEB',
          500: '#E5E5E5',
          600: '#D9D9D9',
          700: '#BFBFBF',
          800: '#999999',
          900: '#666666',
        },
        neutral: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#EFEFEF',
          300: '#DDDDDD',
          400: '#AAAAAA',
          500: '#999999',  // Secondary text
          600: '#777777',
          700: '#666666',
          800: '#333333',  // Primary text
          900: '#1A1A1A',
        },
        lavender: {
          50: '#F9F6FB',
          100: '#F3EDF7',
          200: '#E9DCEF',
          300: '#DCC9E6',
          400: '#CFB5DD',
          500: '#E5D5F0',  // Soft Lavender (카테고리 아이콘)
          600: '#C4A8D6',
          700: '#A37CBC',
          800: '#7E5A9A',
          900: '#5A4070',
        },
        hotpink: {
          50: '#FFF0F3',
          100: '#FFE1E8',
          200: '#FFC3D1',
          300: '#FF9AB3',
          400: '#FF7195',
          500: '#FF6B8A',  // HOT PICK 배지
          600: '#E6517A',
          700: '#CC3A6A',
          800: '#B32659',
          900: '#8C1D45',
        },
        // 기존 색상 유지 (하위 호환성)
        brand: {
          blue: {
            50: '#eff6ff',
            100: '#dbeafe',
            200: '#bfdbfe',
            300: '#93c5fd',
            400: '#60a5fa',
            500: '#3b82f6',
            600: '#2563eb',
            700: '#1d4ed8',
            800: '#1e40af',
            900: '#1e3a8a',
          },
          purple: {
            50: '#faf5ff',
            100: '#f3e8ff',
            200: '#e9d5ff',
            300: '#d8b4fe',
            400: '#c084fc',
            500: '#a855f7',
            600: '#9333ea',
            700: '#7e22ce',
            800: '#6b21a8',
            900: '#581c87',
          },
          amber: {
            50: '#fffbeb',
            100: '#fef3c7',
            200: '#fde68a',
            300: '#fcd34d',
            400: '#fbbf24',
            500: '#f59e0b',
            600: '#d97706',
            700: '#b45309',
            800: '#92400e',
            900: '#78350f',
          },
          pink: {
            50: '#fdf2f8',
            100: '#fce7f3',
            200: '#fbcfe8',
            300: '#f9a8d4',
            400: '#f472b6',
            500: '#ec4899',
            600: '#db2777',
            700: '#be185d',
            800: '#9d174d',
            900: '#831843',
          },
        },
      },
      backgroundImage: {
        'section-light': 'linear-gradient(to bottom, white, rgba(239, 246, 255, 0.15), white)',
        'section-medium': 'linear-gradient(to bottom, rgba(239, 246, 255, 0.3), white)',
        'section-dark': 'linear-gradient(to bottom right, #111827, #1f2937)',
        'section-blue-amber': 'linear-gradient(to bottom, rgba(239, 246, 255, 0.2), white, rgba(254, 243, 199, 0.1))',
      },
    },
  },
  plugins: [],
};

export default config;
