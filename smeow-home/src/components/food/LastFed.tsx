import Remaining from '../basic/Remaining'

export default function EatingBehavior({
  variant = 'primary',
  percent,
  totalLastHour,
  lastFed,
  petStatus,
  className,
}: {
  variant?: 'primary'
  percent: number
  totalLastHour: number
  lastFed: string
  petStatus: string
  className?: string
}) {
  let color = ''
  if (petStatus === 'Already eaten') {
    color = 'text-white'
  } else if (petStatus === 'Not eaten') {
    color = 'text-epink'
  } else if (petStatus === 'Eating') {
    color = 'text-eblue/80'
  }
  return (
    <div className={`bg-ebrown h-72 rounded-lg ${className}`}>
      <Remaining
        variant='food'
        remainingAmount={percent}
        totalLastHour={totalLastHour}
        className={`${className}`}
      ></Remaining>
      <p className='text-lightgray2 font-bold text-center mt-4'>Last feed</p>
      <p className='text-white font-bold text-center'>{lastFed}</p>
      <p className={`${color} font-bold text-center`}>{petStatus}</p>
    </div>
  )
}
