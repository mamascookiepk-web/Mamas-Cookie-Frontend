import { useState } from 'react';
import { Mail, MapPin, Phone, Clock, Send } from 'lucide-react';
import { CONTACT } from '@/constants/contact';
import { useContact } from '@/hooks/useContact';

const inputClass =
  'w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-ink-300 focus:border-primary-500 focus:outline-none';

const CONTACT_CARDS = [
  {
    icon: MapPin,
    label: 'Visit Us',
    value: CONTACT.address,
  },
  {
    icon: Phone,
    label: 'Call Us',
    value: CONTACT.phone,
    href: `tel:${CONTACT.phone}`,
  },
  {
    icon: Mail,
    label: 'Email Us',
    value: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
  },
  {
    icon: Clock,
    label: 'Business Hours',
    value: CONTACT.businessHours,
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const { submitStatus, submitError, submitContact, clearSubmitStatus } = useContact();

  const handleChange = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await submitContact(form);
    if (result.meta.requestStatus === 'fulfilled') {
      setForm({ name: '', email: '', phone: '', message: '' });
    }
  };

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-700 to-primary-600 text-white">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/5 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-white/5 blur-2xl" />

        <div className="relative mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:py-24">
          <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary-100">
            Contact
          </span>
          <h1 className="mt-5 font-heading text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
            We&apos;d Love To Hear From You
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-primary-50 sm:text-base">
            Questions about an order, a bulk enquiry, or just want to say hi? Reach out and the
            Mama&apos;s Cookie team will get back to you.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CONTACT_CARDS.map(({ icon: Icon, label, value, href }) => (
            <div key={label} className="rounded-2xl bg-surface-muted p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary-500 text-white">
                <Icon size={20} strokeWidth={1.75} />
              </div>
              <h3 className="mt-4 font-heading text-sm font-bold uppercase tracking-wide text-ink-900">
                {label}
              </h3>
              {href ? (
                <a
                  href={href}
                  className="mt-2 block text-sm leading-relaxed text-ink-500 transition-colors hover:text-primary-600"
                >
                  {value}
                </a>
              ) : (
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{value}</p>
              )}
            </div>
          ))}
        </div>

        <div className="mx-auto mt-16 max-w-2xl">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-10">
            <h2 className="font-heading text-2xl font-extrabold text-ink-900">Send Us A Message</h2>
            <p className="mt-2 text-sm text-ink-500">
              Fill out the form below and we&apos;ll respond as soon as we can.
            </p>

            {submitStatus === 'succeeded' ? (
              <div className="mt-8 rounded-lg bg-primary-50 px-5 py-4 text-sm font-medium text-primary-700">
                Thanks for reaching out! We&apos;ve received your message and will get back to you
                soon.
                <button
                  type="button"
                  onClick={clearSubmitStatus}
                  className="ml-2 font-bold underline hover:text-primary-800"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                {submitStatus === 'failed' && (
                  <div className="rounded-lg bg-danger/10 px-5 py-3 text-sm font-medium text-danger">
                    {submitError || 'Something went wrong. Please try again.'}
                  </div>
                )}
                <div>
                  <label className="mb-2 block text-sm font-bold text-ink-900">
                    Name <span className="text-primary-500">*</span>
                  </label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className={inputClass}
                  />
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-bold text-ink-900">
                      Email <span className="text-primary-500">*</span>
                    </label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-bold text-ink-900">Phone</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-ink-900">
                    Message <span className="text-primary-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    className={inputClass}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitStatus === 'loading'}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary-500 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  <Send size={16} />
                  {submitStatus === 'loading' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
