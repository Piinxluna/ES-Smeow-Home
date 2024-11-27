'use client';
import { useState } from 'react';

export default function Control({
  variant = 'water',
  className = '',
}: {
  variant: string;
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  let theme = 'font-semibold bg-white w-60 rounded-lg';
  let title = '';
  let description = '';
  variant === 'water' ? (title = 'Control water') : (title = 'Feed now');
  variant === 'water'
    ? (description = 'Open / Close cat fountain')
    : (description = 'Drop food from automatic feeder');

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`${theme} flex flex-col items-center text-center py-8 px-6`}>
      <p className="text-2xl font-bold text-black">{title}</p>
      <p className="text-sm text-lightgray1 text-semibold p-2">{description}</p>
      <button
        onClick={handleToggle}
        className={`mt-2 py-2 px-4 rounded transition-all duration-300 hover:bg-lightgray1 hover:text-white ${
          isOpen ? 'bg-darkgray text-white' : 'border border-darkgray text-darkgray'
        }`}
      >
        {isOpen ? 'Close' : 'Open'}
      </button>
    </div>
  );
}
