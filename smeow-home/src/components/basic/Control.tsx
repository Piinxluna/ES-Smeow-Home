'use client';

import { child, get, ref, set } from 'firebase/database';
import { useEffect, useState } from 'react';
import { database } from '@/app/firebaseConfig';

import OnOffButton from './OnOffButton';

export default function Control({
  variant = 'water',
  isTrue = false,
  className = '',
}: {
  variant: string;
  isTrue: boolean;
  className?: string;
}) {
  const [control, setControl] = useState<boolean>(false);

  let buttonType: 'primary' | 'secondary' = 'secondary';
  let act = '';
  let inAct = '';
  let theme = 'font-semibold bg-white w-60 rounded-lg';
  let title = '';
  let description = '';
  variant === 'water' ? (title = 'Control water') : (title = 'Feed now');
  variant === 'water'
    ? (description = 'Open / Close cat fountain')
    : (description = 'Drop food from automatic feeder');
  if (!isTrue) {
    buttonType = 'primary';
    act = 'Close';
    inAct = 'Open';
  } else {
    buttonType = 'secondary';
    act = 'Open';
    inAct = 'Close';
  }

  useEffect(() => {
    const fetchData = () => {
      const databaseRef = ref(database);
      get(child(databaseRef, 'control/openWater'))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const controlVal = snapshot.val();
            setControl(controlVal);
          } else {
            console.log('no water open data available');
          }
        })
        .catch((error) => {
          console.log('Error fetching water data:', error);
        });
    };
    fetchData();
  }, []);

  const handleToggle = () => {
    const newValue = !control;
    set(ref(database, 'control/openWater'), newValue)
      .then(() => {
        setControl(newValue);
      })
      .catch((error) => {
        console.log('Error updating data:', error);
      });
  };

  return (
    <div
      className={`${theme} ${className} flex flex-col justify-center md:py-12 md:px-10 py-8 px-6 mt-2`}
    >
      <p className="text-2xl font-bold text-black text-center">{title}</p>
      <p className="text-sm text-lightgray1 font-semibold py-2 text-center">
        {description}
      </p>
      <OnOffButton
        className="w-[70%] flex items-center justify-center mx-auto mt-2"
        variant={buttonType}
        Active={act}
        InActive={inAct}
        isSelected={control}
        onClick={handleToggle}
      />
    </div>
  );
}
