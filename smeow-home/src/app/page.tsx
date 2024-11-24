import Button from '@/components/basic/Button'
import BacktoHomeButton from '@/components/basic/BackToHomeButton'
import NavBar from '@/components/navbar/NavBar'

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <NavBar/>
      <p className='text-xl font-bold text-blue-500'>Test</p>
    </main>
  )
}
