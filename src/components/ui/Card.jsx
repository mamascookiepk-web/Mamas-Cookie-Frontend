export default function Card({ children, className = '', ...props }) {
  return (
    <div className={`rounded-2xl border border-cookie-100 bg-white shadow-sm ${className}`} {...props}>
      {children}
    </div>
  );
}
