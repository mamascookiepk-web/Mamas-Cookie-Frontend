import { useState } from 'react';
import { X } from 'lucide-react';
import { formatCurrency, formatDate } from '@/utils/format';
import StatusBadge from '@/components/common/OrderStatusBadge';
import { getAvailableActions } from './orderStatusFlow';

export default function AdminOrderDetailModal({ order, onClose, onChangeStatus, submitting, error }) {
  const [rejecting, setRejecting] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  const actions = getAvailableActions(order.status, order.orderType);

  const handleAction = (action) => {
    if (action.needsReason && !rejecting) {
      setRejecting(true);
      return;
    }
    onChangeStatus(action.status, action.needsReason ? rejectionReason : undefined);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/50 p-4">
      <div className="flex max-h-[90vh] w-full max-w-2xl flex-col rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-200 p-5">
          <div>
            <h2 className="text-lg font-extrabold text-ink-900">Order #{order.id}</h2>
            <p className="text-xs text-ink-400">{formatDate(order.createdAt)}</p>
          </div>
          <div className="flex items-center gap-3">
            <StatusBadge status={order.status} />
            <button
              type="button"
              aria-label="Close"
              onClick={onClose}
              className="text-ink-400 transition-colors hover:text-primary-600"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm font-bold text-ink-900">Customer</p>
              <p className="text-sm text-ink-600">{order.customer?.name}</p>
              <p className="text-xs text-ink-400">{order.customer?.email}</p>
              <p className="text-xs text-ink-400">{order.customer?.phone}</p>
            </div>
            <div>
              <p className="text-sm font-bold text-ink-900">
                {order.orderType === 'DELIVERY' ? 'Delivery Address' : 'Pickup Center'}
              </p>
              {order.delivery ? (
                <>
                  <p className="text-sm text-ink-600">{order.delivery.addressLine}</p>
                  {order.delivery.landmark && (
                    <p className="text-xs text-ink-400">{order.delivery.landmark}</p>
                  )}
                  <p className="text-xs text-ink-400">
                    {order.delivery.areaName} &middot;{' '}
                    {formatCurrency(order.delivery.areaDeliveryFee)}
                  </p>
                </>
              ) : (
                <>
                  <p className="text-sm text-ink-600">{order.pickupCenter?.name}</p>
                  <p className="text-xs text-ink-400">{order.pickupCenter?.address}</p>
                </>
              )}
            </div>
          </div>

          {order.rejectionReason && (
            <p className="mt-4 text-sm text-primary-600">
              <span className="font-bold">Rejection reason:</span> {order.rejectionReason}
            </p>
          )}

          <div className="mt-5 divide-y divide-gray-100 rounded-lg border border-gray-100">
            {order.items?.map((item, i) => (
              <div key={i} className="px-3 py-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-ink-600">
                    {item.productName}
                    {item.variantLabel && (
                      <span className="text-ink-400"> ({item.variantLabel})</span>
                    )}
                    {' '}&times; {item.quantity}
                  </span>
                  <span className="font-medium text-ink-900">{formatCurrency(item.subtotal)}</span>
                </div>
                {item.instructions && (
                  <p className="mt-0.5 text-xs italic text-ink-400">Note: {item.instructions}</p>
                )}
              </div>
            ))}
          </div>

          <div className="mt-3 space-y-1 text-sm">
            <div className="flex justify-between text-ink-600">
              <span>Delivery Fee</span>
              <span>{formatCurrency(order.deliveryFee)}</span>
            </div>
            {Number(order.gstAmount) > 0 && (
              <div className="flex justify-between text-ink-600">
                <span>GST ({order.gstPercentage}%)</span>
                <span>{formatCurrency(order.gstAmount)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-ink-900">
              <span>Total</span>
              <span>{formatCurrency(order.totalAmount)}</span>
            </div>
          </div>

          {order.history?.length > 0 && (
            <div className="mt-5">
              <p className="mb-2 text-sm font-bold text-ink-900">Status History</p>
              <ul className="space-y-2 border-l-2 border-primary-100 pl-4">
                {order.history.map((h, i) => (
                  <li key={i} className="text-sm">
                    <StatusBadge status={h.status} />
                    <span className="ml-2 text-ink-400">{formatDate(h.changedAt)}</span>
                    <span className="ml-2 text-ink-400">&middot; {h.changedBy}</span>
                    {h.note && <p className="mt-0.5 text-xs text-ink-500">{h.note}</p>}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {actions.length > 0 && (
          <div className="border-t border-gray-200 p-5">
            {rejecting && (
              <textarea
                autoFocus
                required
                rows={2}
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Reason for rejection"
                className="mb-3 w-full resize-none rounded-lg border border-gray-200 px-3 py-2 text-sm text-ink-900 placeholder:text-ink-300 focus:border-primary-500 focus:outline-none"
              />
            )}

            {error && <p className="mb-3 text-sm text-primary-600">{error}</p>}

            <div className="flex flex-wrap gap-3">
              {(rejecting ? actions.filter((a) => a.needsReason) : actions).map((action) => (
                <button
                  key={action.status}
                  type="button"
                  disabled={submitting || (rejecting && !rejectionReason.trim())}
                  onClick={() => handleAction(action)}
                  className={`rounded-lg px-5 py-2.5 text-sm font-bold text-white transition-colors disabled:opacity-50 ${
                    action.danger
                      ? 'bg-primary-600 hover:bg-primary-700'
                      : 'bg-primary-500 hover:bg-primary-600'
                  }`}
                >
                  {rejecting ? 'Confirm Reject' : action.label}
                </button>
              ))}
              {rejecting && (
                <button
                  type="button"
                  onClick={() => {
                    setRejecting(false);
                    setRejectionReason('');
                  }}
                  className="rounded-lg bg-gray-100 px-5 py-2.5 text-sm font-bold text-ink-900 hover:bg-gray-200"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
