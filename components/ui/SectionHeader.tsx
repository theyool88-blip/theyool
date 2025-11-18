interface SectionHeaderProps {
  label: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export default function SectionHeader({
  label,
  title,
  subtitle,
  align = 'center',
  className = ''
}: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left';
  const subtitleAlignClass = align === 'center' ? 'mx-auto' : '';

  return (
    <div className={`mb-12 ${alignClass} ${className}`}>
      <p className="text-xs md:text-sm text-blue-600/70 mb-3 tracking-[0.2em] uppercase">
        {label}
      </p>
      <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base md:text-lg text-gray-600 font-light max-w-2xl leading-relaxed ${subtitleAlignClass}">
          {subtitle}
        </p>
      )}
    </div>
  );
}
