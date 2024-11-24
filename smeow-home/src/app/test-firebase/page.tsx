'use client'

import { child, get, ref, set } from 'firebase/database'
import { useEffect, useState } from 'react'
import { database } from '../firebaseConfig'

export default function ExampleFetchFirebase() {
  const [isReady, setIsReady] = useState(false)

  // data for display
  const [openFood, setOpenFood] = useState<boolean>(false)
  const [eatingStatus, setEatingStatus] = useState<EatingStatus>()

  // data for update control
  const [controlOpenFood, setControlOpenFood] = useState<boolean>(false)

  useEffect(() => {
    // Implementing the setInterval method
    const interval = setInterval(() => {
      setIsReady(false)
      fetchData()
    }, 3000)

    // Clearing the interval
    return () => clearInterval(interval)
  }, [eatingStatus, controlOpenFood])

  useEffect(() => {
    // Fetch data after update (some) controls
    fetchData()
  }, [controlOpenFood])

  const fetchData = () => {
    // Fetch data from firebase

    // Fetch a field in object
    const databaseRef = ref(database)
    get(child(databaseRef, 'control/' + 'openFood'))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const openFoodVal = snapshot.val()

          setOpenFood(openFoodVal)
          setControlOpenFood(openFoodVal)
          setIsReady(true)
        } else {
          console.log('no data available')
        }
      })
      .catch((error) => {
        console.log(error)
      })

    // Fetch all object
    const eatingStatusRef = ref(database, 'eatingStatus')
    get(eatingStatusRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          let eatingStatusObj = Object.fromEntries(
            Object.entries(snapshot.val())
          ) as unknown as EatingStatus

          setEatingStatus(eatingStatusObj)
          setIsReady(true)
        } else {
          console.log('no data available')
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleUpdateData = (key: string, value: any) => {
    // Update data in control object
    set(ref(database, 'control/' + key), value)
  }

  return (
    <main>
      <h1>Test fetching data from firebase</h1>
      {!isReady && <h3>Loading...</h3>}
      <hr />
      <div>
        <p>is ate : {eatingStatus?.isAte === true ? 'true' : 'false'}</p>
        <p>is eating : {eatingStatus?.isEating === true ? 'true' : 'false'}</p>
        <p>last feed time : {eatingStatus?.lastFeedTime}</p>
        <p>last eat time : {eatingStatus?.lastEatTime}</p>
        <p>total last meal : {eatingStatus?.totalLastMeal}</p>
        <p>total today : {eatingStatus?.totalToday}</p>
      </div>
      <hr />
      <div>
        <p>open food : {openFood === true ? 'true' : 'false'}</p>
        <button
          onClick={() => {
            setControlOpenFood(!controlOpenFood)
            handleUpdateData('openFood', !controlOpenFood)
            // handleUpdateData('feeding/isAutoMode', !controlOpenFood) <- more example
          }}
        >
          toggle open food
        </button>
      </div>
    </main>
  )
}
