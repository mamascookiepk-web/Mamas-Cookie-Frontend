import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { checkEmail, requestOtp, verifyOtp } from '@/services/authService';
import { setCredentials } from '@/store/authSlice';
import { useAuth } from '@/hooks/useAuth';
import { useLocalOrder } from '@/hooks/useLocalOrder';
import LoginEmailStep from '@/components/common/location/LoginEmailStep';
import LoginOtpStep from '@/components/common/location/LoginOtpStep';
import LoginRegisterStep from '@/components/common/location/LoginRegisterStep';
import DeliveryAddressStep from '@/components/common/location/DeliveryAddressStep';

const initialRegisterForm = { name: '', email: '', gender: '', dob: '', phone: '' };

export default function CheckoutAddressGate() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth();
  const { area, setDeliveryAddress } = useLocalOrder();

  const [screen, setScreen] = useState(isAuthenticated ? 'address' : 'login-email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [registerForm, setRegisterForm] = useState(initialRegisterForm);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    if (isAuthenticated && screen.startsWith('login')) {
      setScreen('address');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);
    try {
      const { registered } = await checkEmail(email);
      if (registered) {
        await requestOtp({ email });
        setScreen('login-otp');
      } else {
        setRegisterForm((prev) => ({ ...prev, email }));
        setScreen('login-register');
      }
    } catch (err) {
      setAuthError(err.message);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);
    try {
      await requestOtp({
        email: registerForm.email,
        name: registerForm.name,
        phone: registerForm.phone,
        gender: registerForm.gender,
      });
      setScreen('login-otp');
    } catch (err) {
      setAuthError(err.message);
    } finally {
      setAuthLoading(false);
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
    setAuthError('');
    setAuthLoading(true);
    try {
      const data = await verifyOtp({ email: email || registerForm.email, otp });
      dispatch(setCredentials(data));
      setScreen('address');
    } catch (err) {
      setAuthError(err.message);
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        {screen === 'login-email' && (
          <>
            <p className="text-center text-sm font-bold text-ink-900">
              Log in to continue to checkout
            </p>
            <LoginEmailStep
              email={email}
              setEmail={setEmail}
              onSubmit={handleEmailSubmit}
              loading={authLoading}
              error={authError}
            />
          </>
        )}

        {screen === 'login-register' && (
          <LoginRegisterStep
            form={registerForm}
            setForm={setRegisterForm}
            onSubmit={handleRegisterSubmit}
            onBack={() => {
              setAuthError('');
              setScreen('login-email');
            }}
            loading={authLoading}
            error={authError}
          />
        )}

        {screen === 'login-otp' && (
          <LoginOtpStep
            email={email || registerForm.email}
            otp={otp}
            setOtp={setOtp}
            onSubmit={handleOtpSubmit}
            onResend={handleResendOtp}
            loading={authLoading}
            error={authError}
          />
        )}

        {screen === 'address' && (
          <>
            <h2 className="text-center text-xl font-extrabold text-ink-900">
              Where should we deliver?
            </h2>
            <DeliveryAddressStep
              initialAreaId={area?.id}
              onConfirm={(_area, address) => setDeliveryAddress(address)}
            />
          </>
        )}
      </div>
    </div>
  );
}
