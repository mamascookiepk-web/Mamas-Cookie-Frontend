import { useCallback, useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Star } from 'lucide-react';
import { useTestimonials } from '@/hooks/useTestimonials';
import { usePolling } from '@/hooks/usePolling';
import { formatDate } from '@/utils/format';
import AdminPageHeader from './AdminPageHeader';
import TestimonialStatusBadge from './TestimonialStatusBadge';
import AdminTestimonialDetailModal from './AdminTestimonialDetailModal';

const STATUS_FILTERS = [
  { value: '', label: 'All' },
  { value: 'PENDING', label: 'Pending' },
  { value: 'APPROVED', label: 'Approved' },
  { value: 'REJECTED', label: 'Rejected' },
];

export default function AdminTestimonials() {
  const {
    adminItems,
    adminStatus,
    adminCurrent,
    adminCurrentStatus,
    error,
    statusUpdateStatus,
    statusUpdateError,
    fetchAdminTestimonials,
    fetchAdminTestimonialById,
    changeTestimonialStatus,
    clearAdminCurrentTestimonial,
  } = useTestimonials();

  const { markVisited } = useOutletContext();
  const [statusFilter, setStatusFilter] = useState('');
  const [viewingId, setViewingId] = useState(null);

  const refetch = useCallback(() => {
    fetchAdminTestimonials(statusFilter ? { status: statusFilter } : undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  usePolling(refetch, 15000);

  useEffect(() => {
    markVisited('testimonials', adminItems);
  }, [adminItems, markVisited]);

  const openTestimonial = (testimonial) => {
    setViewingId(testimonial.id);
    fetchAdminTestimonialById(testimonial.id);
  };

  const closeModal = () => {
    setViewingId(null);
    clearAdminCurrentTestimonial();
  };

  const handleChangeStatus = (status) => {
    changeTestimonialStatus(viewingId, { status });
  };

  const detail = adminCurrent?.id === viewingId ? adminCurrent : null;

  return (
    <div>
      <AdminPageHeader
        title="Corporate Gifting Reviews"
        subtitle="List"
        breadcrumb="Home / Testimonials"
      />

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
        {adminStatus === 'loading' && adminItems.length === 0 && (
          <p className="p-6 text-center text-ink-500">Loading reviews...</p>
        )}

        {error && <p className="p-6 text-center text-primary-600">{error}</p>}

        {adminStatus === 'succeeded' && adminItems.length === 0 && (
          <p className="p-6 text-center text-ink-500">No reviews found.</p>
        )}

        {adminItems.map((testimonial) => (
          <button
            key={testimonial.id}
            type="button"
            onClick={() => openTestimonial(testimonial)}
            className="flex w-full items-center gap-4 border-b border-gray-100 px-4 py-4 text-left last:border-b-0 hover:bg-gray-50"
          >
            <div className="min-w-0 flex-1">
              <p className="font-bold text-ink-900">
                {testimonial.name}
                <span className="ml-2 font-normal text-ink-500">
                  &middot; {testimonial.companyName}
                </span>
              </p>
              <p className="text-xs text-ink-400">{formatDate(testimonial.createdAt)}</p>
            </div>
            <div className="hidden items-center gap-0.5 sm:flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={i < testimonial.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}
                />
              ))}
            </div>
            <TestimonialStatusBadge status={testimonial.status} />
          </button>
        ))}
      </div>

      {viewingId && (
        <>
          {adminCurrentStatus === 'loading' && !detail ? (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/50 p-4">
              <p className="rounded-xl bg-white px-6 py-4 text-sm text-ink-500">
                Loading review...
              </p>
            </div>
          ) : detail ? (
            <AdminTestimonialDetailModal
              testimonial={detail}
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
