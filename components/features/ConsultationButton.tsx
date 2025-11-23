'use client';

import { useRouter } from 'next/navigation';

interface ConsultationButtonProps {
  variant?: 'premium' | 'primary' | 'secondary' | 'outline' | 'dark' | 'sage';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function ConsultationButton({
  variant = 'premium',
  size = 'md',
  fullWidth = false,
  className = '',
  onClick,
}: ConsultationButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push('/booking');
    if (onClick) {
      onClick();
    }
  };

  // Size styles
  const sizeStyles = {
    sm: 'px-5 py-2 text-xs',
    md: 'px-8 py-3 text-base',
    lg: 'px-10 py-4 text-lg',
  };

  // Premium variant (SKIN1004 스타일 - 미니멀 화이트 버튼)
  if (variant === 'premium') {
    return (
      <button
        onClick={handleClick}
        className={`
          relative
          ${sizeStyles[size]}
          ${fullWidth ? 'w-full' : ''}
          font-medium rounded-md
          bg-white
          text-black
          border-none
          hover:bg-gray-100
          transition-all duration-200
          ${className}
        `}
      >
        <span className="tracking-normal">상담문의</span>
      </button>
    );
  }

  // 기본 variant들 (기존 스타일 유지)
  const baseStyles = 'font-semibold rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed';
  const variantStyles = {
    primary: 'bg-[var(--accent)] text-white hover:bg-[var(--accent-dark)] hover:scale-[1.02]',
    secondary: 'bg-white text-[var(--accent)] hover:bg-[var(--gray-50)]',
    outline: 'border-2 border-[var(--gray-700)] text-[var(--gray-900)] hover:bg-[var(--gray-900)] hover:text-white hover:border-[var(--gray-900)]',
    dark: 'bg-gray-900 text-white hover:bg-gray-800 hover:scale-[1.02]',
    sage: 'bg-sage-600 text-white hover:bg-sage-700 hover:scale-[1.02] shadow-md hover:shadow-lg',
  };

  return (
    <button
      onClick={handleClick}
      className={`${baseStyles} ${variantStyles[variant as 'primary' | 'secondary' | 'outline' | 'dark' | 'sage']} ${sizeStyles[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      상담문의
    </button>
  );
}
