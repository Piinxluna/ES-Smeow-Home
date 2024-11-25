'use client';

export default function percentDetails({
  variant = 'water',
  percent,
  className = '',
}: {
  variant?: 'water' | 'food';
  percent: number;
  className?: string;
}) {
  let theme = 'font-semibold bg-white w-fit h-fit rounded-lg';
  const weightleft = percent*2/100
  if (variant === 'water') {
    return (
    <div className={`${theme} ${className} flex space-x-4 py-6 px-6 h-fit w-`}>
        <div className="relative w-4 h-24 bg-lightgray2 rounded-full">
            <div 
            className={`absolute bottom-0 w-full bg-eblue rounded-full`} style={{ height: `${percent}%` }}>
            </div>
        </div>
        <div className='flex flex-col space-y-2'>
            <h2 className='text-black text-2xl font-bold mt-2'>Water</h2>
            <div className='flex flex-row '>
                <p className='text-eblue text-4xl font-bold'>{percent}%</p>
                <p className='text-l text-black font-bold px-2 mt-4' >Left</p>
                <div className="ml-3 h-12 border-l-2 border-black"></div>
                <div className="flex flex-col ml-4">
                    <p className='text-lightgray2 text-sm font-bold'>Weight</p>
                    <p className='text-eblue text-l font-bold'>{weightleft} / 2 L.</p>
                </div>
            </div>
        </div>
    </div>
    );
  } else if (variant === 'food') {
    return (
    <div className={`${theme} ${className} flex space-x-4 py-6 px-6 h-fit w-`}>
        <div className="relative w-4 h-24 bg-lightgray2 rounded-full">
            <div 
            className={`absolute bottom-0 w-full bg-ebrown rounded-full`} style={{ height: `${percent}%` }}>
            </div>
        </div>
        <div className='flex flex-col space-y-2'>
            <h2 className='text-black text-2xl font-bold mt-2 '>Food</h2>
            <div className='flex flex-row '>
                <p className='text-ebrown text-4xl font-bold'>{percent}%</p>
                <p className='text-l text-black font-bold px-2 mt-4' >Left</p>
                <div className="ml-3 h-12 border-l-2 border-black"></div>
                <div className="flex flex-col ml-4">
                    <p className='text-lightgray2 text-sm font-bold'>Weight</p>
                    <p className='text-ebrown text-l font-bold'>{weightleft} / 2 kg.</p>
                </div>
            </div>
        </div>
    </div>
    );
  }

  return null;
}