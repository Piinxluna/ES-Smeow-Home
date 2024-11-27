import Button from '@/components/basic/Button'
import BacktoHomeButton from '@/components/basic/BackToHomeButton'
import NavBar from '@/components/navbar/NavBar'
import CurrentTemp from '@/components/basic/CurrentTemp'
import EatingBehavior from '@/components/food/EatingBehavior'

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <NavBar/>
      <CurrentTemp variant='primary' Temp={25}/>
      <CurrentTemp variant='secondary' Temp={30}/>
      <EatingBehavior percent={87} nextRefill='8 hours' lastFed='18 Nov, 15:26' petStatus='not eaten'/>
    </main>
  )
}
