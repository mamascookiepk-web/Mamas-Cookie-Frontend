import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Volume2, VolumeX } from 'lucide-react';

export default function StoryHero() {
  const [muted, setMuted] = useState(true);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-700 to-primary-600 text-white">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/5 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-white/5 blur-2xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary-100">
              Our Story
            </span>

            <h1 className="mt-5 font-heading text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
              Can Pakistan build the world&apos;s biggest cookie brand?
            </h1>

            <p className="mt-4 max-w-xl text-sm italic text-primary-100 sm:text-base">
              Not just sugar disguised as a cookie. We&apos;re looking at you, Crumbl.
            </p>

            <p className="mt-6 max-w-xl text-sm leading-relaxed text-primary-50 sm:text-base">
              Sounds crazy, right? But every crazy dream starts somewhere. Mama&apos;s Cookie didn&apos;t
              start in a fancy café, a franchise, or with investors and big funding. It started with
              just a mother, her three sons, a home oven, and one obsession &mdash; to create the
              perfect cookie.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/local"
                className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-bold uppercase tracking-wide text-primary-700 transition-colors hover:bg-primary-50"
              >
                Order Now
              </Link>
              <a
                href="#story-video"
                className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:text-primary-100"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
                  <Play size={14} className="ml-0.5 fill-white" />
                </span>
                Watch The Story
              </a>
            </div>
          </div>

          <div className="mx-auto w-full max-w-xs">
            <div className="relative aspect-[9/16] overflow-hidden rounded-[2rem] border border-white/20 bg-white/5 shadow-2xl backdrop-blur-sm">
              <video
                src="/videos/story/story-hero.mp4"
                autoPlay
                loop
                muted={muted}
                playsInline
                className="h-full w-full object-cover"
              />

              <button
                type="button"
                onClick={() => setMuted((prev) => !prev)}
                aria-label={muted ? 'Unmute video' : 'Mute video'}
                className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
              >
                {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>

              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-5">
                <p className="text-xs font-bold uppercase tracking-wide text-white">Mama&apos;s Cookie</p>
                <p className="text-[11px] text-primary-100">From a home oven to Islamabad&apos;s favourite</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
