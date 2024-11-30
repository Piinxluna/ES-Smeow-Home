'use client';

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

  const [isOpen, setIsOpen] = useState(false);

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
  if (isTrue) {
    buttonType = 'primary';
    act = 'Close';
    inAct = 'Open';
  } else {
    buttonType = 'secondary';
    act = 'Open';
    inAct = 'Close';
  }
  
  const [control, setControl] = useState<Control>();
  
  useEffect(() => {
    const fetchData = () => {
      const databaseRef = ref(database)
        get(child(databaseRef, 'control' + '/openWater'))
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
    const handleUpdateData = () => {
      // Update data in control object
      set(ref(database, 'control/' + 'openWater'), !control)
    }
    const handleToggle = () => {
    setIsOpen(!isOpen);
    handleUpdateData();
  };

  return (
    <div className={`${theme} flex flex-col justify-center py-12 px-10 mt-2`}>
      <p className="text-2xl font-bold text-black text-center">{title}</p>
      <p className="text-sm text-lightgray1 font-semibold py-2 text-center">{description}</p>
      <OnOffButton 
        className='w-full' 
        variant={buttonType} 
        Active={act}
        InActive={inAct}
        isSelected={isOpen} 
        onClick={handleToggle}
      />
    </div>
  );
}
