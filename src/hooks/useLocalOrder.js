import { useSelector, useDispatch } from 'react-redux';
import {
  setDeliveryArea,
  setPickup,
  setDeliveryAddress,
  clearLocalOrder,
} from '@/store/localOrderSlice';

export const useLocalOrder = () => {
  const dispatch = useDispatch();
  const { orderType, area, address, pickupCenter } = useSelector((state) => state.localOrder);

  return {
    orderType,
    area,
    address,
    pickupCenter,
    isSelected: Boolean(orderType),
    setDeliveryArea: (area) => dispatch(setDeliveryArea(area)),
    setPickup: (pickupCenterObj) => dispatch(setPickup(pickupCenterObj)),
    setDeliveryAddress: (address) => dispatch(setDeliveryAddress(address)),
    clearLocalOrder: () => dispatch(clearLocalOrder()),
  };
};
