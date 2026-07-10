import { useSelector, useDispatch } from 'react-redux';
import {
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
  openCart,
  closeCart,
} from '@/store/cartSlice';

export const useCart = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const isOpen = useSelector((state) => state.cart.isOpen);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  return {
    items,
    total,
    count,
    isOpen,
    addItem: (product, quantity, instructions, variant) =>
      dispatch(addItem({ product, quantity, instructions, variant })),
    removeItem: (productId, variantId) => dispatch(removeItem({ productId, variantId })),
    updateQuantity: (productId, variantId, quantity) =>
      dispatch(updateQuantity({ productId, variantId, quantity })),
    clearCart: () => dispatch(clearCart()),
    openCart: () => dispatch(openCart()),
    closeCart: () => dispatch(closeCart()),
  };
};
