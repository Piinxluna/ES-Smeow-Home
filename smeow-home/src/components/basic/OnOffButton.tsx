import React from 'react'

interface OnOffButtonProps {
  active: string
  inActive: string
  isSelected: boolean
  onClick: () => void
  className?: string
}

export default function OnOffButton({
  active,
  inActive,
  isSelected,
  onClick,
  className,
}: OnOffButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${className} mt-2 py-2 px-4 rounded transition-all duration-300 hover:bg-lightgray1 hover:text-white ${
        isSelected
          ? 'bg-darkgray text-white'
          : 'border border-darkgray text-darkgray'
      }`}
    >
      {isSelected === false ? active : inActive}
    </button>
  )
}
