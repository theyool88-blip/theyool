'use client';

interface PillarAccordionProps {
  number: string;
  title: string;
  description: string;
  icon: string;
  color: 'blue' | 'green' | 'amber' | 'pink';
  strategies: string[];
  isExpanded: boolean;
  onToggle: () => void;
}

const colorMap = {
  blue: {
    badge: 'bg-blue-50 text-blue-700',
    border: 'border-blue-200',
    hoverBorder: 'hover:border-blue-600',
    check: 'bg-blue-50 text-blue-600',
  },
  green: {
    badge: 'bg-green-50 text-green-700',
    border: 'border-green-200',
    hoverBorder: 'hover:border-green-600',
    check: 'bg-green-50 text-green-600',
  },
  amber: {
    badge: 'bg-amber-50 text-amber-700',
    border: 'border-amber-200',
    hoverBorder: 'hover:border-amber-600',
    check: 'bg-amber-50 text-amber-600',
  },
  pink: {
    badge: 'bg-pink-50 text-pink-700',
    border: 'border-pink-200',
    hoverBorder: 'hover:border-pink-600',
    check: 'bg-pink-50 text-pink-600',
  },
};

export default function PillarAccordion({
  number,
  title,
  description,
  icon,
  color,
  strategies,
  isExpanded,
  onToggle,
}: PillarAccordionProps) {
  const colors = colorMap[color];

  return (
    <div
      className={`bg-white rounded-2xl p-6 md:p-8 border-2 ${colors.border} ${colors.hoverBorder} transition-all duration-300 ${
        isExpanded ? 'shadow-xl' : 'shadow-sm'
      }`}
    >
      {/* Header - Always Visible */}
      <button
        onClick={onToggle}
        className="w-full text-left flex items-start justify-between gap-4"
        aria-expanded={isExpanded}
      >
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">{icon}</span>
            <span className={`inline-block px-3 py-1 ${colors.badge} text-xs font-semibold rounded-full`}>
              {number}
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-sm md:text-base text-gray-600 leading-relaxed">{description}</p>
        </div>

        {/* Arrow Icon */}
        <svg
          className={`w-6 h-6 text-gray-400 flex-shrink-0 transition-transform duration-300 ${
            isExpanded ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Expandable Content */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isExpanded ? 'max-h-[1000px] opacity-100 mt-4' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="pt-4 border-t border-gray-200">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">주요 전략:</h4>
          <ul className="space-y-2">
            {strategies.map((strategy, index) => (
              <li key={index} className="flex items-start gap-3">
                <span
                  className={`flex-shrink-0 w-5 h-5 rounded-full ${colors.check} flex items-center justify-center text-xs mt-0.5`}
                >
                  ✓
                </span>
                <span className="text-sm text-gray-600">{strategy}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
