'use client';

export default function CurrentTemp({
  variant = 'primary',
  Temp,
  className = '',
}: {
  variant?: 'primary' | 'secondary';
  Temp: number;
  className?: string;
  target?: string;
}) {
  let theme = 'font-semibold bg-white w-fit h-fit rounded-lg';
  let tempColor = '';
  let ideal = 25;

  if (Math.abs(Temp - ideal) <= 4) {
    tempColor = 'text-egreen';
  } else if (Math.abs(Temp - ideal) <= 6) {
    tempColor = 'text-eyellow';
  } else if (Math.abs(Temp - ideal) <= 9) {
    tempColor = 'text-ered';
  }

  if (variant === 'primary') {
    return (
      <div className={`${theme} ${className} md:py-4 md:px-8 px-28 py-4`}>
        <h2 className="text-center text-2xl text-black font-bold mb-2">Temperature</h2>
        <h1 className={`text-center text-4xl font-bold ${tempColor}`}>{Temp} °C</h1>
      </div>
    );
  } else if (variant === 'secondary') {
    return (
      <div className={`${theme} ${className} flex space-x-4 py-6 px-6 `}>
        <div>
          <h2 className="text-xl text-black font-bold">Current</h2>
          <h2 className="text-xl text-black font-bold">Temperature</h2>
        </div>
        <h1 className={`content-center text-center text-4xl font-bold ${tempColor}`}>{Temp} °C</h1>
      </div>
    );
  }

  return null;
}
