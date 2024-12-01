'use client';

import BacktoHomeButton from '@/components/basic/BackToHomeButton'
import Button from '@/components/basic/Button'
import ConsumeBehavior from '@/components/basic/ConsumeBehavior'
import Control from '@/components/basic/Control'
import Header from '@/components/basic/Header'
import RemainingDetails from '@/components/basic/RemainingDetails'
import CurrentMeal from '@/components/food/CurrentMeal'
import { useState } from 'react';

export default function AutoFeeding() {
    const [feedingTimes, setFeedingTimes] = useState<string[]>([]);
    const [newTime, setNewTime] = useState('');

    const addFeedingTime = () => {
        if(newTime && feedingTimes.length < 3) {
        setFeedingTimes([...feedingTimes, newTime]);
        setNewTime('');}
    }
  return (
    <main className='flex flex-col px-32 py-12'>
      <div className='flex flex-row justify-between'>
        <Header className='text-5xl'></Header>
        <BacktoHomeButton className='mt-4'></BacktoHomeButton>
      </div>
      <div className='flex flex-row mt-8 '>
        <div>
        <div className='flex flex-row'>
          <img
            src="/resources/images/Food.png"
            alt={'food icon'}
            className="rounded-lg h-10 max-w-md ml-4"
            />
          <p className ='text-4xl text-ebrown font-bold ml-4 mb-10'>Food</p></div>
          <RemainingDetails variant='food' remainingAmount={100} className='flex ml-10 transform scale-125'></RemainingDetails>
        </div>
        <ConsumeBehavior variant='food' lastHour={380} today={420} className='py-7 flex-grow mt-9 ml-32 mr-24 transform scale-125'></ConsumeBehavior>
        <CurrentMeal lastFed={'18 Nov, 15:26'} petStatus={'Not eaten'} className='mt-4'></CurrentMeal>
      </div>
            <div className='flex flex-row justify-center mt-6 '>

              <div className='flex mt-2 bg-white rounded-lg mr-12 w-full px-4 py-8'>
                <div className='flex flex-col justify-center ml-8 w-[70%]'>
                  <p className='text-black text-3xl font-bold'>Schedule Feeding time</p>
                  <p className='text-lightgray1 text-xl mt-2'>Current feeding time</p>
                <div className="flex flex-row items-center w-full mt-2">
                  {feedingTimes.map((time, index) => (
                    <>
                      <span className="text-2xl font-bold text-ebrown">{time}</span>
                      {index < feedingTimes.length - 1 && (
                        <div className="h-6 border-r border-black ml-4 mr-4"></div>
                      )}
                    </>
                  ))}
                </div>
                </div>
                <div className="ml-8 mr-4 mt-2 flex h-[90%] border-l-2 border-black"></div>
              
              <div className="flex flex-col justify-center w-[30%] items-center px-8">

                {feedingTimes.length < 3 ? (    
                  <div className="flex flex-col items-center space-y-4">
                    <p className="text-lightgray1 text-2xl font-bold mt-2 mb-2 w-[70%] text-center">
                        Add new feeding time
                    </p>
                    <input
                      type="time"
                      value={newTime}
                      onChange={(e) => setNewTime(e.target.value)}
                      className="border border-lightgray2 px-4 py-1 rounded-md text-lg text-lightgray1 w-full"
                      placeholder="Please enter time"
                    />
                    <button
                      onClick={addFeedingTime}
                      className="bg-lightgray2 text-black py-1 w-full rounded-lg text-md font-medium">
                      Add
                    </button>
                    <div className='text-black text-md'>------------ or ------------</div>
                  </div>
                ) : (
                  <p className="text-ered text-xl font-medium text-center mt-4">
                    Maximum 3 feeding times allowed.
                  </p>
                )}
                <div className="mt-4 mb-4 w-full">
                  <Button
                    variant="secondary"
                    href="/food/auto"
                    className="bg-lightgray2 w-full py-2 font-bold text-l"
                  >
                    Change to auto mode
                  </Button>
                </div>
              </div>
              </div>
{/*               <Control 
                variant="food"
                className="flex transform scale-150 flex-grow"
              /> */}
            </div>
          </main>
  )
}
