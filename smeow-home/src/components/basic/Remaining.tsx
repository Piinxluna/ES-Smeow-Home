'use client';
export default function ShowLeft({
  variant = 'water',
  children,
  className = '',
  target,
}: {
  variant?: 'water' | 'food';
  children: React.ReactNode;
  className?: string;
  target?: string;
}) {
  let theme = 'font-semibold bg-white w-fit h-fit rounded-lg';
  const childText = typeof children === 'string' ? children : '';
  const childNumber = parseInt(childText);
  const length = childNumber*36/100
  if (variant === 'water') {
    return (
    <div className={`${theme} ${className} flex space-x-6 py-6 px-6 h-fit`}>
        <div className="relative w-4 h-32 bg-lightgray2 rounded-full">
            <div 
            className={`absolute bottom-0 w-full bg-eblue rounded-full`} style={{ height: `${children}%` }}>
            </div>
        </div>
        <div className='flex flex-col space-between h-30'>
            <h2 className='text-black text-2xl font-bold'>Food</h2>
            <div className='flex flex-row py-2'>
                <p className='text-eblue text-4xl font-bold'>{children}%</p>
                <p className='text-l text-black font-bold ml-2 mt-4' >Left</p>
            </div>
            <p className='text-lightgray2 text-sm font-normal'>Next refilling in</p>
            <p className='text-eblue text-md'>About 1 Day 14 Hours</p>
        </div>
    </div>
    );
  } else if (variant === 'food') {
    return (
      <div className={`${theme} ${className} flex space-x-6 py-6 px-6 h-fit`}>
        <div className="relative w-4 h-32 bg-lightgray2 rounded-full">
            <div 
            className={`absolute bottom-0 w-full bg-ebrown rounded-full`} style={{ height: `${children}%` }}>
            </div>
        </div>
        <div className='flex flex-col space-between h-30'>
            <h2 className='text-black text-2xl font-bold'>Food</h2>
            <div className='flex flex-row py-2'>
                <p className='text-ebrown text-4xl font-bold'>{children}%</p>
                <p className='text-l text-black font-bold ml-2 mt-4' >Left</p>
            </div>
            <p className='text-lightgray2 text-sm font-normal'>Next refilling in</p>
            <p className='text-ebrown text-md'>About 1 Day 14 Hours</p>
        </div>
      </div>
    );
  }

  return null;
}
