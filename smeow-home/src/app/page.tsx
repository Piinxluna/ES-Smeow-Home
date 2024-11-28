import Button from '@/components/basic/Button'
import BacktoHomeButton from '@/components/basic/BackToHomeButton'
import NavBar from '@/components/navbar/NavBar'
import CurrentTemp from '@/components/basic/CurrentTemp'
import LastFed from '@/components/food/LastFed'
import Header from '@/components/basic/Header'
import Remaining from '@/components/basic/Remaining'

const VideoContainer = () => {
  return (
    <div style={{
      position: 'relative',
      
      backgroundImage: "url('/resources/web/LiveVideoBackground1.png')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '500px',
      width: '100%'
    }}>
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        right: '20px',
        bottom: '20px',
        backgroundColor: '#463F3A', // Gray background for video area
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* Place your video component here */}
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <main className='flex flex-row justify-items-center px-16 py-12 max-h-full'>
      <div className='flex flex-col justify-items-center items-center w-[75%]'>
        <Header className='mb-8'></Header>
        <NavBar variant='secondary'/>
        <div className="flex flex-col items-center w-full max-w-[800px] bg-gray-200 rounded-lg shadow-lg mt-6">
        <VideoContainer />
      </div>
      </div>
      <div className='flex flex-col justify-items-center items-center space-y-4 mt-20 w-[25%]'>
        <CurrentTemp variant='primary' Temp={35} className='w-full content-center-'></CurrentTemp>
        <Remaining variant='water' percent={87} nextRefill='1 Day 14 Hours'  className='w-full'></Remaining>
        <LastFed percent={40} nextRefill={'1 Day 14 Hours'} lastFed={'18 Nov, 15:26'} petStatus={'Not eaten'} className='w-full'></LastFed>
      </div>
    </main>
  )
}
