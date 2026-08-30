import Image from 'next/image'

type NovatrixLogoProps = {
  className?: string
  compact?: boolean
}

export function NovatrixLogo({ className = '', compact = false }: NovatrixLogoProps) {
  return (
    <span className={`novatrix-logo ${compact ? 'novatrix-logo-compact' : ''} ${className}`.trim()} aria-hidden="true">
      <Image className="novatrix-logo-mark" src="/brand/novatrix-mark.png" alt="" width={44} height={44} sizes="44px" priority />
      {compact ? null : <span className="novatrix-logo-word"><b>NOVA</b><b>TRIX</b><i>®</i></span>}
    </span>
  )
}
