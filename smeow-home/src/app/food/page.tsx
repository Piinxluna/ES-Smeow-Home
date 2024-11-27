import BacktoHomeButton from '@/components/basic/BackToHomeButton'
import Control from '@/components/basic/Control'
import Remaining from '@/components/basic/Remaining'
import RemainingDetails from '@/components/basic/RemainingDetails'
import CurrentMeal from '@/components/food/CurrentMeal'

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <BacktoHomeButton/>
      <RemainingDetails variant='food' percent={87}/>
      <CurrentMeal lastFed='18 Nov, 15:26' petStatus='Not eaten'></CurrentMeal>
      <Control variant='food' className='mt-4'></Control>
    </main>
  )
}
