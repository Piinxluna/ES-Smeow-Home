import Button from '@/components/basic/Button'
import BacktoHomeButton from '@/components/basic/BackToHomeButton'
import ShowLeft from '@/components/basic/Remaining'

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <BacktoHomeButton/>
      <ShowLeft variant='food'>87</ShowLeft>
    </main>
  )
}
