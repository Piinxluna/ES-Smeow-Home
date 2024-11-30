'use client';

export default function CurrentCML({
  variant = 'primary',
  CML,
  className = '',
}: {
  variant?: 'primary' | 'secondary';
  CML: number;
  className?: string;
  target?: string;
}) { 
  let theme = 'font-semibold bg-white w-full h-fit rounded-lg';
  let CMLColor = '';

  if (CML >= 0 && CML <= 39) {
    CMLColor = 'text-egreen';
  } else if (CML <= 69) {
    CMLColor = 'text-eyellow';
  } else if (CML <= 100) {
    CMLColor = 'text-ered';
  }

  if (variant === 'primary') {
    return (
      <div className={`${theme} ${className} md:py-4 md:px-8 px-28 py-4`}>
        <h2 className="text-center text-2xl text-black font-bold mb-2">CML</h2>
        <h1 className={`text-center text-4xl font-bold ${CMLColor}`}>{CML.toFixed(1)} %</h1>
      </div>
    );}
  return null;
}
