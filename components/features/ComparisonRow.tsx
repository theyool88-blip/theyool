interface ComparisonRowProps {
  feature: string;
  typicalValue: string;
  planValue: string;
}

export default function ComparisonRow({ feature, typicalValue, planValue }: ComparisonRowProps) {
  return (
    <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow duration-300 mb-3">
      {/* Mobile: Stacked Layout */}
      <div className="md:hidden">
        <h4 className="font-semibold text-gray-900 mb-3">{feature}</h4>
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <svg className="flex-shrink-0 w-5 h-5 text-gray-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <div>
              <p className="text-xs text-gray-500 mb-1">일반 변호사</p>
              <p className="text-sm text-gray-700">{typicalValue}</p>
            </div>
          </div>
          <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
            <svg className="flex-shrink-0 w-5 h-5 text-blue-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <p className="text-xs text-blue-600 font-semibold mb-1">The Plan</p>
              <p className="text-sm text-gray-900 font-medium">{planValue}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop: 3-Column Layout */}
      <div className="hidden md:grid md:grid-cols-3 md:gap-6 md:items-center">
        <div className="font-semibold text-gray-900">{feature}</div>
        <div className="flex items-start gap-2">
          <svg className="flex-shrink-0 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          <span className="text-sm text-gray-600">{typicalValue}</span>
        </div>
        <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
          <svg className="flex-shrink-0 w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-sm text-gray-900 font-medium">{planValue}</span>
        </div>
      </div>
    </div>
  );
}
