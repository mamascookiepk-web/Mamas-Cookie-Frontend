import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { useWeeklyDrop } from '@/hooks/useWeeklyDrop';

const AUTO_ROTATE_MS = 4000;

export default function LocalHeroCarousel() {
  const { items: images, status, fetchWeeklyDrop } = useWeeklyDrop();
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef(null);
  // this is the vaiable 
  useEffect(() => {
    fetchWeeklyDrop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startTimer = () => {
    clearInterval(intervalRef.current);
    if (images.length <= 1) return;
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, AUTO_ROTATE_MS);
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images.length]);

  const goTo = (index) => {
    setActiveIndex((index + images.length) % images.length);
    startTimer();
  };

  if (status === 'loading') {
    return <section className="h-[320px] bg-primary-50 sm:h-[420px]" />;
  }

  if (images.length === 0) {
    return (
      <section className="flex h-[320px] items-center justify-center bg-primary-50 sm:h-[420px]">
        <div className="flex flex-col items-center gap-2 text-primary-300">
          <ImageIcon size={40} strokeWidth={1.5} />
          <span className="text-sm font-medium">No weekly drop images yet</span>
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-[320px] overflow-hidden bg-primary-50 sm:h-[420px]">
      {images.map((image, index) => (
        <div
          key={image.id}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === activeIndex ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
        >
          <img
            src={image.url}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full scale-110 object-cover object-center blur-2xl"
          />
          <div className="absolute inset-0 bg-ink-900/20" />
          <img
            src={image.url}
            alt={`Weekly drop ${index + 1}`}
            className="relative h-full w-full object-contain object-center"
          />
        </div>
      ))}

      {images.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => goTo(activeIndex - 1)}
            className="absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-primary-600 text-white shadow-md transition-colors hover:bg-primary-700"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => goTo(activeIndex + 1)}
            className="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-primary-600 text-white shadow-md transition-colors hover:bg-primary-700"
          >
            <ChevronRight size={20} />
          </button>

          <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
            {images.map((image, index) => (
              <button
                key={image.id}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => goTo(index)}
                className={`h-2 rounded-full transition-all ${
                  index === activeIndex ? 'w-6 bg-primary-600' : 'w-2 bg-primary-200'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
