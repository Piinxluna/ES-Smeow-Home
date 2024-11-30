import React from 'react';

interface OnOffButtonProps {
  Active: string;
  InActive: string;
  isSelected: boolean;
  onClick: () => void;
  className?: string;
}

export default function OnOffButton({
  Active = '',
  InActive = '',
  isSelected,
  onClick,
  className = '',
}: OnOffButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${className} mt-2 py-2 px-4 rounded transition-all duration-300 hover:bg-lightgray1 hover:text-white ${
        isSelected ? 'bg-darkgray text-white' : 'border border-darkgray text-darkgray'
      }`}
    >
      {isSelected ? Active : InActive}
    </button>
  );
}