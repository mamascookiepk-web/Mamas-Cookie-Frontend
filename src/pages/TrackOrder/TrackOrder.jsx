import { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp, Package } from 'lucide-react';
import { useOrders } from '@/hooks/useOrders';
import { formatCurrency, formatDate } from '@/utils/format';
import Spinner from '@/components/ui/Spinner';
import StatusBadge from '@/components/common/OrderStatusBadge';

export default function TrackOrder() {
  const {
    myOrders,
    myOrdersStatus,
    currentOrder,
    currentOrderStatus,
    error,
    fetchMyOrders,
    fetchMyOrderById,
    clearCurrentOrder,
  } = useOrders();
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    fetchMyOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleExpand = (order) => {
    if (expandedId === order.id) {
      setExpandedId(null);
      clearCurrentOrder();
      return;
    }
    setExpandedId(order.id);
    fetchMyOrderById(order.id);
  };

  const loading = myOrdersStatus === 'loading';
  const detail = currentOrder?.id === expandedId ? currentOrder : null;
  const detailLoading = currentOrderStatus === 'loading';

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-extrabold text-ink-900">Track Order</h1>
      <p className="mt-1 text-sm text-ink-500">View the status of all your orders.</p>

      {loading && (
        <div className="flex justify-center py-16">
          <Spinner />
        </div>
      )}

      {error && <p className="mt-6 text-primary-600">{error}</p>}

      {!loading && !error && myOrders.length === 0 && (
        <p className="mt-6 text-ink-500">You haven&apos;t placed any orders yet.</p>
      )}

      <div className="mt-6 space-y-4">
        {myOrders.map((order) => {
          const isExpanded = expandedId === order.id;

          return (
            <div key={order.id} className="overflow-hidden rounded-xl border border-gray-200 bg-white">
              <button
                type="button"
                onClick={() => toggleExpand(order)}
                className="flex w-full items-center justify-between gap-4 p-4 text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-500">
                    <Package size={18} />
                  </div>
                  <div>
                    <p className="font-bold text-ink-900">Order #{order.id}</p>
                    <p className="text-xs text-ink-400">{formatDate(order.createdAt)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-bold text-ink-900">
                    {formatCurrency(order.totalAmount)}
                  </span>
                  <StatusBadge status={order.status} />
                  {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              </button>

              {isExpanded && (
                <div className="border-t border-gray-200 p-4">
                  {detailLoading && !detail ? (
                    <p className="text-sm text-ink-500">Loading details...</p>
                  ) : detail ? (
                    <>
                      <div className="space-y-1 text-sm text-ink-600">
                        <p>
                          <span className="font-bold text-ink-900">Type:</span> {detail.orderType}
                        </p>
                        {detail.delivery && (
                          <p>
                            <span className="font-bold text-ink-900">Delivering to:</span>{' '}
                            {detail.delivery.addressLine}, {detail.delivery.areaName}
                          </p>
                        )}
                        {detail.pickupCenter && (
                          <p>
                            <span className="font-bold text-ink-900">Pickup at:</span>{' '}
                            {detail.pickupCenter.name}
                          </p>
                        )}
                        {detail.rejectionReason && (
                          <p className="text-primary-600">
                            <span className="font-bold">Reason:</span> {detail.rejectionReason}
                          </p>
                        )}
                      </div>

                      <div className="mt-3 divide-y divide-gray-100 rounded-lg border border-gray-100">
                        {detail.items?.map((item, i) => (
                          <div key={i} className="flex justify-between px-3 py-2 text-sm">
                            <span className="text-ink-600">
                              {item.productName} &times; {item.quantity}
                            </span>
                            <span className="font-medium text-ink-900">
                              {formatCurrency(item.subtotal)}
                            </span>
                          </div>
                        ))}
                      </div>

                      {detail.history?.length > 0 && (
                        <div className="mt-4">
                          <p className="mb-2 text-sm font-bold text-ink-900">Status History</p>
                          <ul className="space-y-2 border-l-2 border-primary-100 pl-4">
                            {detail.history.map((h, i) => (
                              <li key={i} className="text-sm">
                                <StatusBadge status={h.status} />
                                <span className="ml-2 text-ink-400">
                                  {formatDate(h.changedAt)}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </>
                  ) : (
                    <p className="text-sm text-primary-600">Could not load order details.</p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
