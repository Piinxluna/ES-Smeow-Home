import Button from '@/components/basic/Button'
import BacktoHomeButton from '@/components/basic/BackToHomeButton'
import NavBar from '@/components/navbar/NavBar'
import CurrentTemp from '@/components/basic/CurrentTemp'
import LastFed from '@/components/food/LastFed'
import Header from '@/components/basic/Header'
import Remaining from '@/components/basic/Remaining'

export default function Home() {
  return (
    <main className='flex flex-row justify-items-center px-16 py-12 max-h-full'>
      <div className='flex flex-col justify-items-center items-center w-[80%]'>
        <Header className='mb-8'></Header>
        <NavBar variant='secondary'/>
{/*         <img
            src="/resources/web/LiveVideoBackground1.png"
            alt={'Show video'}
            className="rounded-lg h-max max-w-md ml-4"
            /> */}
          <div className='bg-darkgray h-full w-[90%] rounded-lg mt-4'> </div>
      </div>
      <div className='flex flex-col justify-items-center items-center space-y-4 mt-20 w-[20%]'>
        <CurrentTemp variant='primary' Temp={35} className='w-full content-center-'></CurrentTemp>
        <Remaining variant='water' percent={87} nextRefill='1 Day 14 Hours'  className='w-full'></Remaining>
        <LastFed percent={40} nextRefill={'1 Day 14 Hours'} lastFed={'18 Nov, 15:26'} petStatus={'Not eaten'} className='w-full'></LastFed>
      </div>
    </main>
  )
}
