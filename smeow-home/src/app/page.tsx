import Button from '@/components/basic/Button'
import BacktoHomeButton from '@/components/basic/BackToHomeButton'
import NavBar from '@/components/navbar/NavBar'
import CurrentTemp from '@/components/basic/CurrentTemp'

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <NavBar/>
      <CurrentTemp variant='primary'>25</CurrentTemp>
      <CurrentTemp variant='secondary'>30</CurrentTemp>
      <CurrentTemp variant='secondary'>35</CurrentTemp>
    </main>
  )
}
