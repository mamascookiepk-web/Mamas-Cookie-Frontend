import { ClipboardCheck, PackageCheck, Bike, Home } from 'lucide-react';

const STEPS = [
  {
    icon: ClipboardCheck,
    title: 'Order Confirmation',
    description: 'Place the order, send payment, and get confirmation.',
  },
  {
    icon: PackageCheck,
    title: 'Baked & Packed',
    description: 'Fresh out of the oven and carefully packed.',
  },
  {
    icon: Bike,
    title: 'En Route',
    description: 'Order dispatched, delivery in 3-7 days.',
  },
  {
    icon: Home,
    title: 'Delivery',
    description: 'Get ready to receive your cookies.',
  },
];

export default function ProcessSteps() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
        {STEPS.map(({ icon: Icon, title, description }) => (
          <div key={title} className="flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary-50">
              <Icon size={28} strokeWidth={1.5} className="text-primary-500" />
            </div>
            <p className="mt-4 text-sm font-bold text-primary-600 sm:text-base">{title}</p>
            <p className="mt-1 text-xs text-ink-500 sm:text-sm">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
