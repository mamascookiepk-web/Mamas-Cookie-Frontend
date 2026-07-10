import AdminPageHeader from './AdminPageHeader';

export default function AdminDashboard() {
  return (
    <div>
      <AdminPageHeader title="Dashboard" subtitle="List" breadcrumb="Home / Dashboard" />

      <div className="mt-6 rounded-xl border border-gray-200 bg-white p-10 text-center text-ink-500">
        Dashboard content coming soon.
      </div>
    </div>
  );
}
