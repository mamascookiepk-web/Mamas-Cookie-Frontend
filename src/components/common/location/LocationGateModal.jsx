import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ArrowLeft, Cookie } from 'lucide-react';
import { getPickupCenters } from '@/services/locationService';
import { checkEmail, requestOtp, verifyOtp } from '@/services/authService';
import { setCredentials } from '@/store/authSlice';
import { useLocalOrder } from '@/hooks/useLocalOrder';
import { useAuth } from '@/hooks/useAuth';
import LoginEmailStep from './LoginEmailStep';
import LoginOtpStep from './LoginOtpStep';
import LoginRegisterStep from './LoginRegisterStep';
import DeliveryAddressStep from './DeliveryAddressStep';

const initialRegisterForm = { name: '', email: '', gender: '', dob: '', phone: '' };

export default function LocationGateModal() {
  const dispatch = useDispatch();
  const { setDelivery, setPickup } = useLocalOrder();
  const { isAuthenticated } = useAuth();

  const [screen, setScreen] = useState('type');
  const [orderType, setOrderType] = useState('DELIVERY');

  const [pickupCenters, setPickupCenters] = useState([]);
  const [selectedPickupId, setSelectedPickupId] = useState('');
  const [loadingPickup, setLoadingPickup] = useState(false);

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [registerForm, setRegisterForm] = useState(initialRegisterForm);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  const handleContinue = () => {
    if (orderType === 'PICKUP') {
      setLoadingPickup(true);
      getPickupCenters()
        .then((data) => setPickupCenters(data.content ?? data))
        .catch(() => setPickupCenters([]))
        .finally(() => setLoadingPickup(false));
      setScreen('pickup');
    } else {
      setScreen(isAuthenticated ? 'delivery-address' : 'login-email');
    }
  };

  const handlePickupSubmit = () => {
    const selected = pickupCenters.find((c) => String(c.id) === selectedPickupId);
    if (selected) setPickup(selected);
  };

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
      setScreen('delivery-address');
    } catch (err) {
      setAuthError(err.message);
    } finally {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && screen.startsWith('login')) {
      setScreen('delivery-address');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const backToType = () => {
    setScreen('type');
    setAuthError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        {screen !== 'type' && (
          <button
            type="button"
            onClick={backToType}
            aria-label="Back"
            className="mb-2 flex items-center gap-1 text-sm font-medium text-ink-500 hover:text-primary-600"
          >
            <ArrowLeft size={14} />
            Back
          </button>
        )}

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-xl bg-primary-600 text-white">
          <Cookie size={32} strokeWidth={1.5} />
        </div>

        {screen === 'type' && (
          <>
            <h2 className="mt-5 text-center text-xl font-extrabold text-ink-900">
              Select your order type
            </h2>

            <div className="mt-4 flex rounded-full bg-gray-100 p-1">
              <button
                type="button"
                onClick={() => setOrderType('DELIVERY')}
                className={`flex-1 rounded-full py-2 text-sm font-bold transition-colors ${
                  orderType === 'DELIVERY' ? 'bg-primary-900 text-white' : 'text-ink-500'
                }`}
              >
                Delivery
              </button>
              <button
                type="button"
                onClick={() => setOrderType('PICKUP')}
                className={`flex-1 rounded-full py-2 text-sm font-bold transition-colors ${
                  orderType === 'PICKUP' ? 'bg-primary-900 text-white' : 'text-ink-500'
                }`}
              >
                Pick-Up
              </button>
            </div>

            <button
              type="button"
              onClick={handleContinue}
              className="mt-6 w-full rounded-lg bg-primary-500 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-600"
            >
              Continue
            </button>
          </>
        )}

        {screen === 'pickup' && (
          <>
            <h2 className="mt-5 text-center text-xl font-extrabold text-ink-900">
              Which outlet would you like to pick up from?
            </h2>

            <div className="mt-5">
              <label className="mb-2 block text-sm font-bold text-ink-900">
                Select Pickup Center
              </label>
              <select
                value={selectedPickupId}
                onChange={(e) => setSelectedPickupId(e.target.value)}
                disabled={loadingPickup}
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-ink-900 focus:border-primary-500 focus:outline-none disabled:opacity-50"
              >
                <option value="">
                  {loadingPickup ? 'Loading...' : 'Select Pickup Center'}
                </option>
                {pickupCenters.map((center) => (
                  <option key={center.id} value={center.id}>
                    {center.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={handlePickupSubmit}
              disabled={!selectedPickupId}
              className="mt-6 w-full rounded-lg bg-primary-500 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-ink-400"
            >
              Select
            </button>
          </>
        )}

        {screen === 'login-email' && (
          <>
            <p className="mt-5 text-center text-sm font-bold text-ink-900">
              Log in to select a delivery address
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

        {screen === 'delivery-address' && (
          <>
            <h2 className="mt-5 text-center text-xl font-extrabold text-ink-900">
              Please select your location
            </h2>
            <DeliveryAddressStep onConfirm={(area, address) => setDelivery(area, address)} />
          </>
        )}
      </div>
    </div>
  );
}
