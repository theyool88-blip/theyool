import Link from 'next/link';

interface ResourceCardProps {
  icon: string;
  title: string;
  description: string;
  ctaText: string;
  ctaHref: string;
}

export default function ResourceCard({
  icon,
  title,
  description,
  ctaText,
  ctaHref,
}: ResourceCardProps) {
  return (
    <Link
      href={ctaHref}
      className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-gray-900"
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-4 leading-relaxed">{description}</p>
      <div className="flex items-center gap-2 text-blue-600 font-semibold group-hover:underline">
        {ctaText}
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}
