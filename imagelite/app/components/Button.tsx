type ButtonVariant = 'primary' | 'secondary'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  children: React.ReactNode
}

export function Button({
  variant = 'primary',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseClassName =
    'inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] transition-all duration-300 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60'

  const variantClassName =
    variant === 'primary'
      ? 'border shadow-[0_0_22px_rgba(255,255,255,0.18)]'
      : 'border'

  return (
    <button
      className={`${baseClassName} ${variantClassName} ${className}`}
      style={{
        background: variant === 'primary' ? 'var(--button-bg)' : 'var(--panel)',
        color: variant === 'primary' ? 'var(--button-text)' : 'var(--text)',
        borderColor: 'var(--border)',
      }}
      {...props}
    >
      {children}
    </button>
  )
}
