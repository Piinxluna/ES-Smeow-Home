'use client'

import { child, get, ref, set } from 'firebase/database'
import { useEffect, useState } from 'react'
import { database } from '@/app/firebaseConfig'
import Image from 'next/image'

import BacktoHomeButton from '@/components/basic/BackToHomeButton'
import ConsumeBehavior from '@/components/basic/ConsumeBehavior'
import Control from '@/components/basic/Control'
import Header from '@/components/basic/Header'
import Remaining from '@/components/basic/Remaining'
import RemainingDetails from '@/components/basic/RemainingDetails'

export default function Water() {
  const [water, setWater] = useState<Water>()

  useEffect(() => {
    const fetchData = () => {
      const databaseRef = ref(database)
      // Fetch water data
      get(child(databaseRef, 'water'))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const waterVal = snapshot.val()
            setWater(waterVal)
          } else {
            console.log('no water data available')
          }
        })
        .catch((error) => {
          console.log('Error fetching water:', error)
        })
    }
    fetchData()
  }, [])

  return (
    <main className='flex flex-col md:px-32 md:py-16 px-6 py-8'>
      <div className='md:hidden mx-auto flex flex-col justify-center items-center '>
        <Header className='ml-2'></Header>
        <div className='flex flex-row w-full justify-center items-center mt-4 mb-6'>
          <img
            src='/images/Water.png'
            alt={'water icon'}
            className='rounded-lg h-6 max-w-md'
          />
          <p className='text-3xl text-eblue font-bold ml-2'>Water</p>
        </div>
        <RemainingDetails
          variant='water'
          remainingAmount={water?.waterLeft ?? 0}
          className='w-full'
        ></RemainingDetails>
        <ConsumeBehavior
          variant='water'
          lastHour={water?.totalLastHour ?? 0}
          today={water?.totalToday ?? 0}
          className='mt-6 mb-6 w-full'
        ></ConsumeBehavior>
        <Control variant='water' className='w-full mb-4 ' />
        <BacktoHomeButton className='mt-4 px-28'></BacktoHomeButton>
      </div>

      <div className='lg:flex flex-col hidden'>
        <div className='flex flex-row justify-between'>
          <Header></Header>
          <BacktoHomeButton className='mt-0'></BacktoHomeButton>
        </div>
        <div className='flex flex-row mt-8'>
          <div>
            <div className='flex flex-row'>
              <img
                src='/images/Water.png'
                alt={'water icon'}
                className='rounded-lg h-8 mt-2 max-w-md ml-4'
              />
              <p className='text-4xl text-eblue font-bold ml-4 mb-10'>Water</p>
            </div>
            <RemainingDetails
              variant='water'
              remainingAmount={water?.waterLeft ?? 0}
              className='flex ml-8 transform scale-125'
            ></RemainingDetails>
          </div>
          <ConsumeBehavior
            variant='water'
            lastHour={water?.totalLastHour ?? 0}
            today={water?.totalToday ?? 0}
            className='py-7 flex-grow mt-9 ml-32 mr-24 transform scale-125'
          ></ConsumeBehavior>
          <Control variant='water' className='' />
        </div>
      </div>
    </main>
  )
}
