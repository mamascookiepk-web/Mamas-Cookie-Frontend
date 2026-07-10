import { Star } from 'lucide-react';

function renderQuote(quote) {
  return quote.split(/\*\*(.*?)\*\*/g).map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-bold text-white">
        {part}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export default function TestimonialCard({ testimonial }) {
  const { name, role, quote, rating, avatarInitials } = testimonial;

  return (
    <div className="flex w-[300px] shrink-0 snap-start flex-col rounded-2xl bg-white/10 p-6 backdrop-blur-sm sm:w-[420px] sm:p-8">
      <div className="flex items-start justify-between">
        <span className="font-heading text-4xl leading-none text-white/30">&ldquo;</span>
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={16}
              className={i < rating ? 'fill-amber-400 text-amber-400' : 'text-white/30'}
            />
          ))}
        </div>
      </div>

      <p className="mt-4 flex-1 text-sm leading-relaxed text-white/90 sm:text-base">
        {renderQuote(quote)}
      </p>

      <div className="mt-6 flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20 text-sm font-bold text-white">
          {avatarInitials}
        </div>
        <div>
          <p className="text-sm font-bold text-white">{name}</p>
          <p className="text-xs text-white/70">{role}</p>
        </div>
      </div>
    </div>
  );
}
