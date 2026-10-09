import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export function Input({ label, className = '', ...props }: InputProps) {
  return (
    <label className="flex flex-col gap-2 text-sm font-medium" style={{ color: 'var(--text)' }}>
      <span>{label}</span>
      <input
        className={`h-12 rounded-xl border px-3.5 py-2 text-sm transition-all duration-300 outline-none ${className}`}
        style={{
          background: 'var(--panel-soft)',
          borderColor: 'var(--border)',
          color: 'var(--text)',
        }}
        {...props}
      />
    </label>
  )
}
