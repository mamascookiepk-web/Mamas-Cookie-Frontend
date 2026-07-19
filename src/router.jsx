import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import Home from '@/pages/Home/Home';
import Checkout from '@/pages/Checkout/Checkout';
import Login from '@/pages/Login/Login';
import Gifting from '@/pages/Gifting/Gifting';
import EventsCatering from '@/pages/EventsCatering/EventsCatering';
import OurStory from '@/pages/OurStory/OurStory';
import Local from '@/pages/Local/Local';
import Profile from '@/pages/Profile/Profile';
import TrackOrder from '@/pages/TrackOrder/TrackOrder';
import Wishlist from '@/pages/Wishlist/Wishlist';
import AdminLogin from '@/pages/AdminLogin/AdminLogin';
import AdminLayout from '@/pages/Admin/AdminLayout';
import AdminDashboard from '@/pages/Admin/AdminDashboard';
import AdminProducts from '@/pages/Admin/AdminProducts';
import AdminLocations from '@/pages/Admin/AdminLocations';
import AdminOrders from '@/pages/Admin/AdminOrders';
import AdminGifting from '@/pages/Admin/AdminGifting';
import AdminTestimonials from '@/pages/Admin/AdminTestimonials';
import AdminCatering from '@/pages/Admin/AdminCatering';
import AdminMonthlyDrop from '@/pages/Admin/AdminMonthlyDrop';
import AdminWeeklyDrop from '@/pages/Admin/AdminWeeklyDrop';
import AdminGst from '@/pages/Admin/AdminGst';
import NotFound from '@/pages/NotFound/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'checkout', element: <Checkout /> },
      { path: 'login', element: <Login /> },
      { path: 'gifting', element: <Gifting /> },
      { path: 'events-catering', element: <EventsCatering /> },
      { path: 'our-story', element: <OurStory /> },
      { path: 'local', element: <Local /> },
      { path: 'profile', element: <Profile /> },
      { path: 'track-order', element: <TrackOrder /> },
      { path: 'wishlist', element: <Wishlist /> },
      { path: '*', element: <NotFound /> },
    ],
  },
  { path: '/admin/login', element: <AdminLogin /> },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: 'products', element: <AdminProducts /> },
      { path: 'locations', element: <AdminLocations /> },
      { path: 'orders', element: <AdminOrders /> },
      { path: 'gifting', element: <AdminGifting /> },
      { path: 'gifting-testimonials', element: <AdminTestimonials /> },
      { path: 'catering', element: <AdminCatering /> },
      { path: 'monthly-drop', element: <AdminMonthlyDrop /> },
      { path: 'weekly-drop', element: <AdminWeeklyDrop /> },
      { path: 'gst', element: <AdminGst /> },
    ],
  },
]);

export default router;
