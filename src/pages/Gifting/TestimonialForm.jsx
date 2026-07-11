import { useState } from 'react';
import { User, Building2, Briefcase, MessageSquare, Star, Send, CheckCircle2 } from 'lucide-react';
import { useTestimonials } from '@/hooks/useTestimonials';

const initialForm = {
  name: '',
  companyName: '',
  position: '',
  reviewText: '',
  rating: 0,
};

const fieldClass =
  'w-full rounded-lg border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-ink-900 placeholder:text-ink-400 transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100';

function FieldIcon({ icon: Icon, top = false }) {
  return (
    <span
      className={`pointer-events-none absolute left-3.5 text-ink-300 ${
        top ? 'top-3.5' : 'top-1/2 -translate-y-1/2'
      }`}
    >
      <Icon size={17} />
    </span>
  );
}

export default function TestimonialForm() {
  const [form, setForm] = useState(initialForm);
  const [hoverRating, setHoverRating] = useState(0);
  const { submitTestimonial, submitStatus, submitError } = useTestimonials();

  const handleChange = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.rating === 0) return;
    const result = await submitTestimonial(form);
    if (result.meta.requestStatus === 'fulfilled') {
      setForm(initialForm);
    }
  };

  const submitting = submitStatus === 'loading';
  const success = submitStatus === 'succeeded';

  return (
    <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <div className="text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-primary-600">
          Share Your Experience
        </span>
        <h2 className="mt-2 font-heading text-2xl font-extrabold text-ink-900 sm:text-3xl">
          Worked With Us? Leave a Review
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-ink-500">
          Approved reviews are featured above for other companies to see.
        </p>
      </div>

      <div className="mt-8 rounded-3xl border border-gray-100 bg-white p-6 shadow-lg sm:p-8">
        {success ? (
          <div className="flex flex-col items-center gap-3 py-8 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-green-600">
              <CheckCircle2 size={28} />
            </span>
            <p className="font-bold text-ink-900">Thank you for your review!</p>
            <p className="max-w-xs text-sm text-ink-500">
              It&apos;s awaiting approval and will appear here once reviewed.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="relative">
                <FieldIcon icon={User} />
                <input
                  required
                  placeholder="Name *"
                  value={form.name}
                  onChange={handleChange('name')}
                  className={fieldClass}
                />
              </div>
              <div className="relative">
                <FieldIcon icon={Building2} />
                <input
                  required
                  placeholder="Company Name *"
                  value={form.companyName}
                  onChange={handleChange('companyName')}
                  className={fieldClass}
                />
              </div>
            </div>

            <div className="relative">
              <FieldIcon icon={Briefcase} />
              <input
                required
                placeholder="Position *"
                value={form.position}
                onChange={handleChange('position')}
                className={fieldClass}
              />
            </div>

            <div className="relative">
              <FieldIcon icon={MessageSquare} top />
              <textarea
                required
                rows={4}
                placeholder="Your review *"
                value={form.reviewText}
                onChange={handleChange('reviewText')}
                className={`${fieldClass} resize-none`}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-bold text-ink-500">Rating *</label>
              <div className="flex gap-1" onMouseLeave={() => setHoverRating(0)}>
                {Array.from({ length: 5 }).map((_, i) => {
                  const value = i + 1;
                  const filled = (hoverRating || form.rating) >= value;
                  return (
                    <button
                      key={value}
                      type="button"
                      aria-label={`Rate ${value} out of 5`}
                      onMouseEnter={() => setHoverRating(value)}
                      onClick={() => setForm({ ...form, rating: value })}
                      className="p-0.5"
                    >
                      <Star
                        size={26}
                        className={filled ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}
                      />
                    </button>
                  );
                })}
              </div>
              {form.rating === 0 && (
                <p className="mt-1 text-xs text-ink-400">Tap a star to rate.</p>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting || form.rating === 0}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-500 px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-primary-600 disabled:opacity-50 sm:w-auto"
            >
              <Send size={16} />
              {submitting ? 'Submitting...' : 'Submit Review'}
            </button>

            {submitError && <p className="text-sm font-medium text-primary-600">{submitError}</p>}
          </form>
        )}
      </div>
    </section>
  );
}
