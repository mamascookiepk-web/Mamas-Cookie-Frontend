import { Image } from 'lucide-react';

const INSTAGRAM_URL = 'https://www.instagram.com/mamascookie';
const PLACEHOLDER_COUNT = 12;

export default function InstagramFeed() {
  return (
    <section className="py-12">
      <h2 className="mb-8 text-center font-heading text-3xl font-extrabold text-primary-600">
        Follow Us On Instagram
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6">
        {Array.from({ length: PLACEHOLDER_COUNT }).map((_, index) => (
          <a
            key={index}
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex aspect-square items-center justify-center bg-gray-100 transition-colors hover:bg-primary-50"
          >
            <Image
              size={28}
              strokeWidth={1.5}
              className="text-gray-300 transition-colors group-hover:text-primary-400"
            />
          </a>
        ))}
      </div>
    </section>
  );
}
