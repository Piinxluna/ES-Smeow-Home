'use client'

// import react
import Link from 'next/link'

export default function Button({
  variant = 'primary',
  children,
  className,
  onClick,
  href,
  target,
}: {
  variant?: 'primary' | 'secondary' | 'outline' | 'text' | 'disabled'
  children: React.ReactNode
  className?: string
  onClick?: Function
  href?: string
  target?: string
}) {
  let theme = 'text-black bg-white hover:lightgray/80'
  if (variant === 'secondary')
    theme = 'text-black bg-lightgray hover:bg-darkgray'
  if (variant === 'outline')
    theme =
      'text-black border-2 border-darkgray bg-white hover:text-white hover:bg-white shadow-none'

  // return
  if (href) {
    return (
      <Link href={href} legacyBehavior>
        <a
          target={target}
          className={`px-4 py-2 rounded-md shadow ${theme} ${className}`}>
          {children}
        </a>
      </Link>
    )
  } else {
    return (
      <button
        onClick={() => {
          onClick ? onClick() : ''
        }}
        className={`px-4 py-2 rounded-md shadow ${theme} ${className}`}>
        {children}
      </button>
    )
  }
}