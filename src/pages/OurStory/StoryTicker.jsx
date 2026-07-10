const MILESTONES = [
  'JAN 2025 — FIRST BAKE FROM A HOME OVEN',
  'FEB 2025 — FIRST LOGO & PACKAGING',
  'APR 2025 — THE REBRAND: ORANGE BECAME RED',
  'APR 2025 — NASCON, FAST-NUCES',
  'A DRAWING ROOM BECOMES A PRODUCTION FACILITY',
  'JAN 2026 — FIRST PHYSICAL STORE',
  '"BEST COOKIES IN ISLAMABAD"',
];

export default function StoryTicker() {
  return (
    <div className="overflow-hidden bg-ink-900 py-2.5 text-white">
      <div className="flex w-max animate-marquee whitespace-nowrap">
        {[0, 1].map((i) => (
          <div key={i} className="flex shrink-0 items-center">
            {MILESTONES.map((item, idx) => (
              <span key={idx} className="mx-6 flex items-center gap-6 text-xs font-bold tracking-wide sm:text-sm">
                {item}
                <span className="text-primary-500">&bull;</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
