import Image from 'next/image'
import NavBar from '@/components/navbar/NavBar'
import CurrentTemp from '@/components/basic/CurrentTemp'
import LastFed from '@/components/food/LastFed'
import Header from '@/components/basic/Header'
import Remaining from '@/components/basic/Remaining'


export default function Home() {
  return (
    <main className='flex flex-row justify-items-center px-12 py-8 max-h-full'>
      <div className='flex flex-col ml-12 w-[70%]'>
        <div className="flex flex-col items-center w-full max-w-[800px] rounded-lg mt-6">
        <NavBar variant='secondary' className='absolute z-10 flex justify-items-center items-center'/>
        <div className='relative w-full'>
          <Image
            src='/resources/web/LiveVideoBackground1.png'
            width={800}
            height={700}
            alt="Meow Background"
            className='relative'
            >
          </Image>
          <div className='absolute top-0 mt-40 ml-10 w-[90%] h-[76%] bg-darkgray rounded-lg z-10 flex items-center justify-center'>
          </div>
        </div>
      </div>
      </div>
      <div className='flex flex-col mr-12 justify-items-center items-center space-y-4 w-[30%]'>
        <Header className='mt-12 mb-6'></Header>
        <CurrentTemp variant='primary' Temp={35} className='w-full'></CurrentTemp>
        <Remaining variant='water' percent={87} nextRefill='1 Day 14 Hours'  className='w-full'></Remaining>
        <LastFed percent={40} nextRefill={'1 Day 14 Hours'} lastFed={'18 Nov, 15:26'} petStatus={'Not eaten'} className='w-full'></LastFed>
      </div>
    </main>
  )
}
