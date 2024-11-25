'use client';

import Link from 'next/link';

export default function CurrentTemp({
  variant = 'primary',
  children,
  className = '',
  target,
}: {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  className?: string;
  target?: string;
}) {
  let theme = 'font-semibold bg-white w-fit h-fit rounded-lg';
  let tempColor = '';
  const childText = typeof children === 'string' ? children : '';
  const childNumber = parseInt(childText, 10);

  if (childNumber >= 21 && childNumber <= 28) {
    tempColor = 'text-egreen';
  } else if (childNumber > 28 && childNumber <= 34) {
    tempColor = 'text-eyellow';
  } else if (childNumber > 34) {
    tempColor = 'text-ered';
  }

  if (variant === 'primary') {
    return (
      <div className={`${theme} ${className} py-4 px-8`}>
        <h2 className="text-center text-xl text-black font-bold mb-2">Temperature</h2>
        <h1 className={`text-center text-4xl font-bold ${tempColor}`}>{children} °C</h1>
      </div>
    );
  } else if (variant === 'secondary') {
    return (
      <div className={`${theme} ${className} flex space-x-4 py-6 px-6`}>
        <div>
          <h2 className="text-xl text-black font-bold">Current</h2>
          <h2 className="text-xl text-black font-bold">Temperature</h2>
        </div>
        <h1 className={`content-center text-center text-4xl font-bold ${tempColor}`}>{children} °C</h1>
      </div>
    );
  }

  return null;
}
