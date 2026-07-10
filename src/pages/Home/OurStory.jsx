import { Link } from 'react-router-dom';
import { Cookie } from 'lucide-react';

export default function OurStory() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-50">
        <Cookie size={32} strokeWidth={1.5} className="text-primary-500" />
      </div>

      <h2 className="mt-6 font-heading text-2xl font-extrabold text-ink-900 sm:text-3xl">
        Spreading Happiness One Cookie at a Time
      </h2>

      <p className="mx-auto mt-5 max-w-xl text-sm text-ink-500 sm:text-base">
        It all started in the dorm rooms of a local university, where a passion for baking turned
        into something bigger. What began as a humble countertop display soon became the talk of
        the town.
      </p>
      <p className="mx-auto mt-4 max-w-xl text-sm text-ink-500 sm:text-base">
        As demand grew, we took a leap of faith and transformed our little cookie bakery into a
        business startup. That was the moment MAMA was born—officially!
      </p>

      <Link
        to="/our-story"
        className="mt-8 inline-flex items-center justify-center rounded-lg bg-primary-100 px-6 py-2.5 text-sm font-bold text-primary-600 transition-colors hover:bg-primary-200"
      >
        Read Our Full Story
      </Link>
    </section>
  );
}
