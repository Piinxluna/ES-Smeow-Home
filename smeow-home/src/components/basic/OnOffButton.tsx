import React, { useState } from 'react';

export default function OnOffButton({
  Active='',
  InActive='',
  className = '',
}: {
  Active?: string;
  InActive?: string;
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <button
      onClick={handleToggle}
      className={`mt-2 py-2 px-4 rounded transition-all duration-300 hover:bg-lightgray1 hover:text-white ${
        isOpen ? 'bg-darkgray text-white' : 'border border-darkgray text-darkgray'
      } ${className}`}
    >
      {isOpen ? `${InActive}` : `${Active}`}
    </button>
  );
}