import { Home } from 'lucide-react';

export default function AdminPageHeader({ title, subtitle, breadcrumb }) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-extrabold text-ink-900">
        {title} {subtitle && <span className="text-base font-normal text-ink-400">{subtitle}</span>}
      </h1>
      <div className="flex items-center gap-1.5 text-sm text-ink-400">
        <Home size={14} />
        <span>{breadcrumb}</span>
      </div>
    </div>
  );
}
