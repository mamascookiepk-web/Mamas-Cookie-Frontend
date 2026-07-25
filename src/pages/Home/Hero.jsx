import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <h1 className="font-heading text-4xl font-extrabold leading-tight text-ink-900 sm:text-5xl">
            Baked with Love.
            <br />
            Just like{' '}
            <span className="italic text-primary-500">. mamas.</span>
            <br />
            Cookie
          </h1>

          <p className="mt-5 max-w-md text-sm text-ink-500 sm:text-base">
            Our treats are baked from scratch &amp; fresh every day, just for you. Start your local
            delivery or pickup order now.
          </p>

          <Link
            to="/local"
            className="mt-8 inline-flex items-center justify-center rounded-lg bg-primary-500 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-primary-600"
          >
            Order Now
          </Link>
        </div>

        <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-primary-50 sm:aspect-[16/11] lg:aspect-[5/4]">
          <img
            src="/images/home-hero.jpg"
            alt="Mama's Cookie fresh baked treats"
            className="h-full w-full object-cover object-bottom"
          />
        </div>
      </div>
    </section>
  );
}
