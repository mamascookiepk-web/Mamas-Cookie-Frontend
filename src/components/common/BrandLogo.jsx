export default function BrandLogo({ iconClassName = 'h-9 sm:h-10' }) {
  return (
    <span className="flex items-center gap-1.5 whitespace-nowrap">
      <span className="font-heading text-xl italic text-primary-500">mamas</span>
      <img src="/logo/Logo.svg" alt="" className={`w-auto ${iconClassName}`} />
      <span className="font-display text-xl tracking-wide text-ink-900">COOKIE</span>
    </span>
  );
}
