const STATUS_STYLES = {
  PENDING: 'bg-gray-100 text-ink-600',
  ACCEPTED: 'bg-blue-100 text-blue-700',
  PREPARING: 'bg-amber-100 text-amber-700',
  OUT_FOR_DELIVERY: 'bg-primary-100 text-primary-700',
  READY_FOR_PICKUP: 'bg-primary-100 text-primary-700',
  COMPLETED: 'bg-green-100 text-green-700',
  REJECTED: 'bg-red-100 text-red-700',
  CANCELLED: 'bg-red-100 text-red-700',
};

export default function OrderStatusBadge({ status }) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-bold ${STATUS_STYLES[status] ?? 'bg-gray-100 text-ink-600'}`}
    >
      {status?.replace(/_/g, ' ')}
    </span>
  );
}
