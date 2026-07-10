import { useSelector, useDispatch } from 'react-redux';
import { toggleWishlist } from '@/store/wishlistSlice';

export const useWishlist = () => {
  const dispatch = useDispatch();
  const productIds = useSelector((state) => state.wishlist.productIds);

  return {
    isWishlisted: (id) => productIds.includes(id),
    toggle: (id) => dispatch(toggleWishlist(id)),
  };
};
