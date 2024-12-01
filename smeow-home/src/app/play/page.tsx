'use client'

import Button from '@/components/basic/Button'
import BacktoHomeButton from '@/components/basic/BackToHomeButton'
import Header from '@/components/basic/Header'
import Image from 'next/image'
import OnOffButton from '@/components/basic/OnOffButton'
import { child, get, ref, remove, set } from 'firebase/database'
import { useEffect, useState } from 'react'
import { database } from '@/app/firebaseConfig'

export default function Home() {
  const [activeButton, setactiveButton] = useState<string>('')
  const [mode, setMode] = useState<number>()

  const handleModeChange = async (clickedMode: number) => {
    try {
      await fetch('/api/lasermode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mode: clickedMode }),
      })
      setMode(clickedMode)
      set(ref(database, 'control/' + 'laserMode'), clickedMode)
    } catch (error) {
      console.error('Error updating laser mode:', error)
    }
  }

  useEffect(() => {
    const fetchData = () => {
      const databaseRef = ref(database)
      // Fetch water data
      get(child(databaseRef, 'control/laserMode'))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const modeval = snapshot.val()
            setMode(modeval)
          } else {
            console.log('no laser mode data available')
          }
        })
        .catch((error) => {
          console.log('Error fetching laser mode:', error)
        })
    }

    fetchData()
  }, [])

  return (
    <main className='flex min-h-screen flex-col md:py-16 md:px-24 px-6 py-8'>
      <div className='md:hidden flex flex-col justify-center items-center'>
        <Header className='ml-2'></Header>
        <div className='flex flex-row mt-4 mb-2mr-4'>
          <Image
            src='/images/Play.png'
            width={40}
            height={36}
            alt='Zoom Background'
            className=''
          ></Image>
          <p className='text-ered text-4xl font-bold ml-6'>Play</p>
        </div>
        <div className='bg-white w-[95%] h-fit py-6 px-4 mt-6 flex flex-col rounded-lg'>
          <p className='text-black text-2xl font-bold ml-2'>Turn on laser</p>
          <div className='flex flex-row space-x-4 mt-4 ml-4'>
            <OnOffButton
              active='Off'
              inActive='Off'
              isSelected={activeButton === 'Off'}
              className='font-extrabold'
              onClick={() => {
                setactiveButton(activeButton === 'Off' ? '' : 'Off')
                handleModeChange(0)
              }}
            />
            <OnOffButton
              active='Random'
              inActive='Random'
              isSelected={activeButton === 'Random'}
              className='font-extrabold'
              onClick={() => {
                setactiveButton(activeButton === 'Random' ? '' : 'Random')
                handleModeChange(1)
              }}
            />
          </div>

          <div className='flex flex-row  space-x-4 mt-2 ml-4'>
            <OnOffButton
              active='Zig-Zag'
              inActive='Zig-Zag'
              isSelected={activeButton === 'Zig-Zag'}
              className='font-extrabold'
              onClick={() => {
                setactiveButton(activeButton === 'Zig-Zag' ? '' : 'Zig-Zag')
                handleModeChange(2)
              }}
            />
            <OnOffButton
              active='Zig-Zag Flip'
              inActive='Zig-Zag Flip'
              isSelected={activeButton === 'Zig-Zag Flip'}
              className='font-extrabold'
              onClick={() => {
                setactiveButton(
                  activeButton === 'Zig-Zag Flip' ? '' : 'Zig-Zag Flip'
                )
                handleModeChange(3)
              }}
            />
          </div>

          <div className='flex flex-row  space-x-4 mt-2 ml-4'>
            <OnOffButton
              active='Circle'
              inActive='Circle'
              isSelected={activeButton === 'Circle'}
              className='font-extrabold'
              onClick={() => {
                setactiveButton(activeButton === 'Circle' ? '' : 'Circle')
                handleModeChange(4)
              }}
            />
            <OnOffButton
              active='Dash'
              inActive='Dash'
              isSelected={activeButton === 'Dash'}
              className='font-extrabold'
              onClick={() => {
                setactiveButton(activeButton === 'Dash' ? '' : 'Dash')
                handleModeChange(5)
              }}
            />
          </div>
          <div className='flex justify-center items-center w-[90%] h-[200px] rounded-lg bg-darkgray mt-10 ml-4 mb-4'></div>
        </div>
        <BacktoHomeButton className='mt-8 px-28'></BacktoHomeButton>
      </div>

      <div className='hidden lg:flex flex-col'>
        <div className='flex flex-row justify-between'>
          <Header className='text-5xl'></Header>
          <BacktoHomeButton className='mt-8'></BacktoHomeButton>
        </div>
        <div className='flex flex-row mt-8 mb-4 ml-8'>
          <Image
            src='/images/Play.png'
            width={40}
            height={36}
            alt='Zoom Background'
            className=''
          ></Image>
          <p className='text-ered text-4xl font-bold ml-6'>Play</p>
        </div>
        <div className='bg-white w-full h-[40%] flex flex-row px-8 py-8 rounded-lg mt-12'>
          <div className='flex flex-col justify-center w-[70%]'>
            <p className='text-black text-2xl font-bold mb-4'>Turn on Laser</p>
            <div className='flex flex-row space-x-4'>
              <OnOffButton
                active='Off'
                inActive='Off'
                isSelected={activeButton === 'Off'}
                onClick={() => {
                  setactiveButton('Off')
                  handleModeChange(0)
                }}
                className=''
              />
              <OnOffButton
                active='Random'
                inActive='Random'
                isSelected={activeButton === 'Random'}
                onClick={() => {
                  setactiveButton('Random')
                  handleModeChange(1)
                }}
                className=''
              />
              <OnOffButton
                active='Zig-Zag'
                inActive='Zig-Zag'
                isSelected={activeButton === 'Zig-Zag'}
                onClick={() => {
                  setactiveButton('Zig-Zag')
                  handleModeChange(2)
                }}
                className=''
              />
              <OnOffButton
                active='Zig-Zag flip'
                inActive='Zig-Zag flip'
                isSelected={activeButton === 'Zig-Zag flip'}
                onClick={() => {
                  setactiveButton('Zig-Zag flip')
                  handleModeChange(3)
                }}
                className=''
              />
              <OnOffButton
                active='Circle'
                inActive='Circle'
                isSelected={activeButton === 'Circle'}
                onClick={() => {
                  setactiveButton('Circle')
                  handleModeChange(4)
                }}
                className=''
              />
              <OnOffButton
                active='Dash'
                inActive='Dash'
                isSelected={activeButton === 'Dash'}
                onClick={() => {
                  setactiveButton('Dash')
                  handleModeChange(5)
                }}
                className=''
              />
            </div>
          </div>
          <div className='w-[30%] h-[240px] rounded-lg bg-darkgray'></div>
        </div>
      </div>
    </main>
  )
}
