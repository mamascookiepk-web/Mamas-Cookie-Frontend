import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import TestimonialCard from '@/components/common/TestimonialCard';
import { useTestimonials } from '@/hooks/useTestimonials';

const CARD_WIDTH = 420;
const CARD_GAP = 24;

const initials = (name) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');

export default function Testimonials() {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { items, status, fetchTestimonials } = useTestimonials();

  useEffect(() => {
    fetchTestimonials();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const testimonials = items.map((t) => ({
    id: t.id,
    name: t.name,
    role: `${t.position}, ${t.companyName}`,
    avatarInitials: initials(t.name),
    rating: t.rating,
    quote: t.reviewText,
  }));

  const scrollToIndex = (index) => {
    const clamped = Math.max(0, Math.min(index, testimonials.length - 1));
    scrollRef.current?.scrollTo({ left: clamped * (CARD_WIDTH + CARD_GAP), behavior: 'smooth' });
    setActiveIndex(clamped);
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const index = Math.round(scrollRef.current.scrollLeft / (CARD_WIDTH + CARD_GAP));
    setActiveIndex(Math.max(0, Math.min(index, testimonials.length - 1)));
  };

  if (status !== 'loading' && testimonials.length === 0) {
    return null;
  }

  return (
    <section className="bg-gradient-to-br from-primary-900 to-primary-700 py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-primary-200">
              Our Clients
            </p>
            <h2 className="mt-2 font-heading text-3xl font-extrabold leading-tight text-white sm:text-4xl">
              Trusted by Teams
              <br />
              <span className="italic">Across Pakistan</span>
            </h2>
          </div>

          <p className="max-w-xl text-sm text-primary-100 sm:text-base lg:mt-1">
            From corporate holiday gifts to client appreciation boxes, Mama&apos;s Cookie has
            become the go-to for companies that want to leave a lasting (and delicious)
            impression.
          </p>

          {testimonials.length > 1 && (
            <div className="hidden shrink-0 items-center gap-3 sm:flex">
              <button
                type="button"
                aria-label="Previous testimonial"
                onClick={() => scrollToIndex(activeIndex - 1)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 text-white transition-colors hover:bg-white/10"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                aria-label="Next testimonial"
                onClick={() => scrollToIndex(activeIndex + 1)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 text-white transition-colors hover:bg-white/10"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>

        {status === 'loading' ? (
          <p className="mt-10 text-sm text-primary-100">Loading reviews...</p>
        ) : (
          <>
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="mt-10 flex gap-6 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>

            {testimonials.length > 1 && (
              <div className="mt-6 flex items-center gap-2">
                {testimonials.map((testimonial, index) => (
                  <button
                    key={testimonial.id}
                    type="button"
                    aria-label={`Go to testimonial ${index + 1}`}
                    onClick={() => scrollToIndex(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === activeIndex ? 'w-8 bg-white' : 'w-2 bg-white/40'
                    }`}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
