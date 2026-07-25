import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { CONTACT } from '@/constants/contact';

const USEFUL_LINKS = [
  { to: '/local', label: 'Nationwide Shipping' },
  { to: '/local', label: 'All Products' },
  { to: '/our-story', label: 'Our Story' },
  { to: '/contact', label: 'Contact' },
];

const POLICY_LINKS = [
  { to: '/policy#shipping', label: 'Shipping Policy' },
  { to: '/policy#privacy', label: 'Privacy Policy' },
  { to: '/policy#refund', label: 'Refund Policy' },
  { to: '/policy#terms', label: 'Terms of Service' },
];

const SOCIAL_LINKS = [
  {
    label: 'Facebook',
    href: CONTACT.facebook,
    path: (
      <path d="M14 9h2V6h-2c-1.657 0-3 1.343-3 3v2H9v3h2v6h3v-6h2.2l.8-3H14V9c0-.276.224-.5.5-.5H14V9z" />
    ),
  },
  {
    label: 'Instagram',
    href: CONTACT.instagram,
    path: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="4" />
        <circle cx="12" cy="12" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="16.2" cy="7.8" r="0.8" fill="var(--color-primary-900)" />
      </>
    ),
  },
  {
    label: 'TikTok',
    href: CONTACT.tiktok,
    path: (
      <path d="M14.5 4h2.2c.2 1.6 1.3 2.9 2.9 3.3v2.3c-1.1 0-2.1-.3-3-.9v5.4c0 2.7-2.2 4.9-4.9 4.9S6.8 16.8 6.8 14.1c0-2.6 2-4.7 4.6-4.9v2.3c-1.3.2-2.3 1.3-2.3 2.6 0 1.5 1.2 2.6 2.6 2.6s2.6-1.2 2.6-2.6V4z" />
    ),
  },
];

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    setEmail('');
  };

  return (
    <footer className="bg-primary-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <h2 className="font-heading text-3xl font-extrabold">Stay in the Loop</h2>
            <p className="mt-3 text-sm text-primary-200">We won&apos;t spam you, we promise.</p>

            <form
              onSubmit={handleSubscribe}
              className="mt-6 flex max-w-sm items-center rounded-full border border-white/25 bg-white/5 py-1.5 pl-5 pr-1.5"
            >
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-mail *"
                className="w-full bg-transparent text-sm text-white placeholder:text-primary-200 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25"
              >
                <ArrowRight size={16} />
              </button>
            </form>

            <div className="mt-10 flex items-center gap-4">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center text-white transition-colors hover:text-primary-200"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                    {social.path}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-bold text-white">Useful Links</p>
            <ul className="mt-5 space-y-4">
              {USEFUL_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.to} className="text-sm text-primary-100 transition-colors hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-bold text-white">Store Policies</p>
            <ul className="mt-5 space-y-4">
              {POLICY_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.to} className="text-sm text-primary-100 transition-colors hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-bold text-white">Location and Hours</p>
            <p className="mt-5 text-sm text-primary-100">{CONTACT.address}</p>
            <p className="mt-5 text-sm font-bold text-white">{CONTACT.businessHours}</p>
            <a
              href={`mailto:${CONTACT.email}`}
              className="mt-5 inline-block text-sm text-primary-100 underline transition-colors hover:text-white"
            >
              {CONTACT.email}
            </a>
            <a
              href={`tel:${CONTACT.phone}`}
              className="mt-1 block text-sm text-primary-100 underline transition-colors hover:text-white"
            >
              {CONTACT.phone}
            </a>
          </div>
        </div>

        <div className="mt-16 text-sm text-primary-200">
          &copy; {new Date().getFullYear()}, Mama&apos;s Cookie. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
