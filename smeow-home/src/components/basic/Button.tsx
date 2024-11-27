'use client';

import Link from 'next/link';

export default function Button({
  variant = 'primary',
  children,
  className = 'text-black bg-white hover:bg-lightgray/80 py-1 px-1 md:py-2 md:px-4 rounded-md shadow',
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
  let theme = 'text-black font-semibold bg-white hover:bg-lightgray2';
  if (variant === 'secondary') {
    theme = 'text-black font-semibold bg-lightgray2 hover:bg-lightgray1';
  }
  if (variant === 'outline') {
    theme =
      'text-black font-semibold border-2 border-gray-950 bg-white hover:text-white hover:bg-black shadow-none';
  }
  if (variant === 'pink') {
    theme = 'text-white font-semibold bg-edarkpink hover:bg-epink';
  }

  if (href) {
    return (
      <Link href={href}
          target={target}>
        <button
          className={`md:px-2 md:py-2 px-2 py-2 rounded-md shadow ${theme} ${className} md:text-l text-sm`}
        >
          {children}
        </button>
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
