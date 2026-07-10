import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { getProducts } from '@/services/productService';
import { useCategories } from '@/hooks/useCategories';
import CategoryBlock from './CategoryBlock';
import ProductQuickViewModal from '@/components/common/ProductQuickViewModal';

const slugify = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

export default function LocalCategorySection() {
  const { items: categories, fetchCategories } = useCategories();
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [query, setQuery] = useState(searchParams.get('q') ?? '');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const sectionRefs = useRef({});

  useEffect(() => {
    fetchCategories();
    getProducts()
      .then((data) => setProducts(data.content ?? data))
      .catch(() => setProducts([]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!activeId && categories.length > 0) {
      setActiveId(`category-${slugify(categories[0].name)}`);
    }
  }, [categories, activeId]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: '-100px 0px -70% 0px' }
    );

    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [categories]);

  const scrollToSection = (id) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section>
      <div className="sticky top-0 z-30 bg-primary-900">
        <div className="mx-auto flex max-w-6xl gap-8 overflow-x-auto px-4 sm:px-6">
          {categories.map((category) => {
            const id = `category-${slugify(category.name)}`;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => scrollToSection(id)}
                className={`shrink-0 border-b-2 py-4 text-sm font-bold transition-colors ${
                  activeId === id
                    ? 'border-white text-white'
                    : 'border-transparent text-primary-300 hover:text-white'
                }`}
              >
                {category.name}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl items-center gap-2 border-b border-gray-200 px-4 py-4 sm:px-6">
        <Search size={18} className="text-primary-600" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full bg-transparent text-sm text-ink-900 placeholder:text-ink-300 focus:outline-none"
        />
      </div>

      {categories.map((category) => {
        const id = `category-${slugify(category.name)}`;
        const categoryProducts = products.filter(
          (product) => product.category?.id === category.id
        );

        return (
          <CategoryBlock
            key={category.id}
            id={id}
            ref={(el) => (sectionRefs.current[id] = el)}
            heading={category.name}
            tagline={category.name}
            products={categoryProducts}
            query={query}
            onSelectProduct={setSelectedProduct}
          />
        );
      })}

      {selectedProduct && (
        <ProductQuickViewModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
}
