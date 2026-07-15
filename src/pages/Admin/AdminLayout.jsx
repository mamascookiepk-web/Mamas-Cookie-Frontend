import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminTopbar from './AdminTopbar';
import ScrollToTop from '@/components/common/ScrollToTop';
import { useAdminNotificationDots } from '@/hooks/useAdminNotificationDots';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { hasNew, markVisited } = useAdminNotificationDots();

  return (
    <div className="flex min-h-screen bg-gray-50">
      <ScrollToTop />
      <AdminSidebar open={sidebarOpen} onNavigate={() => setSidebarOpen(false)} hasNew={hasNew} />

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-ink-900/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex min-h-screen flex-1 flex-col">
        <AdminTopbar onMenuClick={() => setSidebarOpen((open) => !open)} />
        <main className="flex-1 p-4 sm:p-6">
          <Outlet context={{ markVisited }} />
        </main>
      </div>
    </div>
  );
}
