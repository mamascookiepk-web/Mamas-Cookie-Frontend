const inputClass =
  'w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-ink-300 focus:border-primary-500 focus:outline-none';

export default function EventDetailsStep({ formData, onChange, onNext, onBack }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-center text-2xl font-extrabold text-ink-900">2. Event Details</h2>

      <div className="mt-6 space-y-5">
        <div>
          <label className="mb-2 block text-sm font-bold text-ink-900">
            Event Type <span className="text-primary-500">*</span>
          </label>
          <input
            required
            placeholder="e.g. Wedding, Birthday, Corporate"
            value={formData.eventType}
            onChange={(e) => onChange('eventType', e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-bold text-ink-900">
            Event Date <span className="text-primary-500">*</span>
          </label>
          <input
            required
            type="date"
            value={formData.eventDate}
            onChange={(e) => onChange('eventDate', e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-bold text-ink-900">
            Guest Count <span className="text-primary-500">*</span>
          </label>
          <input
            required
            type="number"
            min={1}
            value={formData.guestCount}
            onChange={(e) => onChange('guestCount', e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-bold text-ink-900">
            Venue Address <span className="text-primary-500">*</span>
          </label>
          <textarea
            required
            rows={4}
            value={formData.venueAddress}
            onChange={(e) => onChange('venueAddress', e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="rounded-lg bg-gray-100 px-6 py-3 text-sm font-bold text-ink-900 transition-colors hover:bg-gray-200"
        >
          Back
        </button>
        <button
          type="submit"
          className="rounded-lg bg-primary-500 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-600"
        >
          Next Step
        </button>
      </div>
    </form>
  );
}
