import { Link } from 'react-router-dom';

export default function StoryClosing() {
  return (
    <section className="bg-primary-900 text-white">
      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:py-20">
        <p className="text-sm font-medium text-primary-200">
          This is not the full story. This is just the beginning.
        </p>

        <h2 className="mt-4 font-heading text-3xl font-extrabold leading-tight sm:text-4xl">
          Mama&apos;s Cookie.
          <br />
          For Loved Ones.
          <br />
          <span className="italic text-primary-300">One cookie at a time.</span>
        </h2>

        <Link
          to="/local"
          className="mt-8 inline-flex items-center justify-center rounded-lg bg-white px-8 py-3 text-sm font-bold uppercase tracking-wide text-primary-700 transition-colors hover:bg-primary-50"
        >
          Taste The Story
        </Link>
      </div>
    </section>
  );
}
