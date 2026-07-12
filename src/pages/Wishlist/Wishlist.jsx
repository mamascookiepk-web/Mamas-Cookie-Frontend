import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWishlist } from '@/hooks/useWishlist';
import { getProduct } from '@/services/productService';
import ProductCard from '@/components/common/ProductCard';
import ProductQuickViewModal from '@/components/common/ProductQuickViewModal';
import Spinner from '@/components/ui/Spinner';

export default function Wishlist() {
  const { productIds, status: wishlistStatus } = useWishlist();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    if (wishlistStatus === 'loading') return;

    if (productIds.length === 0) {
      setProducts([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    Promise.all(productIds.map((id) => getProduct(id).catch(() => null)))
      .then((results) => setProducts(results.filter(Boolean)))
      .finally(() => setLoading(false));
  }, [productIds, wishlistStatus]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-extrabold text-ink-900">My Wishlist</h1>
      <p className="mt-1 text-sm text-ink-500">Products you&apos;ve saved for later.</p>

      {loading ? (
        <div className="flex justify-center py-16">
          <Spinner />
        </div>
      ) : products.length === 0 ? (
        <div className="mt-10 flex flex-col items-center gap-3 rounded-xl border border-gray-200 bg-white py-16 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-50 text-primary-400">
            <Heart size={26} strokeWidth={1.5} />
          </span>
          <p className="font-bold text-ink-900">Your wishlist is empty</p>
          <p className="max-w-xs text-sm text-ink-500">
            Tap the heart on any product to save it here for later.
          </p>
          <Link
            to="/local"
            className="mt-2 inline-flex rounded-lg bg-primary-500 px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-primary-600"
          >
            Browse Cookies
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onSelect={setSelectedProduct} />
          ))}
        </div>
      )}

      {selectedProduct && (
        <ProductQuickViewModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}
