'use client';

import { useState } from 'react';
import Modal from '@/components/ui/Modal';
import ConsultationForm from './ConsultationForm';

interface ConsultationButtonProps {
  variant?: 'premium' | 'primary' | 'secondary' | 'outline';
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
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    setIsOpen(true);
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
      <>
        <button
          onClick={handleClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
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

        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} maxWidth="lg">
          <ConsultationForm onCancel={() => setIsOpen(false)} />
        </Modal>
      </>
    );
  }

  // 기본 variant들 (기존 스타일 유지)
  const baseStyles = 'font-semibold rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed';
  const variantStyles = {
    primary: 'bg-[var(--accent)] text-white hover:bg-[var(--accent-dark)] hover:scale-[1.02]',
    secondary: 'bg-white text-[var(--accent)] hover:bg-[var(--gray-50)]',
    outline: 'border-2 border-[var(--gray-700)] text-[var(--gray-900)] hover:bg-[var(--gray-900)] hover:text-white hover:border-[var(--gray-900)]',
  };

  return (
    <>
      <button
        onClick={handleClick}
        className={`${baseStyles} ${variantStyles[variant as 'primary' | 'secondary' | 'outline']} ${sizeStyles[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      >
        상담문의
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} maxWidth="lg">
        <ConsultationForm onCancel={() => setIsOpen(false)} />
      </Modal>
    </>
  );
}
