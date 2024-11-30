'use client';

export default function percentDetails({
  variant = 'water',
  remainingAmount,
  className = '',
}: {
  variant?: 'water' | 'food';
  remainingAmount: number;
  className?: string;
}) {
  let theme = 'font-semibold bg-white w-fit h-fit rounded-lg';
  const percent = Math.round((remainingAmount * 100) / 1000);
  const weightleft = (percent * 1) / 100;

  if (variant === 'water') {
    return (
      <div
        className={`${theme} ${className} flex justify-center items-center py-6 px-8 h-fit`}
      >
        <div className="flex flex-row justify-center items-center space-x-4">
          <div className="relative w-4 h-24 bg-lightgray2 rounded-full">
            <div
              className={`absolute bottom-0 w-full bg-eblue rounded-full`}
              style={{ height: `${percent}%` }}
            ></div>
          </div>
          <div className="flex flex-col justify-center items-center space-y-2">
            <h2 className="text-black text-2xl font-bold">Water</h2>
            <div className="flex flex-row items-center">
              <p className="text-eblue text-4xl font-bold">{percent}%</p>
              <p className="text-l text-black font-bold px-2 mt-1">Left</p>
              <div className="ml-6 h-12 border-l-2 border-black"></div>
              <div className="flex flex-col ml-4 text-center">
                <p className="text-lightgray2 text-sm font-bold">Weight</p>
                <p className="text-eblue text-l font-bold">{weightleft} / 1 L.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (variant === 'food') {
    return (
      <div
        className={`${theme} ${className} flex justify-center items-center py-6 px-8 h-fit`}
      >
        <div className="flex flex-row justify-center items-center space-x-4">
          <div className="relative w-4 h-24 bg-lightgray2 rounded-full">
            <div
              className={`absolute bottom-0 w-full bg-ebrown rounded-full`}
              style={{ height: `${percent}%` }}
            ></div>
          </div>
          <div className="flex flex-col justify-center items-center space-y-2">
            <h2 className="text-black text-2xl font-bold">Food</h2>
            <div className="flex flex-row items-center">
              <p className="text-ebrown text-4xl font-bold">{percent}%</p>
              <p className="text-l text-black font-bold px-2 mt-1">Left</p>
              <div className="ml-6 h-12 border-l-2 border-black"></div>
              <div className="flex flex-col ml-4 text-center">
                <p className="text-lightgray2 text-sm font-bold">Weight</p>
                <p className="text-ebrown text-l font-bold">{weightleft} / 2 kg.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
