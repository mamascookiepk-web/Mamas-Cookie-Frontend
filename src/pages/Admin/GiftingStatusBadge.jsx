const STATUS_STYLES = {
  NEW: 'bg-blue-100 text-blue-700',
  CONTACTED: 'bg-amber-100 text-amber-700',
  CONFIRMED: 'bg-green-100 text-green-700',
  CLOSED: 'bg-gray-200 text-ink-600',
};

export default function GiftingStatusBadge({ status }) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-bold ${STATUS_STYLES[status] ?? 'bg-gray-100 text-ink-600'}`}
    >
      {status}
    </span>
  );
}
