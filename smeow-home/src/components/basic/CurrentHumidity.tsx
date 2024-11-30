'use client';

export default function CurrentHumidity({
  variant = 'primary',
  Humidity,
  className = '',
}: {
  variant?: 'primary' | 'secondary';
  Humidity: number;
  className?: string;
  target?: string;
}) { 
  let theme = 'font-semibold bg-white w-full h-fit rounded-lg';
  let HumidityColor = '';

  if (Humidity >= 30 && Humidity <= 50) {
    HumidityColor = 'text-egreen';
  } else if (Humidity < 30) {
    HumidityColor = 'text-ered';
  } else if (Humidity > 50) {
    HumidityColor = 'text-ered';
  }

  if (variant === 'primary') {
    return (
      <div className={`${theme} ${className} md:py-4 md:px-8 px-28 py-4`}>
        <h2 className="text-center text-2xl text-black font-bold mb-2">Humidity</h2>
        <h1 className={`text-center text-4xl font-bold ${HumidityColor}`}>{Humidity} %</h1>
      </div>
    );}
  return null;
}
