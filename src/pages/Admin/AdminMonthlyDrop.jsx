import { useEffect, useRef, useState } from 'react';
import { Image as ImageIcon, Upload } from 'lucide-react';
import { useMonthlyDrop } from '@/hooks/useMonthlyDrop';
import { formatDate } from '@/utils/format';
import { getImageSizeError } from '@/utils/fileValidation';
import AdminPageHeader from './AdminPageHeader';

export default function AdminMonthlyDrop() {
  const { imageUrl, updatedAt, status, uploadStatus, error, fetchMonthlyDrop, uploadMonthlyDrop } =
    useMonthlyDrop();
  const fileInputRef = useRef(null);
  const [sizeError, setSizeError] = useState('');

  useEffect(() => {
    fetchMonthlyDrop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;

    const error = getImageSizeError(file);
    if (error) {
      setSizeError(error);
      return;
    }

    setSizeError('');
    uploadMonthlyDrop(file);
  };

  const uploading = uploadStatus === 'loading';

  return (
    <div>
      <AdminPageHeader title="Monthly Drop" subtitle="Promo Image" breadcrumb="Home / Monthly Drop" />

      <div className="mt-6 max-w-md rounded-xl border border-gray-200 bg-white p-6">
        {status === 'loading' ? (
          <p className="text-center text-sm text-ink-500">Loading...</p>
        ) : (
          <>
            <div className="flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-primary-50">
              {imageUrl ? (
                <img src={imageUrl} alt="Monthly drop" className="h-full w-full object-cover" />
              ) : (
                <div className="flex flex-col items-center gap-2 text-primary-300">
                  <ImageIcon size={40} strokeWidth={1.5} />
                  <span className="text-sm font-medium">No image uploaded yet</span>
                </div>
              )}
            </div>

            {updatedAt && (
              <p className="mt-3 text-xs text-ink-400">Last updated {formatDate(updatedAt)}</p>
            )}

            {(sizeError || error) && (
              <p className="mt-3 text-sm text-primary-600">{sizeError || error}</p>
            )}

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-primary-500 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-primary-600 disabled:opacity-50"
            >
              <Upload size={16} />
              {uploading ? 'Uploading...' : imageUrl ? 'Change Image' : 'Upload Image'}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </>
        )}
      </div>
    </div>
  );
}
