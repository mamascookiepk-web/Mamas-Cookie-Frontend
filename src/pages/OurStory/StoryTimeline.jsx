import { Cookie, Palette, FlaskConical, Flag, Rocket, Factory, Store, Trophy } from 'lucide-react';

const MILESTONES = [
  {
    icon: Cookie,
    tag: 'January',
    title: '"Mama ke Cookies"',
    description:
      'It started from a simple home oven — made only for family, friends and neighbours. They tasted them, loved them, and asked for more. Nobody called it a brand yet. They just called it "Mama ke cookies."',
  },
  {
    icon: Palette,
    tag: 'February',
    title: 'A brand comes to life',
    description:
      'Our first real packaging was made and the logo came to life. For the first time, it stopped feeling like a hobby — it started feeling like it could be our identity.',
  },
  {
    icon: FlaskConical,
    tag: 'March',
    title: 'Perfecting the recipe',
    description:
      'A mother-son baking chemistry, built since childhood school competitions. We tested sweetness levels, tried new ingredients, failed, and started again — again, and again — sourcing premium ingredients from across Pakistan.',
  },
  {
    icon: Flag,
    tag: 'April',
    title: 'The rebrand — and a phone sold for a stall',
    description:
      'Orange became red. New logo, new packaging, a bigger vision. That same month, a phone was sold — not for luxury, but to build our first proper stall: Rs. 50,000 for the setup, millions in the vision behind it.',
  },
  {
    icon: Rocket,
    tag: 'NASCON 2025 · FAST-NUCES',
    title: 'Compared to the biggest names',
    description:
      'No big budget, no loudest branding — just confession walls, real engagement, and effort people could taste. Our cookies were suddenly being compared to some of Pakistan\'s biggest dessert brands.',
  },
  {
    icon: Factory,
    tag: 'Scaling Up',
    title: 'A drawing room becomes a factory',
    description:
      'Sofas sold, furniture removed, comfort sacrificed. Commercial mixers, deep freezers and ovens moved in. Because a real brand isn\'t built on luck — it\'s built on consistency, every single batch.',
  },
  {
    icon: Store,
    tag: 'Roots IVY',
    title: 'Our first kiosk',
    description:
      'Instead of waiting for the perfect café, we built a small kiosk — and it taught us operations before expansion, pressure before fame, systems before scale.',
  },
  {
    icon: Trophy,
    tag: 'January 2026',
    title: '"Best cookies in Islamabad"',
    description:
      'Our first physical store launched. Word of mouth grew fast, food bloggers reviewed us, and Mama\'s Cookie started being called the number one in the Twin Cities.',
  },
];

export default function StoryTimeline() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:py-20">
      <div className="text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-primary-600">The Journey</span>
        <h2 className="mt-3 font-heading text-3xl font-extrabold text-ink-900 sm:text-4xl">
          From a home oven to a movement
        </h2>
      </div>

      <div className="relative mt-14">
        <div className="absolute left-5 top-0 h-full w-px bg-primary-100 sm:left-1/2 sm:-translate-x-1/2" />

        <div className="space-y-10">
          {MILESTONES.map(({ icon: Icon, tag, title, description }, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={title}
                className={`relative flex items-start gap-6 sm:gap-0 ${
                  isEven ? 'sm:flex-row' : 'sm:flex-row-reverse'
                }`}
              >
                <div
                  className={`hidden flex-1 sm:block ${isEven ? 'text-right pr-10' : 'text-left pl-10'}`}
                >
                  <TimelineCard tag={tag} title={title} description={description} align={isEven ? 'right' : 'left'} />
                </div>

                <div className="absolute left-5 z-10 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full bg-primary-500 text-white ring-4 ring-primary-50 sm:left-1/2">
                  <Icon size={16} strokeWidth={2} />
                </div>

                <div className="flex-1 pl-14 sm:hidden">
                  <TimelineCard tag={tag} title={title} description={description} align="left" />
                </div>

                <div className="hidden flex-1 sm:block" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function TimelineCard({ tag, title, description, align }) {
  return (
    <div className={`inline-block max-w-md rounded-2xl bg-surface-muted p-5 text-left shadow-sm ${align === 'right' ? 'sm:text-right' : ''}`}>
      <span className="text-xs font-bold uppercase tracking-wide text-primary-600">{tag}</span>
      <h3 className="mt-1 font-heading text-lg font-bold text-ink-900">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-500">{description}</p>
    </div>
  );
}
