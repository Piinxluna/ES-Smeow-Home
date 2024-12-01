'use client'

import { child, get, ref, set } from 'firebase/database'
import { use, useEffect, useState } from 'react'
import { database } from '@/app/firebaseConfig'

import OnOffButton from './OnOffButton'

export default function Control({
  variant = 'water',
  className = '',
}: {
  variant: string
  className?: string
}) {
  const [control, setControl] = useState<boolean>(false)
  const [controlInput, setControlInput] = useState<boolean>(false)

  let theme = 'font-semibold bg-white w-60 rounded-lg'
  let title = ''
  let description = ''
  variant === 'water' ? (title = 'Control water') : (title = 'Feed now')
  variant === 'water'
    ? (description = 'Open / Close cat fountain')
    : (description = 'Drop food from automatic feeder')

  useEffect(() => {
    const fetchData = () => {
      const databaseRef = ref(database)
      get(child(databaseRef, 'control/openWater'))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const controlVal = snapshot.val()
            setControl(controlVal)
          } else {
            console.log('no water open data available')
          }
        })
        .catch((error) => {
          console.log('Error fetching water data:', error)
        })
    }
    fetchData()
  }, [controlInput])

  useEffect(() => {
    console.log(control)
  }, [control])

  const handleToggle = () => {
    const newValue = !control
    set(ref(database, 'control/openWater'), newValue)
      .then(() => {
        setControl(newValue)
      })
      .catch((error) => {
        console.log('Error updating data:', error)
      })
    setControlInput(newValue)
  }

  return (
    <div
      className={`${theme} ${className} flex flex-col justify-center md:py-12 md:px-10 py-8 px-6 mt-2`}
    >
      <p className='text-2xl font-bold text-black text-center'>{title}</p>
      <p className='text-sm text-lightgray1 font-semibold py-2 text-center'>
        {description}
      </p>
      <OnOffButton
        className='w-[70%] flex items-center justify-center mx-auto mt-2'
        active='Open'
        inActive='Close'
        isSelected={control}
        onClick={handleToggle}
      />
    </div>
  )
}
