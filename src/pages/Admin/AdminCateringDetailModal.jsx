import { X } from 'lucide-react';
import { formatDate } from '@/utils/format';
import GiftingStatusBadge from './GiftingStatusBadge';

const STATUSES = ['NEW', 'CONTACTED', 'CONFIRMED', 'CLOSED'];

export default function AdminCateringDetailModal({ request, onClose, onChangeStatus, submitting, error }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/50 p-4">
      <div className="flex max-h-[90vh] w-full max-w-lg flex-col rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-200 p-5">
          <div>
            <h2 className="text-lg font-extrabold text-ink-900">
              {request.firstName} {request.lastName}
            </h2>
            <p className="text-xs text-ink-400">{formatDate(request.createdAt)}</p>
          </div>
          <div className="flex items-center gap-3">
            <GiftingStatusBadge status={request.status} />
            <button
              type="button"
              aria-label="Close"
              onClick={onClose}
              className="text-ink-400 transition-colors hover:text-primary-600"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          <dl className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
            <div>
              <dt className="font-bold text-ink-900">Email</dt>
              <dd className="text-ink-600">{request.email}</dd>
            </div>
            <div>
              <dt className="font-bold text-ink-900">Phone</dt>
              <dd className="text-ink-600">{request.phone}</dd>
            </div>
            <div>
              <dt className="font-bold text-ink-900">Event Type</dt>
              <dd className="text-ink-600">{request.eventType}</dd>
            </div>
            <div>
              <dt className="font-bold text-ink-900">Event Date</dt>
              <dd className="text-ink-600">{formatDate(request.eventDate)}</dd>
            </div>
            <div>
              <dt className="font-bold text-ink-900">Guest Count</dt>
              <dd className="text-ink-600">{request.guestCount}</dd>
            </div>
          </dl>

          <div className="mt-5">
            <p className="text-sm font-bold text-ink-900">Venue Address</p>
            <p className="mt-1 whitespace-pre-wrap text-sm text-ink-600">
              {request.venueAddress}
            </p>
          </div>
        </div>

        <div className="border-t border-gray-200 p-5">
          {error && <p className="mb-3 text-sm text-primary-600">{error}</p>}
          <p className="mb-2 text-sm font-bold text-ink-900">Update Status</p>
          <div className="flex flex-wrap gap-2">
            {STATUSES.map((status) => (
              <button
                key={status}
                type="button"
                disabled={submitting || status === request.status}
                onClick={() => onChangeStatus(status)}
                className={`rounded-full px-4 py-2 text-sm font-bold transition-colors disabled:cursor-not-allowed ${
                  status === request.status
                    ? 'bg-primary-100 text-primary-700'
                    : 'bg-gray-100 text-ink-700 hover:bg-primary-500 hover:text-white'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
