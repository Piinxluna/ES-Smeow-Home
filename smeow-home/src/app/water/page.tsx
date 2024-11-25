import BacktoHomeButton from '@/components/basic/BackToHomeButton'
import Remaining from '@/components/basic/Remaining'

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <BacktoHomeButton/>
      <Remaining variant='water'>40</Remaining>
    </main>
  )
}
