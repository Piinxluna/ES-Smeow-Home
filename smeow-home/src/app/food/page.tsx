import BacktoHomeButton from '@/components/basic/BackToHomeButton'
import Remaining from '@/components/basic/Remaining'
import RemainingDetails from '@/components/basic/RemainingDetails'
import CurrentMeal from '@/components/food/CurrentMeal'

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <BacktoHomeButton/>
      <Remaining variant='food' percent={87} nextRefill={'8 hours'}></Remaining>
      <RemainingDetails variant='food' percent={87}/>
      <CurrentMeal lastFed='18 Nov, 15:26' petStatus='Not eaten'></CurrentMeal>
    </main>
  )
}
