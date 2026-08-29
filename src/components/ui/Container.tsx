import type { CSSProperties, ReactNode } from 'react'

export function Container({
  children,
  className = '',
  style,
}: {
  children: ReactNode
  className?: string
  style?: CSSProperties
}) {
  return (
    <div className={`container-shell ${className}`} style={style}>
      {children}
    </div>
  )
}
