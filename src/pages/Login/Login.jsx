import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { requestOtp, verifyOtp } from '@/services/authService';
import { setCredentials } from '@/store/authSlice';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function Login() {
  const [step, setStep] = useState('request');
  const [form, setForm] = useState({ email: '', name: '', phone: '', gender: '' });
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await requestOtp(form);
      setStep('verify');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await verifyOtp({ email: form.email, otp });
      dispatch(setCredentials(data));
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <Card className="p-6">
        <h1 className="mb-6 font-heading text-2xl font-bold text-choco-600">
          {step === 'request' ? 'Login / Sign Up' : 'Enter OTP'}
        </h1>

        {step === 'request' ? (
          <form onSubmit={handleRequestOtp} className="space-y-4">
            <input
              required
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-lg border border-cookie-200 px-3 py-2"
            />
            <input
              required
              type="text"
              placeholder="Full name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-lg border border-cookie-200 px-3 py-2"
            />
            <input
              type="tel"
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full rounded-lg border border-cookie-200 px-3 py-2"
            />
            <select
              value={form.gender}
              onChange={(e) => setForm({ ...form, gender: e.target.value })}
              className="w-full rounded-lg border border-cookie-200 px-3 py-2"
            >
              <option value="">Select gender (optional)</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </select>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </Button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <p className="text-sm text-choco-500">
              We sent a 6-digit code to <strong>{form.email}</strong>
            </p>
            <input
              required
              type="text"
              maxLength={6}
              placeholder="6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full rounded-lg border border-cookie-200 px-3 py-2 text-center tracking-widest"
            />
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Verifying...' : 'Verify & Login'}
            </Button>
            <button
              type="button"
              onClick={() => setStep('request')}
              className="w-full text-sm text-choco-500 hover:underline"
            >
              Change email
            </button>
          </form>
        )}

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      </Card>
    </div>
  );
}
