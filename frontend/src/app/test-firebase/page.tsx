'use client';

import { get, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import { database } from '../firebaseConfig';

export default function Home() {
  const [eatingStatus, setEatingStatus] = useState<EatingStatus>();

  useEffect(() => {
    const eatingStatusRef = ref(database, 'eatingStatus');
    get(eatingStatusRef).then((snapshot) => {
      if (snapshot.exists()) {
        console.log('data :', Object.entries(snapshot.val()));
        // const eatingStatusArr = Object.entries(snapshot.val()).map(
        //   ([id, data]) => ({ id, data })
        // );
        // setEatingStatus(eatingStatusArr);
      } else {
        console.log('no data available');
      }
    });
  });

  return (
    <main>
      <h1>Test fetching data from firebase</h1>
    </main>
  );
}
