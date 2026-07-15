import { useCallback, useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useCatering } from '@/hooks/useCatering';
import { usePolling } from '@/hooks/usePolling';
import { formatDate } from '@/utils/format';
import AdminPageHeader from './AdminPageHeader';
import GiftingStatusBadge from './GiftingStatusBadge';
import AdminCateringDetailModal from './AdminCateringDetailModal';

const STATUS_FILTERS = [
  { value: '', label: 'All' },
  { value: 'NEW', label: 'New' },
  { value: 'CONTACTED', label: 'Contacted' },
  { value: 'CONFIRMED', label: 'Confirmed' },
  { value: 'CLOSED', label: 'Closed' },
];

export default function AdminCatering() {
  const {
    adminRequests,
    adminRequestsStatus,
    adminCurrentRequest,
    adminCurrentRequestStatus,
    error,
    statusUpdateStatus,
    statusUpdateError,
    fetchAdminCateringRequests,
    fetchAdminCateringById,
    changeCateringStatus,
    clearAdminCurrentCateringRequest,
  } = useCatering();

  const { markVisited } = useOutletContext();
  const [statusFilter, setStatusFilter] = useState('');
  const [viewingId, setViewingId] = useState(null);

  const refetch = useCallback(() => {
    fetchAdminCateringRequests(statusFilter ? { status: statusFilter } : undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  usePolling(refetch, 15000);

  useEffect(() => {
    markVisited('catering', adminRequests);
  }, [adminRequests, markVisited]);

  const openRequest = (request) => {
    setViewingId(request.id);
    fetchAdminCateringById(request.id);
  };

  const closeModal = () => {
    setViewingId(null);
    clearAdminCurrentCateringRequest();
  };

  const handleChangeStatus = (status) => {
    changeCateringStatus(viewingId, { status });
  };

  const detail = adminCurrentRequest?.id === viewingId ? adminCurrentRequest : null;

  return (
    <div>
      <AdminPageHeader title="Events & Catering" subtitle="List" breadcrumb="Home / Catering" />

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
                {request.firstName} {request.lastName}
                <span className="ml-2 font-normal text-ink-500">
                  &middot; {request.eventType}
                </span>
              </p>
              <p className="text-xs text-ink-400">{formatDate(request.createdAt)}</p>
            </div>
            <span className="hidden text-sm text-ink-500 sm:inline-block">
              {request.guestCount} guests
            </span>
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
            <AdminCateringDetailModal
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
