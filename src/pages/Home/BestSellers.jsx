import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '@/services/productService';
import Spinner from '@/components/ui/Spinner';
import ProductQuickViewModal from '@/components/common/ProductQuickViewModal';
import ProductCard from '@/components/common/ProductCard';

const DUMMY_PRODUCTS = [
  { id: 1, name: 'ChocoChee', price: 350, description: '', imageUrl: null },
  { id: 2, name: 'Hazelnut', price: 300, description: '', imageUrl: null },
  { id: 3, name: 'Classic', price: 300, description: '', imageUrl: null },
];

export default function BestSellers() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    getProducts({ size: 4 })
      .then((data) => {
        const content = data.content ?? data;
        setProducts(content.length > 0 ? content : DUMMY_PRODUCTS);
      })
      .catch(() => setProducts(DUMMY_PRODUCTS))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-heading text-2xl font-extrabold text-ink-900">Shop Best Sellers</h2>
        <Link to="/local" className="text-sm font-bold text-primary-600 hover:text-primary-700">
          Shop All
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Spinner />
        </div>
      ) : products.length === 0 ? (
        <p className="text-ink-500">No products available yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onSelect={setSelectedProduct} />
          ))}
        </div>
      )}

      {!loading && products.length > 0 && (
        <div className="mt-8 flex justify-center">
          <Link
            to="/local"
            className="inline-flex rounded-lg border border-primary-500 px-6 py-2.5 text-sm font-bold text-primary-600 transition-colors hover:bg-primary-50"
          >
            Show More
          </Link>
        </div>
      )}

      {selectedProduct && (
        <ProductQuickViewModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
}
