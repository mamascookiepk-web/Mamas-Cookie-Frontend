import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import cartReducer from './cartSlice';
import wishlistReducer from './wishlistSlice';
import localOrderReducer from './localOrderSlice';
import productsReducer from './productsSlice';
import categoriesReducer from './categoriesSlice';
import addressesReducer from './addressSlice';
import ordersReducer from './ordersSlice';
import areasReducer from './areasSlice';
import pickupCentersReducer from './pickupCentersSlice';
import giftingReducer from './giftingSlice';
import cateringReducer from './cateringSlice';
import contactReducer from './contactSlice';
import monthlyDropReducer from './monthlyDropSlice';
import weeklyDropReducer from './weeklyDropSlice';
import testimonialsReducer from './testimonialsSlice';
import dashboardReducer from './dashboardSlice';
import gstReducer from './gstSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    localOrder: localOrderReducer,
    products: productsReducer,
    categories: categoriesReducer,
    addresses: addressesReducer,
    orders: ordersReducer,
    areas: areasReducer,
    pickupCenters: pickupCentersReducer,
    gifting: giftingReducer,
    catering: cateringReducer,
    contact: contactReducer,
    monthlyDrop: monthlyDropReducer,
    weeklyDrop: weeklyDropReducer,
    testimonials: testimonialsReducer,
    dashboard: dashboardReducer,
    gst: gstReducer,
  },
});
