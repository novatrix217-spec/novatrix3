import Link from 'next/link'
import type { MouseEventHandler, ReactNode } from 'react'

type CommonProps = {
  children: ReactNode
  variant?: 'primary' | 'secondary'
  className?: string
  onClick?: MouseEventHandler<HTMLAnchorElement>
}

const base =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold leading-none'
const variants = {
  primary: 'border border-accent bg-accent text-ink-on-accent hover:border-accent-hover hover:bg-accent-hover',
  secondary: 'border border-border-strong text-text-primary hover:border-accent hover:bg-accent-soft',
}

export function ButtonLink({
  href,
  children,
  variant = 'primary',
  className = '',
  external = false,
  onClick,
}: CommonProps & { href: string; external?: boolean }) {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        className={`${base} ${variants[variant]} ${className}`}
      >
        {children}
      </a>
    )
  }
  return (
    <Link href={href} onClick={onClick} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  )
}

export function Button({
  children,
  variant = 'primary',
  className = '',
  type = 'button',
  disabled = false,
}: CommonProps & { type?: 'button' | 'submit'; disabled?: boolean }) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`${base} ${variants[variant]} disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
    >
      {children}
    </button>
  )
}
