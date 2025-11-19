interface PillarPreviewCardProps {
  number: string;
  title: string;
  description: string;
  icon: string;
  color: 'blue' | 'green' | 'amber' | 'pink';
}

const colorMap = {
  blue: {
    border: 'border-blue-200 hover:border-blue-600',
    bg: 'bg-blue-50',
    text: 'text-blue-700',
  },
  green: {
    border: 'border-green-200 hover:border-green-600',
    bg: 'bg-green-50',
    text: 'text-green-700',
  },
  amber: {
    border: 'border-amber-200 hover:border-amber-600',
    bg: 'bg-amber-50',
    text: 'text-amber-700',
  },
  pink: {
    border: 'border-pink-200 hover:border-pink-600',
    bg: 'bg-pink-50',
    text: 'text-pink-700',
  },
};

export default function PillarPreviewCard({
  number,
  title,
  description,
  icon,
  color,
}: PillarPreviewCardProps) {
  const colors = colorMap[color];

  return (
    <div
      className={`flex-shrink-0 w-[280px] md:w-auto bg-white rounded-xl p-4 border-2 ${colors.border} transition-all duration-300`}
    >
      <div className="text-3xl mb-2">{icon}</div>
      <div className={`inline-block px-2 py-1 ${colors.bg} rounded-full text-xs font-semibold mb-2`}>
        <span className={colors.text}>{number}</span>
      </div>
      <h4 className="text-sm font-bold text-gray-900 mb-1">{title}</h4>
      <p className="text-xs text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}
