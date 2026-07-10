import { Plus, X } from 'lucide-react';

export default function FAQItem({ question, answer, open, onToggle }) {
  return (
    <div className="px-6 py-6 sm:px-8">
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-bold text-primary-700">{question}</h3>
        <button
          type="button"
          aria-label={open ? 'Collapse answer' : 'Expand answer'}
          onClick={onToggle}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-900 text-white transition-colors hover:bg-primary-800"
        >
          {open ? <X size={16} /> : <Plus size={16} />}
        </button>
      </div>
      {open && (
        <p className="mt-3 text-sm leading-relaxed text-ink-700 sm:text-base [&_a]:font-medium [&_a]:text-primary-700 [&_a]:underline">
          {answer}
        </p>
      )}
    </div>
  );
}
