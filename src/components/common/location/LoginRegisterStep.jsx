export default function LoginRegisterStep({ form, setForm, onSubmit, onBack, loading, error }) {
  const handleChange = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  return (
    <div>
      <h2 className="text-center text-xl font-extrabold text-ink-900">Register</h2>

      <form onSubmit={onSubmit} className="mt-5 space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink-900">Full Name</label>
          <input
            required
            value={form.name}
            onChange={handleChange('name')}
            placeholder="Enter your name"
            className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-ink-900 placeholder:text-ink-300 focus:border-primary-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink-900">Email Address</label>
          <input
            disabled
            value={form.email}
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-ink-500"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink-900">Mobile Number</label>
          <div className="flex items-center rounded-lg border border-gray-200 focus-within:border-primary-500">
            <span className="border-r border-gray-200 px-3 py-3 text-sm text-ink-500">+92</span>
            <input
              required
              type="tel"
              value={form.phone}
              onChange={handleChange('phone')}
              placeholder="300 1234567"
              className="w-full px-3 py-3 text-sm text-ink-900 placeholder:text-ink-300 focus:outline-none"
            />
          </div>
        </div>

        {error && <p className="text-sm text-primary-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-primary-500 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-600 disabled:opacity-50"
        >
          {loading ? 'Sending code...' : 'Register'}
        </button>

        <button
          type="button"
          onClick={onBack}
          className="w-full text-center text-sm font-medium text-ink-500 underline hover:text-primary-600"
        >
          Already have an Account?
        </button>
      </form>
    </div>
  );
}
