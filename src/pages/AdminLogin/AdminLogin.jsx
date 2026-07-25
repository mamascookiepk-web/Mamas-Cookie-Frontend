import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isAuthenticated, user, loginAdmin, loginStatus, loginError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const loading = loginStatus === 'loading';

  if (isAuthenticated && user?.role === 'ADMIN') {
    return <Navigate to={location.state?.from?.pathname || '/admin'} replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await loginAdmin({ email, password });
    if (result.meta.requestStatus === 'fulfilled') {
      navigate(location.state?.from?.pathname || '/admin', { replace: true });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-primary-50 px-4 py-16">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-primary-600 text-white">
          <Lock size={26} strokeWidth={1.5} />
        </div>

        <h1 className="mt-5 text-center text-xl font-extrabold text-ink-900">Admin Login</h1>
        <p className="mt-1 text-center text-sm text-ink-500">
          Sign in to manage Mama&apos;s Cookie.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink-900">Email</label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@mamascookie.com"
              className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-ink-900 placeholder:text-ink-300 focus:border-primary-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink-900">Password</label>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-ink-900 placeholder:text-ink-300 focus:border-primary-500 focus:outline-none"
            />
          </div>

          {loginError && <p className="text-sm text-primary-600">{loginError}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-primary-500 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-600 disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
