import Link from 'next/link';
import { ReactNode } from 'react';

interface CTABoxProps {
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
}

export default function CTABox({ title, description, children, className = '' }: CTABoxProps) {
  return (
    <div className={`bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 md:p-10 text-center text-white ${className}`}>
      <p className="text-xl md:text-2xl font-bold mb-4">
        {title}
      </p>
      {description && (
        <p className="text-sm md:text-base text-gray-300 mb-8 max-w-xl mx-auto">
          {description}
        </p>
      )}
      {children}
    </div>
  );
}

interface CTAButtonProps {
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  children: ReactNode;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
}

export function CTAButton({ href, onClick, variant = 'primary', children, icon, iconPosition = 'right' }: CTAButtonProps) {
  const baseClasses = "inline-flex items-center gap-2 px-8 py-4 font-semibold rounded-full transition-all duration-300";
  const variantClasses = variant === 'primary'
    ? "bg-white text-gray-900 hover:bg-gray-100 shadow-lg hover:shadow-xl"
    : "bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900";

  const content = (
    <>
      {iconPosition === 'left' && icon}
      {children}
      {iconPosition === 'right' && icon}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={`${baseClasses} ${variantClasses}`}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={`${baseClasses} ${variantClasses}`}>
      {content}
    </button>
  );
}
