import BacktoHomeButton from "@/components/basic/BackToHomeButton";
import Header from "@/components/basic/Header";
import Image from "next/image";

export default function Home() {
  return (
    <main className='flex flex-col px-32 py-12 min-h-screen'>
      <div className='flex flex-row justify-between'>
        <Header className='text-5xl'></Header>
        <BacktoHomeButton className='mt-8'></BacktoHomeButton>
      </div>
      <div className="flex flex-row justify-end mt-4 mb-4">
          <Image
                src='/resources/images/CatLive.png'
                width={36}
                height={32}
                alt="Zoom Background"
                className=''
                >
            </Image>
            <p className="text-3xl text-darkgray font-bold mt-2 ml-4">Live</p>
            <p className='mt-4 text-l text-lightgray2 ml-4 font-bold'>(Last sync at 18/11/2024, 15:10:36)</p>
      </div>
      <div className='flex items-center justify-center w-full'>
        <div className='w-[90%] h-[68vh] bg-darkgray rounded-lg'/>
      </div>
    </main>
  )
}
