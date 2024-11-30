import React from 'react';

interface OnOffButtonProps {
  variant?: 'primary' | 'secondary';
  Active: string;
  InActive: string;
  isSelected: boolean;
  onClick: () => void;
  className?: string;
}

export default function OnOffButton({
  variant = 'primary',
  Active = 'Open',
  InActive = 'Close',
  isSelected,
  onClick,
  className = '',
}: OnOffButtonProps) {
  if(variant === 'primary') {
  return (
    <button
      onClick={onClick}
      className={`${className} mt-2 py-2 px-4 rounded transition-all duration-300 hover:bg-lightgray1 hover:text-white ${
        isSelected ? 'bg-darkgray text-white' : 'border border-darkgray text-darkgray'
      }`}
    >
      {isSelected ? Active : InActive}
    </button>
  );}
  else if (variant == 'secondary') {
    return (
      <button
        onClick={onClick}
        className={`${className} mt-2 py-2 px-4 rounded transition-all duration-300 hover:bg-lightgray1 hover:text-white ${
          isSelected ?  'border border-darkgray text-darkgray' : 'bg-darkgray text-white' 
        }`}
      >
        {isSelected ? Active : InActive}
      </button>
    );}
  }
