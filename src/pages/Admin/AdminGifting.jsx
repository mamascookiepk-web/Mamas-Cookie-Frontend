import { useCallback, useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useGifting } from '@/hooks/useGifting';
import { usePolling } from '@/hooks/usePolling';
import { formatCurrency, formatDate } from '@/utils/format';
import AdminPageHeader from './AdminPageHeader';
import GiftingStatusBadge from './GiftingStatusBadge';
import AdminGiftingDetailModal from './AdminGiftingDetailModal';

const STATUS_FILTERS = [
  { value: '', label: 'All' },
  { value: 'NEW', label: 'New' },
  { value: 'CONTACTED', label: 'Contacted' },
  { value: 'CONFIRMED', label: 'Confirmed' },
  { value: 'CLOSED', label: 'Closed' },
];

export default function AdminGifting() {
  const {
    adminRequests,
    adminRequestsStatus,
    adminCurrentRequest,
    adminCurrentRequestStatus,
    error,
    statusUpdateStatus,
    statusUpdateError,
    fetchAdminGiftingRequests,
    fetchAdminGiftingById,
    changeGiftingStatus,
    clearAdminCurrentRequest,
  } = useGifting();

  const { markVisited } = useOutletContext();
  const [statusFilter, setStatusFilter] = useState('');
  const [viewingId, setViewingId] = useState(null);

  const refetch = useCallback(() => {
    fetchAdminGiftingRequests(statusFilter ? { status: statusFilter } : undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  usePolling(refetch, 15000);

  useEffect(() => {
    markVisited('gifting', adminRequests);
  }, [adminRequests, markVisited]);

  const openRequest = (request) => {
    setViewingId(request.id);
    fetchAdminGiftingById(request.id);
  };

  const closeModal = () => {
    setViewingId(null);
    clearAdminCurrentRequest();
  };

  const handleChangeStatus = (status) => {
    changeGiftingStatus(viewingId, { status });
  };

  const detail = adminCurrentRequest?.id === viewingId ? adminCurrentRequest : null;

  return (
    <div>
      <AdminPageHeader title="Corporate Gifting" subtitle="List" breadcrumb="Home / Gifting" />

      <div className="mt-6 flex flex-wrap gap-2">
        {STATUS_FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setStatusFilter(f.value)}
            className={`rounded-full px-4 py-2 text-sm font-bold transition-colors ${
              statusFilter === f.value
                ? 'bg-primary-500 text-white'
                : 'bg-white text-ink-900 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white">
        {adminRequestsStatus === 'loading' && adminRequests.length === 0 && (
          <p className="p-6 text-center text-ink-500">Loading inquiries...</p>
        )}

        {error && <p className="p-6 text-center text-primary-600">{error}</p>}

        {adminRequestsStatus === 'succeeded' && adminRequests.length === 0 && (
          <p className="p-6 text-center text-ink-500">No inquiries found.</p>
        )}

        {adminRequests.map((request) => (
          <button
            key={request.id}
            type="button"
            onClick={() => openRequest(request)}
            className="flex w-full items-center gap-4 border-b border-gray-100 px-4 py-4 text-left last:border-b-0 hover:bg-gray-50"
          >
            <div className="min-w-0 flex-1">
              <p className="font-bold text-ink-900">
                {request.name}
                {request.company && (
                  <span className="ml-2 font-normal text-ink-500">&middot; {request.company}</span>
                )}
              </p>
              <p className="text-xs text-ink-400">{formatDate(request.createdAt)}</p>
            </div>
            {request.budget != null && (
              <span className="hidden font-bold text-ink-900 sm:inline-block">
                {formatCurrency(request.budget)}
              </span>
            )}
            <GiftingStatusBadge status={request.status} />
          </button>
        ))}
      </div>

      {viewingId && (
        <>
          {adminCurrentRequestStatus === 'loading' && !detail ? (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/50 p-4">
              <p className="rounded-xl bg-white px-6 py-4 text-sm text-ink-500">
                Loading inquiry...
              </p>
            </div>
          ) : detail ? (
            <AdminGiftingDetailModal
              request={detail}
              onClose={closeModal}
              onChangeStatus={handleChangeStatus}
              submitting={statusUpdateStatus === 'loading'}
              error={statusUpdateError}
            />
          ) : null}
        </>
      )}
    </div>
  );
}
