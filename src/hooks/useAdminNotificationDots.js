import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAdminOrders } from '@/store/ordersSlice';
import { fetchAdminGiftingRequests } from '@/store/giftingSlice';
import { fetchAdminCateringRequests } from '@/store/cateringSlice';
import { fetchAdminTestimonials } from '@/store/testimonialsSlice';
import { usePolling } from './usePolling';

const STORAGE_PREFIX = 'mc_admin_last_seen_';
const POLL_INTERVAL_MS = 20000;

const getLastSeenId = (key) => Number(localStorage.getItem(STORAGE_PREFIX + key) ?? 0);

const setLastSeenId = (key, id) => localStorage.setItem(STORAGE_PREFIX + key, String(id));

const toList = (payload) => (Array.isArray(payload) ? payload : (payload?.content ?? []));

const maxId = (list) => list.reduce((max, item) => (item.id > max ? item.id : max), 0);

const RESOURCES = [
  { key: 'orders', thunk: fetchAdminOrders },
  { key: 'gifting', thunk: fetchAdminGiftingRequests },
  { key: 'catering', thunk: fetchAdminCateringRequests },
  { key: 'testimonials', thunk: fetchAdminTestimonials },
];

export function useAdminNotificationDots() {
  const dispatch = useDispatch();
  const [hasNew, setHasNew] = useState({
    orders: false,
    gifting: false,
    catering: false,
    testimonials: false,
  });

  const checkAll = useCallback(async () => {
    const results = await Promise.all(
      RESOURCES.map(({ thunk }) => dispatch(thunk()))
    );

    setHasNew((prev) => {
      const next = { ...prev };
      RESOURCES.forEach(({ key }, i) => {
        const result = results[i];
        if (result.meta.requestStatus !== 'fulfilled') return;
        next[key] = maxId(toList(result.payload)) > getLastSeenId(key);
      });
      return next;
    });
  }, [dispatch]);

  useEffect(() => {
    checkAll();
  }, [checkAll]);

  usePolling(checkAll, POLL_INTERVAL_MS);

  const markVisited = useCallback((key, list) => {
    const newest = maxId(list ?? []);
    if (newest > getLastSeenId(key)) {
      setLastSeenId(key, newest);
    }
    setHasNew((prev) => (prev[key] ? { ...prev, [key]: false } : prev));
  }, []);

  return { hasNew, markVisited };
}
