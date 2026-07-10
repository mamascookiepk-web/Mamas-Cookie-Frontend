import { useEffect, useState } from 'react';
import { useOrders } from '@/hooks/useOrders';
import { formatCurrency, formatDate } from '@/utils/format';
import StatusBadge from '@/components/common/OrderStatusBadge';
import AdminPageHeader from './AdminPageHeader';
import AdminOrderDetailModal from './AdminOrderDetailModal';

const STATUS_FILTERS = [
  { value: '', label: 'All' },
  { value: 'PENDING', label: 'Pending' },
  { value: 'ACCEPTED', label: 'Accepted' },
  { value: 'PREPARING', label: 'Preparing' },
  { value: 'OUT_FOR_DELIVERY', label: 'Out for Delivery' },
  { value: 'READY_FOR_PICKUP', label: 'Ready for Pickup' },
  { value: 'COMPLETED', label: 'Completed' },
  { value: 'REJECTED', label: 'Rejected' },
  { value: 'CANCELLED', label: 'Cancelled' },
];

const SEEN_KEY = 'mc_admin_seen_orders';

function loadSeenIds() {
  try {
    return new Set(JSON.parse(localStorage.getItem(SEEN_KEY)) ?? []);
  } catch {
    return new Set();
  }
}

function persistSeenIds(set) {
  localStorage.setItem(SEEN_KEY, JSON.stringify([...set]));
}

export default function AdminOrders() {
  const {
    adminOrders,
    adminOrdersStatus,
    adminCurrentOrder,
    adminCurrentOrderStatus,
    error,
    statusUpdateStatus,
    statusUpdateError,
    fetchAdminOrders,
    fetchAdminOrderById,
    changeOrderStatus,
    clearAdminCurrentOrder,
  } = useOrders();

  const [statusFilter, setStatusFilter] = useState('');
  const [viewingId, setViewingId] = useState(null);
  const [seenIds, setSeenIds] = useState(loadSeenIds);

  useEffect(() => {
    fetchAdminOrders(statusFilter ? { status: statusFilter } : undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter]);

  const openOrder = (order) => {
    setViewingId(order.id);
    fetchAdminOrderById(order.id);
    setSeenIds((prev) => {
      const next = new Set(prev);
      next.add(order.id);
      persistSeenIds(next);
      return next;
    });
  };

  const closeModal = () => {
    setViewingId(null);
    clearAdminCurrentOrder();
  };

  const handleChangeStatus = async (status, rejectionReason) => {
    const result = await changeOrderStatus(viewingId, { status, rejectionReason });
    if (result.meta.requestStatus === 'fulfilled') {
      // status just changed by us, so it's no longer "new" for anyone else either
      setSeenIds((prev) => {
        const next = new Set(prev);
        next.add(viewingId);
        persistSeenIds(next);
        return next;
      });
    }
  };

  const detail = adminCurrentOrder?.id === viewingId ? adminCurrentOrder : null;

  return (
    <div>
      <AdminPageHeader title="Orders" subtitle="List" breadcrumb="Home / Orders" />

      <div className="mt-6 flex flex-wrap gap-2">
        {STATUS_FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setStatusFilter(f.value)}
            className={`rounded-full px-4 py-2 text-sm font-bold transition-colors ${
              statusFilter === f.value
                ? 'bg-primary-500 text-white'
                : 'bg-white text-ink-900 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white">
        {adminOrdersStatus === 'loading' && (
          <p className="p-6 text-center text-ink-500">Loading orders...</p>
        )}

        {error && <p className="p-6 text-center text-primary-600">{error}</p>}

        {adminOrdersStatus === 'succeeded' && adminOrders.length === 0 && (
          <p className="p-6 text-center text-ink-500">No orders found.</p>
        )}

        {adminOrders.map((order) => {
          const isNew = !seenIds.has(order.id);
          return (
            <button
              key={order.id}
              type="button"
              onClick={() => openOrder(order)}
              className="flex w-full items-center gap-4 border-b border-gray-100 px-4 py-4 text-left last:border-b-0 hover:bg-gray-50"
            >
              <span
                className={`h-2 w-2 shrink-0 rounded-full ${isNew ? 'bg-primary-500' : 'bg-transparent'}`}
              />
              <div className="min-w-0 flex-1">
                <p className="font-bold text-ink-900">
                  Order #{order.id} &middot; {order.customer?.name}
                </p>
                <p className="text-xs text-ink-400">{formatDate(order.createdAt)}</p>
              </div>
              <span className="hidden font-bold text-ink-900 sm:inline-block">
                {formatCurrency(order.totalAmount)}
              </span>
              <StatusBadge status={order.status} />
            </button>
          );
        })}
      </div>

      {viewingId && (
        <>
          {adminCurrentOrderStatus === 'loading' && !detail ? (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/50 p-4">
              <p className="rounded-xl bg-white px-6 py-4 text-sm text-ink-500">
                Loading order...
              </p>
            </div>
          ) : detail ? (
            <AdminOrderDetailModal
              order={detail}
              onClose={closeModal}
              onChangeStatus={handleChangeStatus}
              submitting={statusUpdateStatus === 'loading'}
              error={statusUpdateError}
            />
          ) : null}
        </>
      )}
    </div>
  );
}
