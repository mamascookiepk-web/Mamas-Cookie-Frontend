import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { checkEmail, requestOtp, verifyOtp } from '@/services/authService';
import { setCredentials } from '@/store/authSlice';
import LoginEmailStep from './LoginEmailStep';
import LoginOtpStep from './LoginOtpStep';
import LoginRegisterStep from './LoginRegisterStep';

const initialRegisterForm = { name: '', email: '', gender: '', dob: '', phone: '' };

export default function LoginModal({ onClose }) {
  const dispatch = useDispatch();
  const [step, setStep] = useState('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [registerForm, setRegisterForm] = useState(initialRegisterForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { registered } = await checkEmail(email);
      if (registered) {
        await requestOtp({ email });
        setStep('otp');
      } else {
        setRegisterForm((prev) => ({ ...prev, email }));
        setStep('register');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await requestOtp({
        email: registerForm.email,
        name: registerForm.name,
        phone: registerForm.phone,
        gender: registerForm.gender,
      });
      setStep('otp');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = () => {
    requestOtp({
      email,
      name: registerForm.name,
      phone: registerForm.phone,
      gender: registerForm.gender,
    }).catch(() => {});
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await verifyOtp({ email: email || registerForm.email, otp });
      dispatch(setCredentials(data));
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl sm:p-8">
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-ink-400 transition-colors hover:text-primary-600"
        >
          <X size={18} />
        </button>

        {step === 'email' && (
          <LoginEmailStep
            email={email}
            setEmail={setEmail}
            onSubmit={handleEmailSubmit}
            loading={loading}
            error={error}
          />
        )}

        {step === 'register' && (
          <LoginRegisterStep
            form={registerForm}
            setForm={setRegisterForm}
            onSubmit={handleRegisterSubmit}
            onBack={() => {
              setError('');
              setStep('email');
            }}
            loading={loading}
            error={error}
          />
        )}

        {step === 'otp' && (
          <LoginOtpStep
            email={email || registerForm.email}
            otp={otp}
            setOtp={setOtp}
            onSubmit={handleOtpSubmit}
            onResend={handleResendOtp}
            loading={loading}
            error={error}
          />
        )}

        {step === 'email' && (
          <p className="mt-4 text-center text-xs text-ink-400">
            Are you an admin?{' '}
            <Link to="/admin/login" className="font-bold text-ink-500 hover:text-primary-600">
              Log in here
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
