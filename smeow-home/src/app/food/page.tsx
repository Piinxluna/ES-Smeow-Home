import BacktoHomeButton from '@/components/basic/BackToHomeButton'
import Remaining from '@/components/basic/Remaining'
import RemainingDetails from '@/components/basic/RemainingDetails'

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <BacktoHomeButton/>
      <Remaining variant='food' percent={87} nextRefill={'8 hours'}></Remaining>
      <RemainingDetails variant='food' percent={87}/>
    </main>
  )
}
