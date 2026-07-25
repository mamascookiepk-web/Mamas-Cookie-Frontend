import { Link } from 'react-router-dom';
import { Home as HomeIcon, Rocket, Store, ArrowRight } from 'lucide-react';
import { useAutoplayInView } from '@/hooks/useAutoplayInView';

const MILESTONES = [
  { icon: HomeIcon, tag: 'Jan 2025', label: 'A Home Oven' },
  { icon: Rocket, tag: 'Apr 2025', label: 'NASCON' },
  { icon: Store, tag: 'Jan 2026', label: 'First Store' },
];

export default function OurStory() {
  const videoRef = useAutoplayInView();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white">
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/5 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-12 h-72 w-72 rounded-full bg-white/5 blur-2xl" />

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.8fr] lg:gap-16">
          <div>
            <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary-100">
              Our Story
            </span>

            <h2 className="mt-5 font-heading text-2xl font-extrabold leading-tight sm:text-3xl lg:text-4xl">
              Can Pakistan build the world&apos;s biggest cookie brand?
            </h2>

            <p className="mt-5 max-w-lg text-sm leading-relaxed text-primary-50 sm:text-base">
              No investors. No franchise. No fancy café. Just a mother, her three sons, and a home
              oven — with one obsession: to create the perfect cookie. What started as
              &ldquo;Mama ke cookies&rdquo; for family and neighbours is now being called the best
              cookies in Islamabad.
            </p>

            <div className="mt-8 flex items-center gap-4 sm:gap-6">
              {MILESTONES.map(({ icon: Icon, tag, label }, index) => (
                <div key={label} className="flex items-center gap-4 sm:gap-6">
                  <div className="flex flex-col items-center gap-2 text-center">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10">
                      <Icon size={18} strokeWidth={1.75} />
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-wide text-primary-100">
                      {tag}
                    </span>
                    <span className="text-xs font-medium text-white">{label}</span>
                  </div>
                  {index < MILESTONES.length - 1 && (
                    <span className="h-px w-6 bg-white/20 sm:w-10" />
                  )}
                </div>
              ))}
            </div>

            <Link
              to="/our-story"
              className="mt-9 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-bold uppercase tracking-wide text-primary-700 transition-colors hover:bg-primary-50"
            >
              Read Our Full Story
              <ArrowRight size={16} />
            </Link>
          </div>

          <Link to="/our-story" className="group mx-auto block w-full max-w-xs">
            <div className="relative aspect-[9/16] overflow-hidden rounded-[2rem] border border-white/20 bg-white/5 shadow-2xl transition-transform duration-300 group-hover:scale-[1.02]">
              <video
                ref={videoRef}
                src="/videos/story/story-hero.mov"
                loop
                muted
                playsInline
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-5">
                <p className="text-xs font-bold uppercase tracking-wide text-white">Watch The Story</p>
                <p className="text-[11px] text-primary-100">From a home oven to Islamabad&apos;s favourite</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
