import { useState } from 'react';
import { Play } from 'lucide-react';
import StoryVideoModal from './StoryVideoModal';

const CLIP_SETS = [
  {
    label: 'Stall Day',
    videos: [
      '/videos/story/stoy-stall-day-1.mp4',
      '/videos/story/stoy-stall-day-2.mp4',
      '/videos/story/stoy-stall-day-3.mp4',
    ],
  },
  {
    label: '3AM Dough',
    videos: ['/videos/story/story-3AM-dough-1.mp4', '/videos/story/story-3AM-dough-2.mp4'],
  },
  {
    label: 'Packing Night',
    videos: ['/videos/story/stoy-packing-night-1.mp4'],
  },
  {
    label: 'Customer Reactions',
    videos: ['/videos/story/story-customer-reaction-1.mp4'],
  },
  {
    label: 'NASCON Highlights',
    videos: [
      '/videos/story/story-nascon-1.mp4',
      '/videos/story/story-nascon-2.mp4',
      '/videos/story/story-nascon-3.mp4',
    ],
  },
  {
    label: 'Kitchen Diaries',
    videos: [
      '/videos/story/story-kitchen-highlights-1.mp4',
      '/videos/story/story-kitchen-highlights-2.mp4',
      '/videos/story/story-kitchen-highlights-3.mp4',
    ],
  },
];

export default function StoryVideoGallery() {
  const [activeSet, setActiveSet] = useState(null);

  return (
    <section className="bg-surface-muted py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-primary-600">Behind The Dough</span>
          <h2 className="mt-3 font-heading text-3xl font-extrabold text-ink-900 sm:text-4xl">
            Real moments, straight from the kitchen
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-ink-500 sm:text-base">
            Stall days, late-night bakes, and everything in between — tap a card to watch.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {CLIP_SETS.map((set) => {
            const hasVideos = set.videos.length > 0;
            return (
              <button
                key={set.label}
                type="button"
                disabled={!hasVideos}
                onClick={() => setActiveSet(set)}
                className={`group relative aspect-[9/16] overflow-hidden rounded-2xl bg-gradient-to-b from-primary-100 to-primary-200 text-left ${
                  hasVideos ? 'cursor-pointer' : 'cursor-default'
                }`}
              >
                {hasVideos && (
                  <>
                    <video
                      src={`${set.videos[0]}#t=0.5`}
                      muted
                      playsInline
                      preload="metadata"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/35" />
                  </>
                )}

                <div className="relative flex h-full w-full flex-col items-center justify-center gap-2 text-primary-500">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 shadow transition-transform group-hover:scale-110">
                    <Play size={16} className="ml-0.5 fill-primary-600 text-primary-600" />
                  </span>
                  <span
                    className={`text-[11px] font-bold uppercase tracking-wide ${
                      hasVideos ? 'text-white drop-shadow' : 'text-primary-600'
                    }`}
                  >
                    {hasVideos ? `${set.videos.length} Clips` : 'Coming Soon'}
                  </span>
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-900/70 to-transparent p-3">
                  <p className="text-xs font-bold text-white">{set.label}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {activeSet && (
        <StoryVideoModal
          title={activeSet.label}
          clips={activeSet.videos}
          onClose={() => setActiveSet(null)}
        />
      )}
    </section>
  );
}
