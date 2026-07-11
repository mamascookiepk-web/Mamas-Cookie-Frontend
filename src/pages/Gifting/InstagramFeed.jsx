import { Camera } from 'lucide-react';

const INSTAGRAM_URL = 'https://www.instagram.com/mamascookie';
const IMAGES = Array.from({ length: 12 }, (_, i) => `/images/instagram/img-${i + 1}.jpg`);

export default function InstagramFeed() {
  return (
    <section className="py-12">
      <h2 className="mb-8 text-center font-heading text-3xl font-extrabold text-primary-600">
        Follow Us On Instagram
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6">
        {IMAGES.map((src, index) => (
          <a
            key={src}
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-square overflow-hidden bg-gray-100"
          >
            <img
              src={src}
              alt={`Mama's Cookie on Instagram ${index + 1}`}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-ink-900/0 transition-colors group-hover:bg-ink-900/40">
              <Camera
                size={22}
                className="text-white opacity-0 transition-opacity group-hover:opacity-100"
              />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
