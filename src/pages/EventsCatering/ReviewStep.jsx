const SUMMARY_FIELDS = [
  { key: 'firstName', label: 'First Name' },
  { key: 'lastName', label: 'Last Name' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
  { key: 'eventType', label: 'Event Type' },
  { key: 'eventDate', label: 'Event Date' },
  { key: 'guestCount', label: 'Guest Count' },
  { key: 'venueAddress', label: 'Venue Address' },
];

export default function ReviewStep({ formData, onBack, onSubmit, submitting, error }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-center text-2xl font-extrabold text-ink-900">3. Review Your Details</h2>

      <div className="mt-6 divide-y divide-gray-200 rounded-lg border border-gray-200">
        {SUMMARY_FIELDS.map(({ key, label }) => (
          <div key={key} className="flex justify-between gap-4 px-4 py-3">
            <span className="text-sm font-bold text-ink-500">{label}</span>
            <span className="text-right text-sm text-ink-900">{formData[key] || '—'}</span>
          </div>
        ))}
      </div>

      {error && <p className="mt-4 text-sm text-primary-600">{error}</p>}

      <div className="mt-8 flex justify-between">
        <button
          type="button"
          onClick={onBack}
          disabled={submitting}
          className="rounded-lg bg-gray-100 px-6 py-3 text-sm font-bold text-ink-900 transition-colors hover:bg-gray-200 disabled:opacity-50"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="rounded-lg bg-primary-500 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-600 disabled:opacity-50"
        >
          {submitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
  );
}
