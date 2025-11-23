'use client';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps?: number;
}

export default function ProgressIndicator({
  currentStep,
  totalSteps = 4
}: ProgressIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-2 mb-6">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const step = index + 1;
        const isActive = currentStep === step;
        const isCompleted = currentStep > step;

        return (
          <div
            key={step}
            className={`
              h-2 rounded-full transition-all duration-300
              ${isActive ? 'w-12 bg-amber-600' : 'w-2'}
              ${isCompleted ? 'bg-emerald-600' : ''}
              ${!isActive && !isCompleted ? 'bg-gray-200' : ''}
            `}
            role="progressbar"
            aria-valuenow={currentStep}
            aria-valuemin={1}
            aria-valuemax={totalSteps}
          >
            <span className="sr-only">
              {totalSteps}단계 중 {currentStep}단계
            </span>
          </div>
        );
      })}
    </div>
  );
}
