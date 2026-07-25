import { useEffect } from 'react';
import { X, Cookie } from 'lucide-react';
import { useMonthlyDrop } from '@/hooks/useMonthlyDrop';

export default function MonthlyDropModal({ onClose }) {
  const { imageUrl, status, fetchMonthlyDrop } = useMonthlyDrop();

  useEffect(() => {
    fetchMonthlyDrop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/60 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md overflow-hidden rounded-[2rem] bg-white shadow-2xl sm:max-w-lg lg:max-w-xl">
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-ink-700 shadow-lg backdrop-blur transition-colors hover:bg-white hover:text-primary-600"
        >
          <X size={20} />
        </button>

        <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden bg-primary-50">
          {status === 'loading' ? (
            <span className="text-sm font-medium text-primary-300">Loading...</span>
          ) : imageUrl ? (
            <>
              <img src={imageUrl} alt="Monthly drop" className="h-full w-full object-cover" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900/70 via-ink-900/0 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 sm:p-8">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-500 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                    Monthly Drop
                  </span>
                  <h3 className="mt-3 font-heading text-2xl font-extrabold text-white sm:text-3xl">
                    This Month&rsquo;s Special
                  </h3>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center gap-3 text-primary-400">
              <Cookie size={72} strokeWidth={1.5} />
              <span className="text-sm font-medium">No drop image yet</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
