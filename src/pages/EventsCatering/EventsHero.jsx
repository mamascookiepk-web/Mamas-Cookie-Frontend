import { ChevronDown } from 'lucide-react';

const TAGS = ['Birthdays', 'Weddings', 'Corporate Events', 'Custom Orders'];

export default function EventsHero() {
  const scrollToForm = () => {
    document.getElementById('events-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="aspect-[4/3] overflow-hidden rounded-2xl shadow-lg sm:aspect-[16/11]">
          <img
            src="/images/events-and-catering-hero.jpg"
            alt="Mama's Cookie events and catering spread"
            className="h-full w-full object-cover"
          />
        </div>

        <div>
          <h1 className="font-heading text-4xl font-extrabold text-ink-900 sm:text-5xl">
            Events &amp; <span className="text-primary-600">Catering</span>
          </h1>

          <p className="mt-5 max-w-lg text-sm text-ink-500 sm:text-base">
            From birthday parties to corporate meetings, our treats are the perfect addition to
            any event. Let us handle the dessert table while you enjoy the occasion. We offer
            custom packages to suit your needs.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {TAGS.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-primary-100 px-4 py-2 text-sm font-bold text-primary-600"
              >
                {tag}
              </span>
            ))}
          </div>

          <button
            type="button"
            aria-label="Scroll to inquiry form"
            onClick={scrollToForm}
            className="mt-8 flex h-12 w-12 items-center justify-center rounded-full bg-primary-500 text-white transition-colors hover:bg-primary-600"
          >
            <ChevronDown size={22} />
          </button>
        </div>
      </div>
    </section>
  );
}
