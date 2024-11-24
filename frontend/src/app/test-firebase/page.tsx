'use client'

import { get, ref } from 'firebase/database'
import { useEffect, useState } from 'react'
import { database } from '../firebaseConfig'

export default function Home() {
  const [eatingStatus, setEatingStatus] = useState<EatingStatus>()

  useEffect(() => {
    const eatingStatusRef = ref(database, 'eatingStatus')
    get(eatingStatusRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          let eatingStatusObj = Object.fromEntries(
            Object.entries(snapshot.val())
          )

          console.log(eatingStatusObj)
          setEatingStatus(eatingStatusObj as unknown as EatingStatus)
        } else {
          console.log('no data available')
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <main>
      <h1>Test fetching data from firebase</h1>
      <div>
        <p>is ate : {eatingStatus?.isAte === true ? 'true' : 'false'}</p>
        <p>is eating : {eatingStatus?.isEating === true ? 'true' : 'false'}</p>
        <p>last feed time : {eatingStatus?.lastFeedTime}</p>
        <p>last eat time : {eatingStatus?.lastEatTime}</p>
        <p>total last meal : {eatingStatus?.totalLastMeal}</p>
        <p>total today : {eatingStatus?.totalToday}</p>
      </div>
    </main>
  )
}
