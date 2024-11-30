'use client';

import { child, get, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import { database } from '@/app/firebaseConfig';
import Image from 'next/image';
import NavBar from '@/components/navbar/NavBar';
import CurrentTemp from '@/components/basic/CurrentTemp';
import CurrentHumidity from '@/components/basic/CurrentHumidity';
import Remaining from '@/components/basic/Remaining';
import Header from '@/components/basic/Header';
import Link from 'next/link';
import { error } from 'console';

export default function Home() {
  const [isReady, setIsReady] = useState(false);
  const [weather, setWeather] = useState<Weather>();
  const [water, setWater] = useState<Water>();

  useEffect(() => {
    const fetchData = () => {
      const databaseRef = ref(database);
      
      // Fetch weather data
      get(child(databaseRef, 'weather'))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const weatherVal = snapshot.val();
            setWeather(weatherVal);
          } else {
            console.log('no weather data available');
          }
        })
        .catch((error) => {
          console.log('Error fetching weather:', error);
        });

      // Fetch water data
      get(child(databaseRef, 'water'))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const waterVal = snapshot.val();
            setWater(waterVal);
          } else {
            console.log('no water data available');
          }
        })
        .catch((error) => {
          console.log('Error fetching water:', error);
        });
    };

    fetchData();
  }, []);

  return (
    <main className="flex flex-row justify-items-center px-12 py-8 max-h-full">
      <div className="flex flex-col ml-12 w-[70%]">
        <div className="flex flex-col items-center w-full max-w-[800px] rounded-lg mt-6">
          <NavBar variant="secondary" className="absolute z-10 flex justify-items-center items-center" />
          <div className="relative w-full">
            <Image
              src="/resources/web/LiveVideoBackground1.png"
              width={800}
              height={700}
              alt="Meow Background"
              className="relative"
            />
            <div className="absolute top-0 text-l w-[90%]">
              <Image
                src="/resources/images/CatLive.png"
                width={24}
                height={24}
                alt="Meow Background"
                className="mt-32 ml-40"
              />
              <p className="absolute top-0 text-xl text-darkgray font-extrabold mt-32 ml-48">Live</p>
              <p className="absolute top-0 text-sm text-darkgray w-full mt-32 ml-64">
                (Last sync at 18/11/2024, 15:10:36)
              </p>
              <Link href="/watch-live" className="cursor-pointer">
                <Image
                  src="/resources/images/ZoomIn.png"
                  width={24}
                  height={24}
                  alt="Zoom Background"
                  className="absolute top-0 right-0 mt-32 mr-32"
                />
              </Link>
            </div>
            <div className="absolute top-0 mt-40 ml-10 w-[90%] h-[76%] bg-darkgray rounded-lg z-10 flex items-center justify-center" />
          </div>
        </div>
      </div>
      <div className="flex flex-col mr-12 mt-8 justify-items-center items-center space-y-8 w-[30%]">
        <Header className="mt-12 mb-6" />
        <CurrentTemp variant="primary" Temp={weather?.temperature ?? 0} className="w-full" />
        <CurrentHumidity Humidity={weather?.humidity ?? 0} />
        <Remaining variant="water" remainingAmount={water?.waterLeft ?? 0} nextRefill="1 Day 14 Hours" className="w-full" />
        {/* <LastFed percent={40} nextRefill={'1 Day 14 Hours'} lastFed={'18 Nov, 15:26'} petStatus={'Not eaten'} className='w-full'></LastFed> */}
      </div>
    </main>
  );
}
