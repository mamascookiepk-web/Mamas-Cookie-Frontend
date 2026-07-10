import { useEffect, useRef, useState } from 'react';
import { Pencil, Plus, X } from 'lucide-react';
import { useWeeklyDrop } from '@/hooks/useWeeklyDrop';
import { getImageSizeError } from '@/utils/fileValidation';
import AdminPageHeader from './AdminPageHeader';
import ConfirmDialog from '@/components/common/ConfirmDialog';

const SLOT_COUNT = 5;

export default function AdminWeeklyDrop() {
  const { items, status, error, fetchWeeklyDrop, uploadWeeklyDrop, removeWeeklyDrop } =
    useWeeklyDrop();
  const fileInputRef = useRef(null);
  const [pendingSlot, setPendingSlot] = useState(null); // { index, existingImage } | null
  const [busyId, setBusyId] = useState(null); // image id (or 'new') currently uploading/deleting
  const [deletingImage, setDeletingImage] = useState(null);
  const [sizeError, setSizeError] = useState('');

  useEffect(() => {
    fetchWeeklyDrop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const slots = Array.from({ length: SLOT_COUNT }, (_, i) => items[i] ?? null);

  const triggerFilePicker = (index, existingImage) => {
    setPendingSlot({ index, existingImage });
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file || !pendingSlot) return;

    const error = getImageSizeError(file);
    if (error) {
      setSizeError(error);
      setPendingSlot(null);
      return;
    }
    setSizeError('');

    const { existingImage } = pendingSlot;
    setBusyId(existingImage ? existingImage.id : 'new');

    if (existingImage) {
      await removeWeeklyDrop(existingImage.id);
    }
    await uploadWeeklyDrop(file);

    setBusyId(null);
    setPendingSlot(null);
  };

  const handleConfirmDelete = async () => {
    setBusyId(deletingImage.id);
    await removeWeeklyDrop(deletingImage.id);
    setBusyId(null);
    setDeletingImage(null);
  };

  return (
    <div>
      <AdminPageHeader
        title="Weekly Drop"
        subtitle={`${items.length} / ${SLOT_COUNT} Images`}
        breadcrumb="Home / Weekly Drop"
      />

      {status === 'loading' ? (
        <p className="mt-6 text-center text-sm text-ink-500">Loading images...</p>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {slots.map((image, index) => {
            const isBusy = image ? busyId === image.id : busyId === 'new' && pendingSlot?.index === index;

            return (
              <div
                key={image?.id ?? `empty-${index}`}
                className="relative aspect-square overflow-hidden rounded-xl border border-gray-200 bg-primary-50"
              >
                {image ? (
                  <>
                    <img src={image.url} alt="" className="h-full w-full object-cover" />
                    <div className="absolute inset-x-0 bottom-0 flex justify-center gap-2 bg-ink-900/50 p-2">
                      <button
                        type="button"
                        aria-label="Change image"
                        disabled={isBusy}
                        onClick={() => triggerFilePicker(index, image)}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-ink-700 hover:bg-primary-50 disabled:opacity-50"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        type="button"
                        aria-label="Remove image"
                        disabled={isBusy}
                        onClick={() => setDeletingImage(image)}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-ink-700 hover:bg-primary-100 hover:text-primary-600 disabled:opacity-50"
                      >
                        <X size={14} />
                      </button>
                    </div>
                    {isBusy && (
                      <div className="absolute inset-0 flex items-center justify-center bg-white/70 text-xs font-bold text-ink-600">
                        Updating...
                      </div>
                    )}
                  </>
                ) : (
                  <button
                    type="button"
                    disabled={isBusy}
                    onClick={() => triggerFilePicker(index, null)}
                    className="flex h-full w-full flex-col items-center justify-center gap-2 text-primary-300 hover:text-primary-400 disabled:opacity-50"
                  >
                    {isBusy ? (
                      <span className="text-xs font-bold text-ink-600">Uploading...</span>
                    ) : (
                      <>
                        <Plus size={24} />
                        <span className="text-xs font-medium">Add Image</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {(sizeError || error) && (
        <p className="mt-4 text-sm text-primary-600">{sizeError || error}</p>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {deletingImage && (
        <ConfirmDialog
          title="Remove Image?"
          message="Are you sure you want to remove this image from the weekly drop?"
          confirmLabel="Yes, Remove"
          cancelLabel="No"
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeletingImage(null)}
        />
      )}
    </div>
  );
}
