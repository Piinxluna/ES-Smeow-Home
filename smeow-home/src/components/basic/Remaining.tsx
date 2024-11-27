'use client';

export default function Remaining({
  variant = 'water',
  percent,
  nextRefill,
  className = '',
}: {
  variant?: 'water' | 'food';
  percent: number;
  nextRefill: string;
  className?: string;
}) {
  let theme = 'font-semibold bg-white w-fit h-fit rounded-lg';
  if (variant === 'water') {
    return (
    <div className={`${theme} ${className} flex space-x-6 md:py-6 md:px-6 h-fit py-6 px-16`}>
        <div className="relative w-4 h-32 bg-lightgray2 rounded-full">
            <div 
            className={`absolute bottom-0 w-full bg-eblue rounded-full`} style={{ height: `${percent}%` }}>
            </div>
        </div>
        <div className='flex flex-col space-between h-30'>
            <h2 className='text-black text-2xl font-bold'>Water</h2>
            <div className='flex flex-row py-2'>
                <p className='text-eblue text-4xl font-bold'>{percent}%</p>
                <p className='text-l text-black font-bold ml-2 mt-4' >Left</p>
            </div>
            <p className='text-lightgray2 text-sm font-normal'>Next refilling in</p>
            <p className='text-eblue text-md'>About 1 Day 14 Hours</p>
        </div>
    </div>
    );
  } else if (variant === 'food') {
    return (
      <div className={`${theme} ${className} flex space-x-6 md:py-6 md:px-6 h-fit py-6 px-20`}>
        <div className="relative w-4 h-32 bg-lightgray2 rounded-full">
            <div 
            className={`absolute bottom-0 w-full bg-ebrown rounded-full`} style={{ height: `${percent}%` }}>
            </div>
        </div>
        <div className='flex flex-col space-between h-30'>
            <h2 className='text-black text-2xl font-bold'>Food</h2>
            <div className='flex flex-row py-2'>
                <p className='text-ebrown text-4xl font-bold'>{percent}%</p>
                <p className='text-l text-black font-bold ml-2 mt-4' >Left</p>
            </div>
            <p className='text-lightgray2 text-sm font-normal'>Next refilling in</p>
            <p className='text-ebrown text-md'>About {nextRefill}</p>
        </div>
      </div>
    );
  }

  return null;
}
