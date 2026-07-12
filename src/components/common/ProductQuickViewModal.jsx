import { useEffect, useRef, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Cookie as CookieIcon,
  Minus,
  Plus,
  Star,
  X,
} from 'lucide-react';
import { formatCurrency, formatDate } from '@/utils/format';
import { useCart } from '@/hooks/useCart';
import { useProducts } from '@/hooks/useProducts';
import { useAuth } from '@/hooks/useAuth';
import LoginModal from '@/components/common/location/LoginModal';

const AUTO_ROTATE_MS = 3000;

export default function ProductQuickViewModal({ product, onClose }) {
  const { addItem } = useCart();
  const { isAuthenticated } = useAuth();
  const {
    reviews,
    reviewsStatus,
    reviewSubmitStatus,
    reviewSubmitError,
    fetchProductReviews,
    fetchProductById,
    addProductReview,
    clearCurrentProduct,
    clearReviewSubmitStatus,
  } = useProducts();
  const [quantity, setQuantity] = useState(1);
  const [instructions, setInstructions] = useState('');
  const [activeImage, setActiveImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewComment, setReviewComment] = useState('');
  const intervalRef = useRef(null);

  const images =
    product.images?.length > 0
      ? product.images.map((img) => img.url)
      : product.imageUrl
        ? [product.imageUrl]
        : [];

  const effectivePrice = selectedVariant ? selectedVariant.price : product.price;

  const startTimer = () => {
    clearInterval(intervalRef.current);
    if (images.length <= 1) return;
    intervalRef.current = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % images.length);
    }, AUTO_ROTATE_MS);
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images.length]);

  useEffect(() => {
    fetchProductReviews(product.id);
    return () => clearCurrentProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.id]);

  const goToImage = (index) => {
    setActiveImage((index + images.length) % images.length);
    startTimer();
  };

  const handleAddToCart = () => {
    addItem(product, quantity, instructions.trim(), selectedVariant);
    onClose();
  };

  const handleWriteReviewClick = () => {
    if (!isAuthenticated) {
      setLoginOpen(true);
      return;
    }
    setShowReviewForm(true);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (reviewRating === 0) return;
    const result = await addProductReview(product.id, {
      rating: reviewRating,
      comment: reviewComment.trim(),
    });
    if (result.meta.requestStatus === 'fulfilled') {
      setReviewRating(0);
      setReviewComment('');
      setShowReviewForm(false);
      clearReviewSubmitStatus();
      fetchProductById(product.id);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/50 p-4">
      <div className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl sm:flex-row">
        <div className="relative aspect-square shrink-0 bg-primary-50 sm:aspect-auto sm:w-2/5">
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white text-ink-500 shadow-md transition-colors hover:text-primary-600"
          >
            <X size={18} />
          </button>

          {images.length > 0 ? (
            images.map((src, index) => (
              <img
                key={src + index}
                src={src}
                alt={product.name}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                  index === activeImage ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))
          ) : (
            <div className="flex h-full w-full items-center justify-center text-primary-300">
              <CookieIcon size={56} strokeWidth={1.5} />
            </div>
          )}

          {images.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous image"
                onClick={() => goToImage(activeImage - 1)}
                className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink-900 shadow-md transition-colors hover:bg-white"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                aria-label="Next image"
                onClick={() => goToImage(activeImage + 1)}
                className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink-900 shadow-md transition-colors hover:bg-white"
              >
                <ChevronRight size={18} />
              </button>
              <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
                {images.map((src, index) => (
                  <button
                    key={src + index}
                    type="button"
                    aria-label={`Go to image ${index + 1}`}
                    onClick={() => goToImage(index)}
                    className={`h-1.5 rounded-full transition-all ${
                      index === activeImage ? 'w-5 bg-white' : 'w-1.5 bg-white/60'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6 sm:p-8">
            <h2 className="text-2xl font-extrabold text-ink-900">{product.name}</h2>
            <p className="mt-1 text-lg font-bold text-primary-600">
              {formatCurrency(effectivePrice)}
            </p>
            <p className="mt-3 text-sm text-ink-500">{product.description}</p>

            {product.variants?.length > 0 && (
              <div className="mt-6">
                <p className="mb-2 text-sm font-bold text-ink-900">Choose a size</p>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedVariant(null)}
                    className={`rounded-full border px-4 py-2 text-sm font-bold transition-colors ${
                      !selectedVariant
                        ? 'border-primary-500 bg-primary-500 text-white'
                        : 'border-gray-200 text-ink-900 hover:border-primary-400'
                    }`}
                  >
                    Standard
                  </button>
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      type="button"
                      onClick={() => setSelectedVariant(variant)}
                      className={`rounded-full border px-4 py-2 text-sm font-bold transition-colors ${
                        selectedVariant?.id === variant.id
                          ? 'border-primary-500 bg-primary-500 text-white'
                          : 'border-gray-200 text-ink-900 hover:border-primary-400'
                      }`}
                    >
                      {variant.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6 rounded-lg border border-gray-200">
              <p className="border-b border-gray-200 px-4 py-2 text-sm font-bold text-ink-900">
                Instructions
              </p>
              <textarea
                rows={3}
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="Any special requests?"
                className="w-full resize-none rounded-b-lg px-4 py-3 text-sm text-ink-900 placeholder:text-ink-300 focus:outline-none"
              />
            </div>

            <div className="mt-8 border-t border-gray-200 pt-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-ink-900">
                  Reviews {product.reviewCount ? `(${product.reviewCount})` : ''}
                </p>
                {!showReviewForm && (
                  <button
                    type="button"
                    onClick={handleWriteReviewClick}
                    className="text-sm font-bold text-primary-600 hover:text-primary-700"
                  >
                    Write a Review
                  </button>
                )}
              </div>

              {showReviewForm && (
                <form onSubmit={handleReviewSubmit} className="mt-4 rounded-lg border border-gray-200 p-4">
                  <div className="flex gap-1" onMouseLeave={() => setHoverRating(0)}>
                    {Array.from({ length: 5 }).map((_, i) => {
                      const value = i + 1;
                      const filled = (hoverRating || reviewRating) >= value;
                      return (
                        <button
                          key={value}
                          type="button"
                          aria-label={`Rate ${value} out of 5`}
                          onMouseEnter={() => setHoverRating(value)}
                          onClick={() => setReviewRating(value)}
                          className="p-0.5"
                        >
                          <Star
                            size={22}
                            className={filled ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}
                          />
                        </button>
                      );
                    })}
                  </div>

                  <textarea
                    rows={3}
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder="Share your thoughts about this product..."
                    className="mt-3 w-full resize-none rounded-lg border border-gray-200 px-4 py-3 text-sm text-ink-900 placeholder:text-ink-300 focus:border-primary-500 focus:outline-none"
                  />

                  {reviewSubmitError && (
                    <p className="mt-2 text-sm text-primary-600">{reviewSubmitError}</p>
                  )}

                  <div className="mt-3 flex items-center gap-3">
                    <button
                      type="submit"
                      disabled={reviewSubmitStatus === 'loading' || reviewRating === 0}
                      className="rounded-lg bg-primary-500 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-primary-600 disabled:opacity-50"
                    >
                      {reviewSubmitStatus === 'loading' ? 'Submitting...' : 'Submit Review'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowReviewForm(false)}
                      className="text-sm font-bold text-ink-500 hover:text-ink-700"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              <div className="mt-4 space-y-4">
                {reviewsStatus === 'loading' && (
                  <p className="text-sm text-ink-400">Loading reviews...</p>
                )}
                {reviewsStatus === 'succeeded' && reviews.length === 0 && (
                  <p className="text-sm text-ink-400">No reviews yet. Be the first to write one!</p>
                )}
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold text-ink-900">{review.customerName}</p>
                      <span className="text-xs text-ink-400">{formatDate(review.createdAt)}</span>
                    </div>
                    <div className="mt-1 flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={13}
                          className={i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                    {review.comment && (
                      <p className="mt-1.5 text-sm text-ink-600">{review.comment}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 border-t border-gray-200 p-6">
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-500 text-white transition-colors hover:bg-primary-600"
              >
                <Minus size={16} />
              </button>
              <span className="w-8 text-center text-sm font-bold text-ink-900">{quantity}</span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQuantity((q) => q + 1)}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-500 text-white transition-colors hover:bg-primary-600"
              >
                <Plus size={16} />
              </button>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              className="flex flex-1 items-center justify-between rounded-lg bg-primary-500 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-600 sm:flex-none sm:gap-6"
            >
              <span>{formatCurrency(effectivePrice * quantity)}</span>
              <span>Add To Cart</span>
            </button>
          </div>
        </div>
      </div>

      {loginOpen && <LoginModal onClose={() => setLoginOpen(false)} />}
    </div>
  );
}
