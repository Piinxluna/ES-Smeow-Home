'use client';

import { child, get, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import { database } from '@/app/firebaseConfig';

import BacktoHomeButton from '@/components/basic/BackToHomeButton'
import ConsumeBehavior from '@/components/basic/ConsumeBehavior'
import Control from '@/components/basic/Control'
import Header from '@/components/basic/Header'
import Remaining from '@/components/basic/Remaining'
import RemainingDetails from '@/components/basic/RemainingDetails'

export default function Water(
) {
  const [isReady, setIsReady] = useState(false);
  const [water, setWater] = useState<Water>();

  useEffect(() => {
    const fetchData = () => {
      const databaseRef = ref(database)
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
    <main className='flex flex-col px-32 py-16'>
      <div className='flex flex-row justify-between'>
        <Header></Header>
        <BacktoHomeButton className='mt-0'></BacktoHomeButton>
      </div>
      <div className='flex flex-row mt-8'>
        <div>
          <p className ='text-4xl text-eblue font-bold ml-8 mb-10'>Water</p>
          <RemainingDetails variant='water' remainingAmount={water?.waterLeft ?? 0} className='flex ml-8 transform scale-125'></RemainingDetails>
        </div>
        <ConsumeBehavior variant='water' lastHour={water?.totalLastHour ?? 0} today={water?.totalToday ?? 0} className='py-7 flex-grow mt-9 ml-32 mr-24 transform scale-125'></ConsumeBehavior>
        <Control variant='water' className='flex transform scale-150'></Control>
      </div>
    </main>
  )
}
