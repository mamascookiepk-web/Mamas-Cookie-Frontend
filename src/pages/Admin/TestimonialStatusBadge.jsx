const STATUS_STYLES = {
  PENDING: 'bg-amber-100 text-amber-700',
  APPROVED: 'bg-green-100 text-green-700',
  REJECTED: 'bg-gray-200 text-ink-600',
};

export default function TestimonialStatusBadge({ status }) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-bold ${STATUS_STYLES[status] ?? 'bg-gray-100 text-ink-600'}`}
    >
      {status}
    </span>
  );
}
