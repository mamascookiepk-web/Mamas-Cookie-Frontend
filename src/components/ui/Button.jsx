const variants = {
  primary: 'bg-cookie-500 text-white hover:bg-cookie-600',
  secondary: 'bg-cookie-100 text-cookie-800 hover:bg-cookie-200',
  outline: 'border border-cookie-500 text-cookie-600 hover:bg-cookie-50',
  ghost: 'text-cookie-600 hover:bg-cookie-50',
};

export default function Button({
  children,
  variant = 'primary',
  className = '',
  disabled = false,
  type = 'button',
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
