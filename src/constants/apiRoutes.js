export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1';

export const API_ROUTES = {
  AUTH: {
    CHECK_EMAIL: '/auth/customer/check-email',
    REQUEST_OTP: '/auth/customer/request-otp',
    VERIFY_OTP: '/auth/customer/verify-otp',
    ADMIN_LOGIN: '/auth/admin/login',
  },
  USERS: {
    ME: '/users/me',
  },
  CATEGORIES: {
    LIST: '/categories',
    ADMIN_CREATE: '/admin/categories',
    ADMIN_UPDATE: (id) => `/admin/categories/${id}`,
    ADMIN_DELETE: (id) => `/admin/categories/${id}`,
  },
  PRODUCTS: {
    LIST: '/products',
    DETAIL: (id) => `/products/${id}`,
    ADMIN_CREATE: '/admin/products',
    ADMIN_UPDATE: (id) => `/admin/products/${id}`,
    ADMIN_DELETE: (id) => `/admin/products/${id}`,
    ADMIN_IMAGE: (id) => `/admin/products/${id}/image`,
    REVIEWS: (id) => `/products/${id}/reviews`,
  },
  AREAS: {
    LIST: '/areas',
    ADMIN_CREATE: '/admin/areas',
    ADMIN_UPDATE: (id) => `/admin/areas/${id}`,
    ADMIN_DELETE: (id) => `/admin/areas/${id}`,
  },
  PICKUP_CENTERS: {
    LIST: '/pickup-centers',
    ADMIN_CREATE: '/admin/pickup-centers',
    ADMIN_UPDATE: (id) => `/admin/pickup-centers/${id}`,
    ADMIN_DELETE: (id) => `/admin/pickup-centers/${id}`,
  },
  ADDRESSES: {
    LIST: '/addresses',
    DETAIL: (id) => `/addresses/${id}`,
    SET_DEFAULT: (id) => `/addresses/${id}/default`,
  },
  ORDERS: {
    LIST: '/orders',
    CREATE: '/orders',
    DETAIL: (id) => `/orders/${id}`,
    ADMIN_LIST: '/admin/orders',
    ADMIN_DETAIL: (id) => `/admin/orders/${id}`,
    ADMIN_STATUS: (id) => `/admin/orders/${id}/status`,
  },
  GIFTING: {
    CREATE: '/gifting',
    ADMIN_LIST: '/admin/gifting',
    ADMIN_DETAIL: (id) => `/admin/gifting/${id}`,
    ADMIN_STATUS: (id) => `/admin/gifting/${id}/status`,
  },
  CATERING: {
    CREATE: '/catering',
    ADMIN_LIST: '/admin/catering',
    ADMIN_DETAIL: (id) => `/admin/catering/${id}`,
    ADMIN_STATUS: (id) => `/admin/catering/${id}/status`,
  },
  MONTHLY_DROP: {
    GET: '/monthly-drop',
    ADMIN_IMAGE: '/admin/monthly-drop/image',
  },
  WEEKLY_DROP: {
    GET: '/weekly-drop',
    ADMIN_IMAGE: '/admin/weekly-drop/image',
    ADMIN_DELETE: (id) => `/admin/weekly-drop/image/${id}`,
  },
};
