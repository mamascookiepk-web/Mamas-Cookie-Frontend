import { useState } from 'react';
import { ChevronRight } from 'lucide-react';

export default function LoginEmailStep({ email, setEmail, onSubmit, loading, error }) {
  const [helpOpen, setHelpOpen] = useState(false);

  return (
    <div>
      <h2 className="text-xl font-extrabold text-ink-900">Enter your email address</h2>
      <p className="mt-1 text-sm text-ink-500">Please enter your email address</p>

      <form onSubmit={onSubmit} className="mt-5 space-y-4">
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-ink-900 placeholder:text-ink-300 focus:border-primary-500 focus:outline-none"
        />

        <button
          type="button"
          onClick={() => setHelpOpen((open) => !open)}
          className="flex items-center gap-1 text-sm font-medium text-ink-500 hover:text-primary-600"
        >
          <ChevronRight size={14} className={`transition-transform ${helpOpen ? 'rotate-90' : ''}`} />
          Need help?
        </button>
        {helpOpen && (
          <p className="text-sm text-ink-500">
            Contact us at{' '}
            <a href="mailto:support@mamascookie.com" className="font-medium text-primary-600 underline">
              support@mamascookie.com
            </a>
          </p>
        )}

        {error && <p className="text-sm text-primary-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-primary-500 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-600 disabled:opacity-50"
        >
          {loading ? 'Checking...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
