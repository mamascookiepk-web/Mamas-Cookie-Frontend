import { useSelector, useDispatch } from 'react-redux';
import {
  placeOrder,
  fetchMyOrders,
  fetchMyOrderById,
  fetchAdminOrders,
  fetchAdminOrderById,
  changeOrderStatus,
  clearCurrentOrder,
  clearAdminCurrentOrder,
  clearPlaceError,
  clearOrdersError,
} from '@/store/ordersSlice';

export const useOrders = () => {
  const dispatch = useDispatch();
  const state = useSelector((s) => s.orders);

  return {
    myOrders: state.myOrders,
    myOrdersStatus: state.myOrdersStatus,
    currentOrder: state.currentOrder,
    currentOrderStatus: state.currentOrderStatus,

    adminOrders: state.adminOrders,
    adminOrdersStatus: state.adminOrdersStatus,
    adminCurrentOrder: state.adminCurrentOrder,
    adminCurrentOrderStatus: state.adminCurrentOrderStatus,

    placeStatus: state.placeStatus,
    placeError: state.placeError,
    statusUpdateStatus: state.statusUpdateStatus,
    statusUpdateError: state.statusUpdateError,
    error: state.error,

    placeOrder: (payload) => dispatch(placeOrder(payload)),
    fetchMyOrders: (params) => dispatch(fetchMyOrders(params)),
    fetchMyOrderById: (id) => dispatch(fetchMyOrderById(id)),
    fetchAdminOrders: (params) => dispatch(fetchAdminOrders(params)),
    fetchAdminOrderById: (id) => dispatch(fetchAdminOrderById(id)),
    changeOrderStatus: (id, payload) => dispatch(changeOrderStatus({ id, payload })),
    clearCurrentOrder: () => dispatch(clearCurrentOrder()),
    clearAdminCurrentOrder: () => dispatch(clearAdminCurrentOrder()),
    clearPlaceError: () => dispatch(clearPlaceError()),
    clearOrdersError: () => dispatch(clearOrdersError()),
  };
};
