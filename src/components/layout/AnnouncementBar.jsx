const MESSAGE = 'All orders are processed and dispatched the next day. Orders placed on weekends are dispatched on Monday.';

export default function AnnouncementBar() {
  return (
    <div className="overflow-hidden bg-ink-900 py-2 text-white">
      <div className="flex w-max animate-marquee whitespace-nowrap">
        {[0, 1].map((i) => (
          <div key={i} className="flex shrink-0 items-center">
            {Array.from({ length: 4 }).map((_, idx) => (
              <span key={idx} className="mx-8 text-xs font-medium tracking-wide sm:text-sm">
                {MESSAGE}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
