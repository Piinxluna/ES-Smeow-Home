import BacktoHomeButton from "@/components/basic/BackToHomeButton";
import Header from "@/components/basic/Header";
import Image from "next/image";

export default function Home() {
  return (
    <main className='flex flex-col md:px-32 md:py-12 min-h-screen'>
      <div className='md:hidden w-[390px] h-[844px] flex flex-col justify-center items-center bg-gradient-to-r from-purple-200 to-rose-200'>
        <p className='text-center text-4xl text-black font-bold mb-8 w-[70%]'>Please rotate the screen.</p>
        <BacktoHomeButton className="bg-white flex tranform scale-125"></BacktoHomeButton>
      </div>
      <div className="md:flex flex-col hidden md:p-4">
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
        <div className='flex items-center justify-center w-full '>
          <div className='w-[90%] h-[68vh] bg-darkgray rounded-lg'/>
        </div>
      </div>
    </main>
  )
}
