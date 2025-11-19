interface TimelineStepProps {
  stepNumber: number;
  title: string;
  duration: string;
  description: string;
  deliverables: string[];
  isLast?: boolean;
}

export default function TimelineStep({
  stepNumber,
  title,
  duration,
  description,
  deliverables,
  isLast = false,
}: TimelineStepProps) {
  return (
    <div className="relative flex gap-6 mb-12 last:mb-0">
      {/* Number Circle */}
      <div className="flex-shrink-0 relative z-10">
        <div className="w-16 h-16 bg-gray-900 text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">
          {stepNumber}
        </div>
        {/* Connecting Line */}
        {!isLast && (
          <div className="absolute left-1/2 top-16 w-0.5 h-full bg-gradient-to-b from-gray-300 via-gray-200 to-transparent transform -translate-x-1/2"></div>
        )}
      </div>

      {/* Content Card */}
      <div className="flex-1 bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200">
        <div className="flex items-center gap-3 mb-3">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900">{title}</h3>
          <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-semibold">
            {duration}
          </span>
        </div>

        <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-4">{description}</p>

        {deliverables.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-2">주요 활동:</h4>
            <ul className="space-y-2">
              {deliverables.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
