import { useSelector, useDispatch } from 'react-redux';
import { fetchWishlist, addWishlistItem, removeWishlistItem } from '@/store/wishlistSlice';

export const useWishlist = () => {
  const dispatch = useDispatch();
  const { productIds, status } = useSelector((state) => state.wishlist);

  return {
    productIds,
    status,
    isWishlisted: (id) => productIds.includes(id),
    fetchWishlist: () => dispatch(fetchWishlist()),
    add: (id) => dispatch(addWishlistItem(id)),
    remove: (id) => dispatch(removeWishlistItem(id)),
    toggle: (id) =>
      productIds.includes(id) ? dispatch(removeWishlistItem(id)) : dispatch(addWishlistItem(id)),
  };
};
