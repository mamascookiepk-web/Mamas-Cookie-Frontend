import { useState } from 'react';
import FAQItem from './FAQItem';

const FAQS = [
  {
    question: 'Do you offer customizations?',
    answer: (
      <>
        Yes, we can work around a custom corporate gifting order, according to your needs.
        Examples of customizations include the company&apos;s postcard with logo, personalized
        message cards, and stickers. For more information, feel free to reach us at{' '}
        <a href="mailto:sales@mamascookie.com">sales@mamascookie.com</a>.
      </>
    ),
  },
  {
    question: 'How far in advance do I need to place my order?',
    answer:
      'Our orders are dispatched within a day or two of the payment made by the client and take 3-7 days for delivery. So, make sure to place your order at least a week prior.',
  },
  {
    question: 'Do you offer bulk orders?',
    answer: (
      <>
        Yes, you can place bulk orders. To discuss bulk orders, please reach out to us via the
        contact page or get in touch with the Mama&apos;s Cookie sales team at{' '}
        <a href="mailto:sales@mamascookie.com">sales@mamascookie.com</a>.
      </>
    ),
  },
  {
    question: 'What if I have more questions?',
    answer: (
      <>
        We are here to answer any questions you might have about our corporate gifting or cookies
        in general. Reach out to us at{' '}
        <a href="mailto:sales@mamascookie.com">sales@mamascookie.com</a> or fill out the contact
        form <a href="#gifting-form">here</a>.
      </>
    ),
  },
];

export default function FAQ() {
  const [openIndexes, setOpenIndexes] = useState(() => new Set(FAQS.map((_, i) => i)));

  const toggle = (index) => {
    setOpenIndexes((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <h2 className="mb-8 text-center font-heading text-3xl font-extrabold text-primary-600">
        Frequently Asked Questions
      </h2>

      <div className="divide-y divide-primary-100 overflow-hidden rounded-2xl bg-primary-50">
        {FAQS.map((faq, index) => (
          <FAQItem
            key={faq.question}
            question={faq.question}
            answer={faq.answer}
            open={openIndexes.has(index)}
            onToggle={() => toggle(index)}
          />
        ))}
      </div>
    </section>
  );
}
