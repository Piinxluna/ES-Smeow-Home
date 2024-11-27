import BacktoHomeButton from '@/components/basic/BackToHomeButton'
import ConsumeBehavior from '@/components/basic/ConsumeBehavior'
import Control from '@/components/basic/Control'
import Header from '@/components/basic/Header'
import Remaining from '@/components/basic/Remaining'
import RemainingDetails from '@/components/basic/RemainingDetails'

export default function Home() {
  return (
    <main className='flex flex-col px-32 py-12'>
      <div className='flex flex-row justify-between'>
        <Header></Header>
        <BacktoHomeButton className='mt-0'></BacktoHomeButton>
      </div>
      <div className='flex flex-row mt-8'>
        <div>
          <p className ='text-4xl text-eblue font-bold ml-8 mb-10'>Water</p>
          <RemainingDetails variant='water' percent={87} className='flex ml-8 transform scale-125'></RemainingDetails>
        </div>
        <ConsumeBehavior variant='water' lastHour={380} today={420} className='py-7 flex-grow mt-9 ml-32 mr-24 transform scale-125'></ConsumeBehavior>
        <Control variant='water' className='flex transform scale-150'></Control>
      </div>
    </main>
  )
}
