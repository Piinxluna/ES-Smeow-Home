'use client';

export default function Remaining({
  variant = 'water',
  lastHour,
  today,
  className = '',
}: {
  variant?: 'water' | 'food';
  lastHour: number;
  today: number;
  className?: string;
}) {
  let theme = 'font-semibold bg-white h-fit rounded-lg';
  if (variant === 'water') {
    return (
    <div className={`${theme} ${className} flex justify-center items-center flex-col p-6`}>
        <p className="text-2xl text-black font-bold text-center mb-4">Drinking Behavior</p>
        <div className="flex flex-row">
            <div className="flex flex-col items-center text-center px-4">
                <p className="text-md mb-2 text-black font-bold">Last Hour</p>
                <div className="flex flex-row">
                    <p className="text-4xl text-eblue font-bold">{lastHour} </p>
                    <p className='text-md text-black font-bold mt-4 ml-4'>ml.</p>
                </div>
            </div>
            <div className="ml-3 h-20 border-l-2 border-black"></div>
            <div className="flex flex-col items-center text-center px-4">
                <p className="text-md mb-2 text-black font-bold">Today</p>
                <div className="flex flex-row">
                    <p className="text-4xl text-eblue font-bold">{today} </p>
                    <p className='text-md text-black font-bold mt-4 ml-4'>ml.</p>
                </div>
            </div>
        </div>
    </div>
    );
  } else if (variant === 'food') {
    return (
        <div className={`${theme} ${className} flex justify-center items-center flex-col h-fit p-6`}>
            <p className="text-2xl text-black font-bold text-center mb-4">Eating Behavior</p>
            <div className="flex flex-row">
                <div className="flex flex-col items-center text-center px-4">
                    <p className="text-md mb-2 text-black font-bold">Last Hour</p>
                    <div className="flex flex-row">
                        <p className="text-4xl text-ebrown font-bold">{lastHour} </p>
                        <p className='text-md text-black font-bold mt-4 ml-4'>g.</p>
                    </div>
                </div>
                <div className="ml-3 h-20 border-l-2 border-black"></div>
                <div className="flex flex-col items-center text-center px-4">
                    <p className="text-md mb-2 text-black font-bold">Today</p>
                    <div className="flex flex-row">
                        <p className="text-4xl text-ebrown font-bold">{today} </p>
                        <p className='text-md text-black font-bold mt-4 ml-4'>g.</p>
                    </div>
                </div>
            </div>
        </div>
        );
  }

  return null;
}
