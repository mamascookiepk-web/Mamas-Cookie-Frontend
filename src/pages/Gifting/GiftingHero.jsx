import { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  Building2,
  MessageSquare,
  Calendar,
  Wallet,
  Send,
  CheckCircle2,
} from 'lucide-react';
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
        <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-primary-50 sm:aspect-[4/5] lg:aspect-[3/4]">
  <img
    src="/images/home-hero.jpg"
    alt="Mama's Cookie fresh baked treats"
    className="h-full w-full object-cover"
  />
</div>

        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-primary-600">
            Corporate Gifting
          </span>
          <h1 className="mt-2 font-heading text-3xl font-extrabold text-ink-900 sm:text-4xl">
            Gift Cookies That Leave An Impression
          </h1>
          <p className="mt-3 max-w-md text-sm text-ink-500 sm:text-base">
            Tell us about your team, clients, or event — we&apos;ll put together a gifting box
            worth remembering.
          </p>

          <div className="mt-8 rounded-3xl border border-gray-100 bg-white p-6 shadow-lg sm:p-8">
            {success ? (
              <div className="flex flex-col items-center gap-3 py-8 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-green-600">
                  <CheckCircle2 size={28} />
                </span>
                <p className="font-bold text-ink-900">Request received!</p>
                <p className="max-w-xs text-sm text-ink-500">
                  We&apos;ll reach out soon to discuss your corporate gifting order.
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
                    <FieldIcon icon={Mail} />
                    <input
                      required
                      type="email"
                      placeholder="Email *"
                      value={form.email}
                      onChange={handleChange('email')}
                      className={fieldClass}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="relative">
                    <FieldIcon icon={Phone} />
                    <input
                      required
                      type="tel"
                      placeholder="Phone *"
                      value={form.phone}
                      onChange={handleChange('phone')}
                      className={fieldClass}
                    />
                  </div>
                  <div className="relative">
                    <FieldIcon icon={Building2} />
                    <input
                      placeholder="Company (optional)"
                      value={form.company}
                      onChange={handleChange('company')}
                      className={fieldClass}
                    />
                  </div>
                </div>

                <div className="relative">
                  <FieldIcon icon={MessageSquare} top />
                  <textarea
                    required
                    rows={3}
                    placeholder="Requirements * (e.g. quantity, packaging, timeline)"
                    value={form.requirements}
                    onChange={handleChange('requirements')}
                    className={`${fieldClass} resize-none`}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-ink-500">
                      Event Date (optional)
                    </label>
                    <div className="relative">
                      <FieldIcon icon={Calendar} />
                      <input
                        type="date"
                        value={form.eventDate}
                        onChange={handleChange('eventDate')}
                        className={fieldClass}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-ink-500">
                      Budget (optional)
                    </label>
                    <div className="relative">
                      <FieldIcon icon={Wallet} />
                      <input
                        type="number"
                        min={0}
                        placeholder="Budget"
                        value={form.budget}
                        onChange={handleChange('budget')}
                        className={fieldClass}
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-500 px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-primary-600 disabled:opacity-50 sm:w-auto"
                >
                  <Send size={16} />
                  {submitting ? 'Submitting...' : 'Submit Request'}
                </button>

                {submitError && (
                  <p className="text-sm font-medium text-primary-600">{submitError}</p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
