import { Link } from 'react-router-dom';

const CARDS = [
  {
    image: '/images/home-corporate-gifts.jpg',
    title: 'Corporate Gifts',
    description:
      'Treat your team members, impress your clients, or build new connections by sending them our scrumptious cookies.',
    to: '/gifting',
  },
  {
    image: '/images/home-events-and-catering.jpg',
    title: 'Events & Catering',
    description:
      "Add a touch of sweetness to every event with our assorted cookie boxes. Be it a birthday party, conference, or corporate meeting, we've got you covered!",
    to: '/events-catering',
  },
];

export default function FeatureCards() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {CARDS.map(({ image, title, description, to }) => (
          <div
            key={title}
            className="flex flex-col items-center overflow-hidden rounded-2xl bg-surface text-center shadow-sm"
          >
            <div className="h-56 w-full sm:h-64">
              <img src={image} alt={title} className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-col items-center px-8 pb-8 pt-6">
              <h3 className="font-heading text-xl font-bold text-ink-900">{title}</h3>
              <p className="mt-3 max-w-sm text-sm text-ink-500">{description}</p>
              <Link
                to={to}
                className="mt-6 inline-flex items-center justify-center rounded-lg bg-primary-500 px-6 py-2.5 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-primary-600"
              >
                Inquire Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
