import { useState } from 'react';
import { Gift } from 'lucide-react';
import { useGifting } from '@/hooks/useGifting';

const initialForm = {
  name: '',
  email: '',
  phone: '',
  company: '',
  requirements: '',
  eventDate: '',
  budget: '',
};

export default function GiftingHero() {
  const [form, setForm] = useState(initialForm);
  const { submitGifting, submitStatus, submitError } = useGifting();

  const handleChange = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await submitGifting({
      ...form,
      budget: form.budget === '' ? undefined : Number(form.budget),
      eventDate: form.eventDate || undefined,
    });
    if (result.meta.requestStatus === 'fulfilled') {
      setForm(initialForm);
    }
  };

  const submitting = submitStatus === 'loading';
  const success = submitStatus === 'succeeded';

  return (
    <section id="gifting-form" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="flex aspect-[4/3] items-center justify-center rounded-2xl bg-primary-50 sm:aspect-[16/11] lg:aspect-[5/4]">
          <div className="flex flex-col items-center gap-2 text-primary-400">
            <Gift size={56} strokeWidth={1.5} />
            <span className="text-sm font-medium">Image placeholder</span>
          </div>
        </div>

        <div>
          <h1 className="font-heading text-3xl font-extrabold text-primary-600 sm:text-4xl">
            Corporate Gifting
          </h1>

          <div className="mt-6 rounded-2xl bg-primary-600 p-6 sm:p-8">
            {success ? (
              <p className="py-6 text-center font-medium text-white">
                Thanks! We&apos;ve received your request and will reach out soon.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <input
                    required
                    placeholder="Name *"
                    value={form.name}
                    onChange={handleChange('name')}
                    className="w-full rounded-lg bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none"
                  />
                  <input
                    required
                    type="email"
                    placeholder="Email *"
                    value={form.email}
                    onChange={handleChange('email')}
                    className="w-full rounded-lg bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <input
                    required
                    type="tel"
                    placeholder="Phone *"
                    value={form.phone}
                    onChange={handleChange('phone')}
                    className="w-full rounded-lg bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none"
                  />
                  <input
                    placeholder="Company (optional)"
                    value={form.company}
                    onChange={handleChange('company')}
                    className="w-full rounded-lg bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none"
                  />
                </div>

                <textarea
                  required
                  rows={3}
                  placeholder="Requirements * (e.g. quantity, packaging, timeline)"
                  value={form.requirements}
                  onChange={handleChange('requirements')}
                  className="w-full resize-none rounded-lg bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none"
                />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-primary-100">
                      Event Date (optional)
                    </label>
                    <input
                      type="date"
                      value={form.eventDate}
                      onChange={handleChange('eventDate')}
                      className="w-full rounded-lg bg-white px-4 py-3 text-sm text-ink-900 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-primary-100">
                      Budget (optional)
                    </label>
                    <input
                      type="number"
                      min={0}
                      placeholder="Budget"
                      value={form.budget}
                      onChange={handleChange('budget')}
                      className="w-full rounded-lg bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-lg bg-white px-8 py-3 text-sm font-bold uppercase tracking-wide text-primary-600 transition-colors hover:bg-primary-50 disabled:opacity-50"
                >
                  {submitting ? 'Submitting...' : 'Submit'}
                </button>

                {submitError && (
                  <p className="text-sm font-medium text-primary-100">{submitError}</p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
