import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { logout } from '@/store/authSlice';

function App() {
  const dispatch = useDispatch();

  // When the axios layer detects an expired/invalid session it fires
  // `auth:expired`; reset the Redux auth state so the UI reflects logged-out.
  useEffect(() => {
    const handleExpired = () => dispatch(logout());
    window.addEventListener('auth:expired', handleExpired);
    return () => window.removeEventListener('auth:expired', handleExpired);
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
