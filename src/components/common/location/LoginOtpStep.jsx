import { useEffect, useState } from 'react';

const RESEND_COOLDOWN = 60;

export default function LoginOtpStep({ email, otp, setOtp, onSubmit, onResend, loading, error }) {
  const [secondsLeft, setSecondsLeft] = useState(RESEND_COOLDOWN);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  const handleResend = () => {
    setSecondsLeft(RESEND_COOLDOWN);
    onResend();
  };

  return (
    <div>
      <h2 className="text-xl font-extrabold text-ink-900">Login</h2>
      <p className="mt-1 text-sm text-ink-500">
        Enter the code received on your email address (<strong>{email}</strong>).
      </p>

      <form onSubmit={onSubmit} className="mt-5 space-y-4">
        <div className="flex items-center rounded-lg border border-gray-200 px-4 focus-within:border-primary-500">
          <input
            required
            type="text"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter your code"
            className="w-full py-3 text-sm text-ink-900 placeholder:text-ink-300 focus:outline-none"
          />
          {secondsLeft > 0 ? (
            <span className="shrink-0 text-sm text-ink-400">({secondsLeft})</span>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              className="shrink-0 text-sm font-bold text-primary-600 hover:text-primary-700"
            >
              Resend
            </button>
          )}
        </div>

        {error && <p className="text-sm text-primary-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-primary-500 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-600 disabled:opacity-50"
        >
          {loading ? 'Verifying...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
