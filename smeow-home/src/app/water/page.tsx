import BacktoHomeButton from '@/components/basic/BackToHomeButton'
import ConsumeBehavior from '@/components/basic/ConsumeBehavior'
import Remaining from '@/components/basic/Remaining'
import RemainingDetails from '@/components/basic/RemainingDetails'

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <BacktoHomeButton/>
      <Remaining variant='water' percent={40} nextRefill={'1 Day 14 hours'}></Remaining>
      <ConsumeBehavior variant='water' lastHour={200} today={500}></ConsumeBehavior>
      <RemainingDetails variant='water' percent={40}/>
    </main>
  )
}
