'use client'

import { child, get, ref } from 'firebase/database'
import { useEffect, useState } from 'react'
import { database } from '@/app/firebaseConfig'
import Image from 'next/image'
import NavBar from '@/components/navbar/NavBar'
import CurrentTemp from '@/components/basic/CurrentTemp'
import CurrentHumidity from '@/components/basic/CurrentHumidity'
import Remaining from '@/components/basic/Remaining'
import Header from '@/components/basic/Header'
import Link from 'next/link'
import CurrentCML from '@/components/basic/CurrentCML'

export default function Home() {
  const [weather, setWeather] = useState<Weather>()
  const [water, setWater] = useState<Water>()
  const [live, setLive] = useState<Live>()

  useEffect(() => {
    const fetchData = () => {
      const databaseRef = ref(database)

      // Fetch weather data
      get(child(databaseRef, 'weather'))
        .then((snapshot) => {
          if (snapshot.exists()) {
            setWeather(snapshot.val())
          } else {
            console.log('No weather data available')
          }
        })
        .catch((error) => console.log('Error fetching weather:', error))

      // Fetch water data
      get(child(databaseRef, 'water'))
        .then((snapshot) => {
          if (snapshot.exists()) {
            setWater(snapshot.val())
          } else {
            console.log('No water data available')
          }
        })
        .catch((error) => console.log('Error fetching water:', error))

      // Fetch live data
      setLive({ image: '', syncTime: '18/11/2024, 15:10:36' })
    }

    fetchData()
  }, [])

  return (
    <main className='flex flex-col lg:flex-row justify-center items-center lg:items-start px-4 lg:px-12 py-8 max-h-full'>
      <div className='flex flex-col w-full lg:w-[70%] items-center lg:items-start lg:ml-16'>
        <Header className='lg:hidden mb-4'></Header>
        <NavBar
          variant='primary'
          className='flex lg:!hidden lg:absolute z-10 justify-items-center items-center lg:mt-8 lg:ml-52 mt-4'
        />

        <NavBar
          variant='secondary'
          className='hidden lg:flex absolute z-10 justify-items-center items-center lg:mt-6 lg:ml-60'
        />
        <div className='relative w-full max-w-[800px] rounded-lg mt-4'>
          <Image
            src='/images/LiveVideoBackground1.png'
            width={800}
            height={700}
            alt='Meow Background'
            className='w-full rounded-lg'
          />
          <div className='absolute top-0 text-l w-[90%]'>
            <Image
              src='/images/CatLive.png'
              width={24}
              height={24}
              alt='Live Picture'
              className='lg:mt-32 mt-16 ml-8  lg:ml-40'
            />
            <p className='absolute top-0 text-xl text-darkgray font-extrabold lg:mt-32 mt-16 ml-16 lg:ml-48'>
              Live
            </p>
            <p className='absolute top-0 hidden lg:block text-sm text-darkgray w-full lg:mt-32 lg:ml-64'>
              (Last sync at {live?.syncTime})
            </p>
            <Link
              href='/watch-live'
              className='cursor-pointer absolute top-0 right-0 lg:mt-32 mt-16 mr-4 lg:mr-32'
            >
              <Image
                src='/images/ZoomIn.png'
                width={24}
                height={24}
                alt='Zoom Background'
              />
            </Link>
          </div>
          <div className='absolute top-0 lg:mt-40 mt-24 ml-4 lg:ml-10 w-[90%] lg:h-[76%] h-[64%] bg-darkgray rounded-lg z-10 flex items-center justify-center' />
        </div>
      </div>

      {/* Right Section */}
      <div className='flex flex-col w-full lg:w-[30%] items-center justify-center h-full space-y-6 mt-4 mx-auto'>
        <Header className='hidden lg:flex mb-6 mt-4' />
        <CurrentTemp
          variant='primary'
          Temp={weather?.temperature ?? 0}
          className='w-full'
        />
        <CurrentHumidity Humidity={weather?.humidity ?? 0} className='w-full' />
        <CurrentCML
          CML={weather?.airQuality ?? 0}
          className='w-full'
        ></CurrentCML>
        <Remaining
          variant='water'
          remainingAmount={water?.waterLeft ?? 0}
          totalLastHour={water?.totalLastHour ?? 0}
          className='w-full'
        />
      </div>
    </main>
  )
}
