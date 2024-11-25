import BacktoHomeButton from '@/components/basic/BackToHomeButton'
import Remaining from '@/components/basic/Remaining'
import RemainingDetails from '@/components/basic/RemainingDetails'

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <BacktoHomeButton/>
      <Remaining variant='water' percent={40}></Remaining>
      <RemainingDetails variant='water' percent={40}/>
    </main>
  )
}
