import Button from '@/components/basic/Button'
import BacktoHomeButton from '@/components/basic/BackToHomeButton'
import NavBar from '@/components/navbar/NavBar'
import CurrentTemp from '@/components/basic/CurrentTemp'
import LastFed from '@/components/food/LastFed'
import Header from '@/components/basic/Header'

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <Header></Header>
      <NavBar/>
      <CurrentTemp variant='primary' Temp={25}/>
      <CurrentTemp variant='secondary' Temp={30}/>
      <LastFed percent={87} nextRefill='8 hours' lastFed='18 Nov, 15:26' petStatus='Not eaten'/>
    </main>
  )
}
