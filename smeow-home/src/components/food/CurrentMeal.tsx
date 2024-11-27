import Remaining from "../basic/Remaining";


export default function CurrentMeal({
    variant = 'primary',
    lastFed,
    petStatus,
    className,
  }: {
    variant?: 'primary';
    lastFed: string;
    petStatus: string;
    className?: string;
  }) {
  let color = '';
  if (petStatus === 'Already eaten'){color='text-white'}
  else if (petStatus === 'Not eaten'){color='text-ered'}
  else if (petStatus === 'Eating'){color='text-eblue'}
    return (
        <div className="bg-white h-fit rounded-lg py-4 px-8">
            <p className="text-black text-2xl font-bold">Current meal</p>
            <p className="text-lightgray2 font-bold text-center text-md py-2">Fed at</p>
            <p className="text-ebrown font-bold text-center">{lastFed}</p>
            <p className="text-lightgray2 font-bold text-center text-md py-2">Status</p>
            <p className={`${color} text-center font-extrabold`}>{petStatus}</p>
        </div>
    );
}