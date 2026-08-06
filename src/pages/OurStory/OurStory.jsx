import { Link } from 'react-router-dom';
import { usePageMeta } from '@/hooks/usePageMeta';

/* Key beats of the journey — mirrors the reference site's milestone map,
   but themed and asset-free so it stays in sync with the brand palette. */
const MILESTONES = [
  { label: "Mama's Kitchen", note: 'Where it all began' },
  { label: 'The School Win', note: 'Beat 30+ groups' },
  { label: '"Mama ke Cookies"', note: 'A nickname is born' },
  { label: 'January 2025', note: 'First production kitchen' },
  { label: 'First Stall', note: 'Universities & events' },
  { label: 'Twin Cities', note: 'A growing community' },
  { label: 'Movable Outlet', note: 'Fresh cookies, anywhere' },
  { label: 'The World', note: 'The dream ahead' },
];

function PullQuote({ children }) {
  return (
    <blockquote className="my-10 border-l-4 border-primary-500 pl-6">
      <p className="font-heading text-2xl font-extrabold leading-snug text-ink-900 sm:text-3xl">
        {children}
      </p>
    </blockquote>
  );
}

function Paragraph({ children }) {
  return <p className="mt-6 text-base leading-relaxed text-ink-600 sm:text-lg">{children}</p>;
}

export default function OurStory() {
  usePageMeta(
    'Our Story',
    "From Mama's kitchen to the world — how a mother and her three sons turned “Mama ke cookies” into a dream to build Pakistan's biggest dessert brand."
  );

  return (
    <div className="bg-surface">
      {/* ---- Hero: white band so it blends with the image background ---- */}
      <section className="relative overflow-hidden bg-surface">
        <div className="relative mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:py-20">
          {/* ---- Content on top ---- */}
          <p className="font-heading text-sm font-bold italic text-primary-600">
            Baking smiles, one cookie at a time.
          </p>

          <h1 className="mt-4 font-heading text-4xl font-extrabold leading-[1.1] tracking-tight text-ink-900 sm:text-5xl lg:text-6xl">
            From Mama&apos;s Kitchen to the World
          </h1>

          <p className="mt-4 text-lg font-semibold text-primary-600 sm:text-xl">
            A dream born in Pakistan.
          </p>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ink-600 sm:text-lg">
            Years before the brand existed, Mama&apos;s kitchen was where we spent time
            together &mdash; mixing batter, experimenting with flavours and turning simple
            ingredients into desserts people remembered.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/local"
              className="inline-flex items-center justify-center rounded-full bg-primary-600 px-7 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-primary-700"
            >
              Order Now
            </Link>
            <a
              href="#story-body"
              className="inline-flex items-center justify-center rounded-full border border-primary-200 px-7 py-3 text-sm font-bold uppercase tracking-wide text-primary-700 transition-colors hover:bg-primary-100"
            >
              Read The Story
            </a>
          </div>

          {/* ---- Image below ---- */}
          <div className="relative mx-auto mt-14 w-full max-w-3xl">
            <img
              src="/images/story.png"
              alt="Mama's Cookie — freshly baked cookies"
              className="w-full"
              loading="eager"
            />
          </div>
        </div>
      </section>

      {/* ---- Journey strip: the milestone map, themed ---- */}
      <section className="border-y border-primary-100 bg-surface-muted">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <h2 className="text-center font-heading text-xs font-bold uppercase tracking-[0.3em] text-primary-600">
            The Journey So Far
          </h2>
          <ol className="mt-8 flex flex-nowrap gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-4 sm:overflow-visible lg:grid-cols-7">
            {MILESTONES.map((m, i) => (
              <li
                key={m.label}
                className="flex min-w-[8.5rem] flex-1 flex-col items-center text-center"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-600 font-heading text-sm font-bold text-white">
                  {i + 1}
                </span>
                <span className="mt-3 font-heading text-sm font-bold text-ink-900">{m.label}</span>
                <span className="mt-1 text-xs text-ink-400">{m.note}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---- Narrative body ---- */}
      <section id="story-body" className="bg-surface">
        <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-24">
          <Paragraph>
            That passion became real when one of our desserts won a school competition against more
            than 30 groups. It taught us an important lesson: a dessert does not have to be
            complicated to be unforgettable. It simply needs premium ingredients, perfectly balanced
            flavours and Mama&apos;s touch.
          </Paragraph>

          <Paragraph>
            Later, Mama began making small, cookie-sized desserts for family, friends and
            neighbours. People loved them, shared them and kept asking for more. Around the house,
            everyone naturally started calling them &ldquo;Mama ke cookies.&rdquo;
          </Paragraph>

          <PullQuote>That simple nickname gave us our name: Mama&apos;s Cookie.</PullQuote>

          <Paragraph>
            In January 2025, we decided to see how far that name could go. Our home kitchen became
            our first production space. Mama developed the recipes while her three sons took turns
            mixing, baking, packing and delivering every order.
          </Paragraph>

          <Paragraph>
            There were late nights, failed batches and countless experiments &mdash; but every
            challenge brought us closer to creating the cookie we had imagined.
          </Paragraph>

          <p className="mt-10 font-heading text-xl font-bold text-primary-600">
            Then came our first university stall.
          </p>

          <Paragraph>
            Watching people gather around our counter, taste the cookies and return for another made
            us realize that this was no longer just a home-baking project. The cookies sold, word
            began to spread and invitations from more universities, schools and events started
            arriving.
          </Paragraph>

          <Paragraph>
            One stall became many, and Mama&apos;s Cookie began building a community across Islamabad
            and Rawalpindi. That was when we saw its true potential.
          </Paragraph>

          <Paragraph>
            We were not simply selling cookies. We were sharing the warmth of Mama&apos;s kitchen
            &mdash; something handmade, generous and created for the people we care about. That
            feeling became the heart of our brand and the meaning behind our promise:
          </Paragraph>

          <PullQuote>For Loved Ones.</PullQuote>

          <Paragraph>
            What started with a home oven has now given us a much bigger purpose: to prove that
            Pakistan can create a world-class dessert brand of its own. Pakistan&apos;s love for
            desserts has fuelled our passion and shaped our vision &mdash; to take Mama&apos;s Cookie
            from the Twin Cities to every corner of the country and, one day, across the world.
          </Paragraph>
        </article>
      </section>

      {/* ---- Closing / mission band ---- */}
      <section className="bg-primary-600 text-white">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary-100">
            Our promise
          </p>

          <h2 className="mt-4 font-heading text-3xl font-extrabold leading-tight sm:text-4xl">
            We want to build the world&apos;s biggest dessert brand
            <span className="text-primary-100"> from Pakistan</span>.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-primary-50 sm:text-lg">
            A brand known not only for premium desserts, but also for the family, love and Pakistani
            ambition baked into every bite. Mama&apos;s Cookie may have started in one small kitchen,
            but the dream was never meant to stay there &mdash; our goal is to share those same
            smiles with people around the globe.
          </p>

          <Link
            to="/local"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-bold uppercase tracking-wide text-primary-700 transition-colors hover:bg-primary-50"
          >
            Taste The Story
          </Link>
        </div>
      </section>
    </div>
  );
}
