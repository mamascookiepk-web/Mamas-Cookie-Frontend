const inputClass =
  'w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-ink-300 focus:border-primary-500 focus:outline-none';

export default function ContactStep({ formData, onChange, onNext }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-center text-2xl font-extrabold text-ink-900">1. Contact Information</h2>

      <div className="mt-6 space-y-5">
        <div>
          <label className="mb-2 block text-sm font-bold text-ink-900">
            First Name <span className="text-primary-500">*</span>
          </label>
          <input
            required
            value={formData.firstName}
            onChange={(e) => onChange('firstName', e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-bold text-ink-900">
            Last Name <span className="text-primary-500">*</span>
          </label>
          <input
            required
            value={formData.lastName}
            onChange={(e) => onChange('lastName', e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-bold text-ink-900">
            Email <span className="text-primary-500">*</span>
          </label>
          <input
            required
            type="email"
            value={formData.email}
            onChange={(e) => onChange('email', e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-bold text-ink-900">
            Phone <span className="text-primary-500">*</span>
          </label>
          <input
            required
            type="tel"
            value={formData.phone}
            onChange={(e) => onChange('phone', e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div className="mt-8 flex justify-end">
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
