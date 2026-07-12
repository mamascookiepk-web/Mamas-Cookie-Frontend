import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Wallet, ShoppingBag, Clock, TrendingUp, Package } from 'lucide-react';
import { useDashboard } from '@/hooks/useDashboard';
import { formatCurrency, formatDate } from '@/utils/format';
import AdminPageHeader from './AdminPageHeader';
import RevenueTrendChart from './RevenueTrendChart';
import OrderStatusBadge from '@/components/common/OrderStatusBadge';

const STATUS_COLORS = {
  PENDING: 'bg-gray-400',
  ACCEPTED: 'bg-blue-500',
  PREPARING: 'bg-amber-500',
  OUT_FOR_DELIVERY: 'bg-primary-400',
  READY_FOR_PICKUP: 'bg-primary-500',
  COMPLETED: 'bg-green-500',
  REJECTED: 'bg-red-400',
  CANCELLED: 'bg-red-600',
};

const STAT_CARDS = [
  {
    key: 'totalRevenue',
    label: 'Total Revenue',
    icon: Wallet,
    format: formatCurrency,
  },
  {
    key: 'totalOrders',
    label: 'Total Orders',
    icon: ShoppingBag,
    format: (v) => v,
  },
  {
    key: 'pendingOrders',
    label: 'Pending Orders',
    icon: Clock,
    format: (v) => v,
  },
  {
    key: 'averageOrderValue',
    label: 'Avg. Order Value',
    icon: TrendingUp,
    format: formatCurrency,
  },
];

export default function AdminDashboard() {
  const { stats, status, error, fetchDashboardStats } = useDashboard();

  useEffect(() => {
    fetchDashboardStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (status === 'loading' || status === 'idle') {
    return (
      <div>
        <AdminPageHeader title="Dashboard" breadcrumb="Home / Dashboard" />
        <p className="mt-6 text-center text-sm text-ink-500">Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <AdminPageHeader title="Dashboard" breadcrumb="Home / Dashboard" />
        <p className="mt-6 text-center text-sm text-primary-600">{error}</p>
      </div>
    );
  }

  const totalStatusCount = Object.values(stats.ordersByStatus).reduce((sum, n) => sum + n, 0);

  return (
    <div>
      <AdminPageHeader title="Dashboard" breadcrumb="Home / Dashboard" />

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STAT_CARDS.map(({ key, label, icon: Icon, format }) => (
          <div key={key} className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-ink-500">{label}</p>
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50 text-primary-500">
                <Icon size={17} />
              </span>
            </div>
            <p className="mt-3 text-2xl font-extrabold text-ink-900">{format(stats[key])}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-5 lg:col-span-2">
          <p className="text-sm font-bold text-ink-900">Revenue — Last 7 Days</p>
          <div className="mt-3">
            <RevenueTrendChart data={stats.revenueLast7Days} />
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <p className="text-sm font-bold text-ink-900">Orders by Status</p>

          <div className="mt-4 flex h-3 w-full overflow-hidden rounded-full bg-gray-100">
            {totalStatusCount === 0 ? (
              <div className="h-full w-full bg-gray-200" />
            ) : (
              Object.entries(stats.ordersByStatus)
                .filter(([, count]) => count > 0)
                .map(([statusKey, count]) => (
                  <div
                    key={statusKey}
                    style={{ width: `${(count / totalStatusCount) * 100}%` }}
                    className={STATUS_COLORS[statusKey] ?? 'bg-gray-400'}
                  />
                ))
            )}
          </div>

          <div className="mt-4 space-y-2">
            {Object.entries(stats.ordersByStatus).map(([statusKey, count]) => (
              <div key={statusKey} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className={`h-2.5 w-2.5 rounded-full ${STATUS_COLORS[statusKey] ?? 'bg-gray-400'}`} />
                  <span className="text-ink-600">{statusKey.replace(/_/g, ' ')}</span>
                </div>
                <span className="font-bold text-ink-900">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-ink-900">Recent Orders</p>
            <Link to="/admin/orders" className="text-xs font-bold text-primary-600 hover:text-primary-700">
              View All
            </Link>
          </div>

          {stats.recentOrders.length === 0 ? (
            <p className="mt-4 text-sm text-ink-400">No orders yet.</p>
          ) : (
            <div className="mt-3 divide-y divide-gray-100">
              {stats.recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between py-2.5 text-sm">
                  <div>
                    <p className="font-bold text-ink-900">
                      #{order.id} &middot; {order.customerName}
                    </p>
                    <p className="text-xs text-ink-400">{formatDate(order.createdAt)}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-ink-900">{formatCurrency(order.totalAmount)}</span>
                    <OrderStatusBadge status={order.status} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <p className="text-sm font-bold text-ink-900">Top Selling Products</p>

          {stats.topProducts.length === 0 ? (
            <p className="mt-4 text-sm text-ink-400">No sales yet.</p>
          ) : (
            <div className="mt-3 space-y-3">
              {stats.topProducts.map((product, index) => {
                const maxSold = stats.topProducts[0].quantitySold || 1;
                return (
                  <div key={product.productId}>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-50 text-xs font-bold text-primary-600">
                          {index + 1}
                        </span>
                        <span className="font-medium text-ink-900">{product.productName}</span>
                      </div>
                      <span className="flex items-center gap-1 font-bold text-ink-900">
                        <Package size={13} className="text-ink-400" />
                        {product.quantitySold}
                      </span>
                    </div>
                    <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                      <div
                        style={{ width: `${(product.quantitySold / maxSold) * 100}%` }}
                        className="h-full rounded-full bg-primary-500"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
