import { Users, RefreshCw, Award } from 'lucide-react';

const VALUES = [
  {
    icon: Users,
    title: 'A family dream',
    description:
      'A mother, her three sons, no investors, no big funding. Every batch, delivery and stall was built by hand — together.',
  },
  {
    icon: RefreshCw,
    title: 'Every rupee reinvested',
    description:
      'We made one rule from day one: no money leaves the business. Everything earned goes back into machinery, packaging, and growth.',
  },
  {
    icon: Award,
    title: 'Consistency obsessed',
    description:
      'The goal was never just a cookie — it was a premium dessert experience, tasting exactly as good on order 10,000 as it did on order one.',
  },
];

export default function StoryValues() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {VALUES.map(({ icon: Icon, title, description }) => (
          <div key={title} className="rounded-2xl bg-surface-muted p-7 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-primary-500 text-white">
              <Icon size={24} strokeWidth={1.75} />
            </div>
            <h3 className="mt-5 font-heading text-lg font-bold text-ink-900">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-500">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
