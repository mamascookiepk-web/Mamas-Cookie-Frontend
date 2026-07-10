import { useSelector, useDispatch } from 'react-redux';
import { setDelivery, setPickup, clearLocalOrder } from '@/store/localOrderSlice';

export const useLocalOrder = () => {
  const dispatch = useDispatch();
  const { orderType, area, address, pickupCenter } = useSelector((state) => state.localOrder);

  return {
    orderType,
    area,
    address,
    pickupCenter,
    isSelected: Boolean(orderType),
    setDelivery: (area, address) => dispatch(setDelivery({ area, address })),
    setPickup: (pickupCenterObj) => dispatch(setPickup(pickupCenterObj)),
    clearLocalOrder: () => dispatch(clearLocalOrder()),
  };
};
