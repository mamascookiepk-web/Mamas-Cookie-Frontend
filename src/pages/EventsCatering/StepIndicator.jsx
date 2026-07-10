import { Check } from 'lucide-react';

const STEPS = ['Contact', 'Event', 'Review'];

export default function StepIndicator({ currentStep }) {
  return (
    <div className="flex items-center justify-center">
      {STEPS.map((label, index) => {
        const step = index + 1;
        const isCompleted = step < currentStep;
        const isActive = step === currentStep;

        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full border-2 ${
                  isCompleted
                    ? 'border-primary-500 bg-primary-500 text-white'
                    : isActive
                      ? 'border-primary-500 bg-white'
                      : 'border-gray-300 bg-white'
                }`}
              >
                {isCompleted ? (
                  <Check size={16} />
                ) : (
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      isActive ? 'bg-primary-500' : 'bg-gray-300'
                    }`}
                  />
                )}
              </div>
              <span
                className={`mt-2 text-xs font-bold ${
                  isCompleted || isActive ? 'text-primary-600' : 'text-ink-400'
                }`}
              >
                {label}
              </span>
            </div>

            {step < STEPS.length && (
              <div
                className={`mb-5 h-0.5 w-16 sm:w-24 ${
                  step < currentStep ? 'bg-primary-500' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
