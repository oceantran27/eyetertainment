// components/HeroSection.js
import Image from 'next/image'
import CardWrapper from '@/components/cards'

export default function HomePage() {
  return (
    <div className="h-screen overflow-y-auto">
        <div className="flex flex-col p-4 bg-[#111318] overflow-auto min-h-screen">
            {/* <div className="justify-center gap-6 rounded-lg bg-[#1a1b20] px-6 py-10 md:px-20 w-full h-full"> */}
                <div className="flex-auto flex flex-col md:flex-row md:gap-36 justify-center items-center text-center  p-4">
                    <div className='flex flex-col items-center justify-center'>
                        <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#e2e2e9]">Eyetertainer</h1>
                        <p className="text-lg text-[#adc6ff]">See the fun, feel the joy – Control with your eyes, enjoy with your heart.</p>
                    </div>
                    <div className="mb-6">
                    {/* Logo */}
                        <Image src="/images/hero-image.png" alt="hero image" width={350} height={350} />
                    </div>
                </div>

                <div className="flex-auto p-6 flex items-center justify-center">
                    <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-3 w-full h-full">
                        <CardWrapper />
                    </div>
                </div>
            {/* </div> */}
        </div>
    </div>
  )
}


