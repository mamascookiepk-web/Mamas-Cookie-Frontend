import { Play } from 'lucide-react';

export default function StoryFeaturedVideo() {
  return (
    <section id="story-video" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16 sm:px-6 lg:py-20">
      <div className="text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-primary-600">The Full Story</span>
        <h2 className="mt-3 font-heading text-3xl font-extrabold text-ink-900 sm:text-4xl">
          From a home oven to Islamabad&apos;s favourite
        </h2>
      </div>

      <div className="relative mt-10 aspect-video overflow-hidden rounded-[2rem] bg-gradient-to-br from-ink-900 via-ink-800 to-primary-900 shadow-2xl">
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 text-white">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm sm:h-20 sm:w-20">
            <Play size={28} className="ml-1 fill-white text-white" />
          </span>
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-primary-200">Long-Form Video</p>
            <p className="mt-1 text-lg font-heading font-bold sm:text-xl">Coming Soon</p>
          </div>
        </div>
      </div>
    </section>
  );
}
