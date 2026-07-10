export default function ConfirmDialog({ title, message, confirmLabel = 'Yes', cancelLabel = 'No', onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-ink-900/50 p-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
        <h3 className="text-lg font-extrabold text-ink-900">{title}</h3>
        <p className="mt-2 text-sm text-ink-500">{message}</p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg bg-gray-100 px-5 py-2.5 text-sm font-bold text-ink-900 transition-colors hover:bg-gray-200"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-lg bg-primary-500 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-primary-600"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
