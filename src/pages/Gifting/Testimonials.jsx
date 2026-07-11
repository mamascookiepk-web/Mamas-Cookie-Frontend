import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import TestimonialCard from '@/components/common/TestimonialCard';

// TODO: replace with testimonials fetched from the backend once that endpoint exists.
const DUMMY_TESTIMONIALS = [
  {
    name: 'Shazya',
    role: 'Key Recruiter, Dignos',
    avatarInitials: 'S',
    rating: 5,
    quote:
      "Ordered Mama's Cookie's corporate gift boxes for New Year's absolute **GAME CHANGER!** Their team was fast, efficient, and **delivered cookie perfection**. Our clients are still raving about them! If you want corporate gifts that impress, Mama's Cookie is the way to go!",
  },
  {
    name: 'Fatima Khan',
    role: 'Marketing Manager, Hive Solutions',
    avatarInitials: 'FK',
    rating: 5,
    quote:
      "**Mama's Cookie nailed it** for our team's milestone celebration. Their coordination was smooth, delivery was right on schedule, and the cookies were out of this world. It's rare to find a gifting partner this dependable and delicious!",
  },
  {
    name: 'Bilal Shaik',
    role: 'Marketing Manager',
    avatarInitials: 'BS',
    rating: 5,
    quote:
      "We needed gifts for our clients and gave Mama's Cookie a try—best decision ever! Our clients loved them! If you're looking for delicious, memorable gifts for employees or clients, Mama's Cookie is the best.",
  },
  {
    name: 'Ayesha Raza',
    role: 'HR Lead, Nexlify',
    avatarInitials: 'AR',
    rating: 5,
    quote:
      "Our onboarding kits felt so much warmer with Mama's Cookie's cookie boxes inside. **New hires loved the personal touch**, and the packaging looked premium enough for any corporate event.",
  },
  {
    name: 'Omar Farooq',
    role: 'Founder, Loopstack',
    avatarInitials: 'OF',
    rating: 5,
    quote:
      "We've reordered three times now for client appreciation gifts. **Consistent quality, reliable delivery**, and every recipient asks where the cookies are from!",
  },
];

const CARD_WIDTH = 420;
const CARD_GAP = 24;

export default function Testimonials() {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = (index) => {
    const clamped = Math.max(0, Math.min(index, DUMMY_TESTIMONIALS.length - 1));
    scrollRef.current?.scrollTo({ left: clamped * (CARD_WIDTH + CARD_GAP), behavior: 'smooth' });
    setActiveIndex(clamped);
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const index = Math.round(scrollRef.current.scrollLeft / (CARD_WIDTH + CARD_GAP));
    setActiveIndex(Math.max(0, Math.min(index, DUMMY_TESTIMONIALS.length - 1)));
  };

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
        </div>

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="mt-10 flex gap-6 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {DUMMY_TESTIMONIALS.map((testimonial) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} />
          ))}
        </div>

        <div className="mt-6 flex items-center gap-2">
          {DUMMY_TESTIMONIALS.map((testimonial, index) => (
            <button
              key={testimonial.name}
              type="button"
              aria-label={`Go to testimonial ${index + 1}`}
              onClick={() => scrollToIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === activeIndex ? 'w-8 bg-white' : 'w-2 bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
