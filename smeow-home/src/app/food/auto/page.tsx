import BacktoHomeButton from '@/components/basic/BackToHomeButton'
import Button from '@/components/basic/Button'
import ConsumeBehavior from '@/components/basic/ConsumeBehavior'
import Control from '@/components/basic/Control'
import Header from '@/components/basic/Header'
import RemainingDetails from '@/components/basic/RemainingDetails'
import CurrentMeal from '@/components/food/CurrentMeal'

export default function AutoFeeding() {
  return (
    <main className='flex flex-col px-32 py-16'>
      <div className='flex flex-row justify-between'>
        <Header></Header>
        <BacktoHomeButton className='mt-4'></BacktoHomeButton>
      </div>
      <div className='flex flex-row mt-8 '>
        <div>
          <p className ='text-4xl text-ebrown font-bold ml-10 mb-10'>Food</p>
          <RemainingDetails variant='food' percent={87} className='flex ml-10 transform scale-125'></RemainingDetails>
        </div>
        <ConsumeBehavior variant='food' lastHour={380} today={420} className='py-7 flex-grow mt-9 ml-32 mr-24 transform scale-125'></ConsumeBehavior>
        <CurrentMeal lastFed={'18 Nov, 15:26'} petStatus={'Not eaten'} className='mt-4'></CurrentMeal>
      </div>
      <div className='flex flex-row justify-center mt-6'>
        <div className='flex w-full mt-2 bg-white rounded-lg mr-12'>
          <div className='flex flex-col justify-center ml-8'>
            <p className='text-black text-3xl font-bold'>Auto Feeding</p>
            <p className='text-lightgray1 text-xl mt-2'>System will automatically feed when the cat is near the feeder</p>
          </div>
          <div className="ml-16 mr-16 mt-6 flex h-[80%] border-l-2 border-black"></div>
          <div className="flex items-center"> {/* Add this wrapper div */}
            <Button variant='secondary' href='/food/schedule' className='bg-lightgray2'>Change to Schedule Mode</Button>
          </div>
        </div>
        <Control variant='food' className='flex transform scale-150 flex-grow'></Control>
      </div>
    </main>
  )
}
