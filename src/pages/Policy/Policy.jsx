import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Truck, ShieldCheck, RefreshCw, FileText } from 'lucide-react';
import { CONTACT } from '@/constants/contact';

const SECTIONS = [
  {
    id: 'shipping',
    icon: Truck,
    title: 'Shipping Policy',
    body: [
      'We currently deliver locally within Islamabad, with same-day and scheduled delivery slots available at checkout.',
      'Orders placed before our daily cut-off are prepared fresh and dispatched the same day. Delivery windows are shown at checkout based on your selected area.',
      'Delivery charges, if any, are calculated automatically based on your address and shown before you place the order.',
      'For events, catering, and bulk corporate orders, delivery timelines are agreed individually and confirmed by our team.',
    ],
  },
  {
    id: 'privacy',
    icon: ShieldCheck,
    title: 'Privacy Policy',
    body: [
      'We collect only the information needed to process your order and improve your experience — your name, contact number, email, and delivery address.',
      'Your information is never sold to third parties. It is used solely for order fulfilment, delivery coordination, and occasional updates you’ve opted into.',
      'Payment details are not stored on our servers. Any order history and saved addresses are kept securely in your account and can be updated or removed anytime from your profile.',
      `Questions about your data? Reach out to us at ${CONTACT.email} and we’ll be happy to help.`,
    ],
  },
  {
    id: 'refund',
    icon: RefreshCw,
    title: 'Refund Policy',
    body: [
      'Because our cookies are freshly baked and perishable, we’re unable to accept returns once an order has been delivered.',
      'If your order arrives damaged, incorrect, or doesn’t meet our quality standard, contact us within 24 hours with photos and your order number — we’ll arrange a replacement or refund.',
      'Cancellations made before your order enters preparation are eligible for a full refund. Once baking has started, orders can no longer be cancelled.',
      'Approved refunds are processed back to the original payment method within 5-7 business days.',
    ],
  },
  {
    id: 'terms',
    icon: FileText,
    title: 'Terms of Service',
    body: [
      'By placing an order with Mama’s Cookie, you confirm the delivery details and contact information provided are accurate.',
      'Product images are for illustration — actual appearance may vary slightly batch to batch, as every cookie is handmade.',
      'Prices, flavours, and availability are subject to change without prior notice, though confirmed orders will always honour the price at checkout.',
      'Misuse of promotional offers, repeated cancellations, or abusive conduct toward our team may result in orders being declined.',
    ],
  },
];

export default function Policy() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(hash.replace('#', ''));
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [hash]);

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-700 to-primary-600 text-white">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/5 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-white/5 blur-2xl" />

        <div className="relative mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:py-24">
          <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary-100">
            Store Policies
          </span>
          <h1 className="mt-5 font-heading text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
            Shipping, Privacy, Refunds &amp; Terms
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-primary-50 sm:text-base">
            Everything you need to know about ordering from Mama&apos;s Cookie.
          </p>
        </div>
      </section>

      <div className="border-b border-gray-200 bg-surface">
        <nav className="mx-auto flex max-w-4xl flex-wrap justify-center gap-2 px-4 py-4 sm:px-6">
          {SECTIONS.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="rounded-full border border-gray-200 px-4 py-2 text-xs font-bold uppercase tracking-wide text-ink-900 transition-colors hover:border-primary-500 hover:text-primary-600"
            >
              {section.title}
            </a>
          ))}
        </nav>
      </div>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:py-20">
        <div className="space-y-16">
          {SECTIONS.map(({ id, icon: Icon, title, body }) => (
            <div key={id} id={id} className="scroll-mt-24">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-500 text-white">
                  <Icon size={20} strokeWidth={1.75} />
                </div>
                <h2 className="font-heading text-2xl font-extrabold text-ink-900">{title}</h2>
              </div>
              <div className="mt-5 space-y-4 border-l-2 border-primary-100 pl-8">
                {body.map((paragraph) => (
                  <p key={paragraph} className="text-sm leading-relaxed text-ink-500">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-2xl bg-surface-muted p-8 text-center">
          <h3 className="font-heading text-lg font-bold text-ink-900">Still have questions?</h3>
          <p className="mt-2 text-sm text-ink-500">
            Our team is happy to walk you through any of the above.
          </p>
          <a
            href="/contact"
            className="mt-5 inline-flex items-center justify-center rounded-lg bg-primary-500 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-primary-600"
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
}
