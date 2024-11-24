'use client';

import Link from 'next/link';

export default function Button({
  variant = 'primary',
  children,
  className = 'text-black bg-white hover:bg-lightgray/80',
  onClick,
  href,
  target,
}: {
  variant?: 'primary' | 'secondary' | 'outline' | 'pink';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  target?: string;
}) {
  let theme = 'text-black font-semibold bg-white hover:bg-gray-500';
  if (variant === 'secondary') {
    theme = 'text-black font-semibold bg-white hover:bg-lightgray1';
  }
  if (variant === 'outline') {
    theme =
      'text-black font-semibold border-2 border-gray-950 bg-white hover:text-white hover:bg-black shadow-none';
  }
  if (variant === 'pink') {
    theme = 'text-white font-semibold bg-epink hover:bg-edarkpink';
  }

  if (href) {
    return (
      <Link href={href}>
        <a
          target={target}
          className={`px-4 py-2 rounded-md shadow ${theme} ${className}`}
        >
          {children}
        </a>
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 rounded-md shadow ${theme} ${className}`}
    >
      {children}
    </button>
  );
}
