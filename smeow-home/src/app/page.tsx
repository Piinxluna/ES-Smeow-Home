import Button from '@/components/basic/Button'

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <Button variant='outline'>click me</Button>
      <p className='text-xl font-bold text-blue'>Test</p>
    </main>
  )
}
