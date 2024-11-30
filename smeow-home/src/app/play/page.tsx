'use client';

import Button from '@/components/basic/Button';
import BacktoHomeButton from '@/components/basic/BackToHomeButton';
import Header from '@/components/basic/Header';
import Image from 'next/image';
import OnOffButton from '@/components/basic/OnOffButton';
import React, { useState , useEffect } from 'react';

export default function Home() {
  const [activeButton, setActiveButton] = useState<string>('');
  const [isReady, setIsReady] = useState(false);
  const [water, setWater] = useState<Water>();
  
  useEffect(() => {
    const fetchData = () => {
      const databaseRef = ref(database);
      // Fetch water data
      get(child(databaseRef, 'control'))
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
    <main className='flex min-h-screen flex-col py-16 px-24'>
      <div className='flex flex-row justify-between'>
        <Header className='text-5xl'></Header>
        <BacktoHomeButton className='mt-8'></BacktoHomeButton>
      </div>
      <div className='flex flex-row mt-8 ml-8'>
            <Image
                src='/resources/images/Play.png'
                width={40}
                height={36}
                alt="Zoom Background"
                className=''
                >
            </Image>
            <p className='text-ered text-4xl font-bold ml-6'>Play</p>
      </div>
      <div className='bg-white w-full h-[40%] flex flex-row px-8 py-8 rounded-lg mt-12'>
        <div className='flex flex-col justify-center w-[70%]'>
          <p className='text-black text-2xl font-bold mb-4'>Turn on Laser</p>
          <div className='flex flex-row space-x-4'>
            <OnOffButton 
              Active='Off' 
              InActive='Off' 
              isSelected={activeButton === 'Off'}
              onClick={() => setActiveButton(activeButton === 'Off' ? '' : 'Off')}
              className=''
            />
            <OnOffButton 
              Active='Random' 
              InActive='Random'
              isSelected={activeButton === 'Random'}
              onClick={() => setActiveButton(activeButton === 'Random' ? '' : 'Random')}
              className=''
            />
            <OnOffButton 
              Active='Zig-Zag' 
              InActive='Zig-Zag'
              isSelected={activeButton === 'Zig-Zag'}
              onClick={() => setActiveButton(activeButton === 'Zig-Zag' ? '' : 'Zig-Zag')}
              className=''
            />
            <OnOffButton 
              Active='Zig-Zag flip' 
              InActive='Zig-Zag flip'
              isSelected={activeButton === 'Zig-Zag flip'}
              onClick={() => setActiveButton(activeButton === 'Zig-Zag flip' ? '' : 'Zig-Zag flip')}
              className=''
            />
            <OnOffButton 
              Active='Circle' 
              InActive='Circle'
              isSelected={activeButton === 'Circle'}
              onClick={() => setActiveButton(activeButton === 'Circle' ? '' : 'Circle')}
              className=''
            />
            <OnOffButton 
              Active='Dash' 
              InActive='Dash'
              isSelected={activeButton === 'Dash'}
              onClick={() => setActiveButton(activeButton === 'Dash' ? '' : 'Dash')}
              className=''
            />
          </div>
        </div>
        <div className='w-[30%] h-[240px] rounded-lg bg-darkgray'></div>
      </div>
    </main>
  )
}
