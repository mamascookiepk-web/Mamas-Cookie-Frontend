import { forwardRef } from 'react';
import { Cookie as CookieIcon } from 'lucide-react';
import ProductCard from '@/components/common/ProductCard';

const CategoryBlock = forwardRef(function CategoryBlock(
  { id, heading, tagline, products, query, onSelectProduct },
  ref
) {
  const filteredList = query
    ? products.filter((product) => product.name.toLowerCase().includes(query.toLowerCase()))
    : products;

  return (
    <section id={id} ref={ref} className="mx-auto max-w-6xl scroll-mt-32 px-4 py-8 sm:px-6">
      <h2 className="text-2xl font-extrabold text-ink-900">{heading}</h2>

      <div className="relative mt-4 flex h-40 items-center justify-center overflow-hidden rounded-2xl bg-primary-100 sm:h-52">
        <div className="flex items-center gap-6 text-primary-300">
          <CookieIcon size={40} strokeWidth={1.5} />
          <span className="rounded-full bg-primary-600 px-6 py-2 text-lg font-extrabold text-white sm:text-xl">
            {tagline}
          </span>
          <CookieIcon size={40} strokeWidth={1.5} />
        </div>
      </div>

      {filteredList.length === 0 ? (
        <p className="mt-8 text-ink-500">
          {query ? 'No products match your search.' : 'No products in this category yet.'}
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {filteredList.map((product) => (
            <ProductCard key={product.id} product={product} onSelect={onSelectProduct} />
          ))}
        </div>
      )}
    </section>
  );
});

export default CategoryBlock;
