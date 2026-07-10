export default function Spinner({ className = '' }) {
  return (
    <div
      className={`h-6 w-6 animate-spin rounded-full border-2 border-cookie-200 border-t-cookie-500 ${className}`}
    />
  );
}
