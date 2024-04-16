import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import '@/app/ui/global.css'

const WebcamComponent = dynamic(() => import('../ui/components/webcam'), {
    ssr: false
  });

export default function Page() {
    return (
      <main>
        <div className="relative w-full h-screen flex justify-center">
          <div><WebcamComponent /></div>
          <div className="absolute z-1 left-5 top-5">
                <Image src="/construction.png"
                  width={200}
                  height={100}
                  className="hidden md:block"
                  alt="Screenshots of the dashboard project showing desktop version"
                />
          </div>
          <div className="absolute z-2 left-5 mt-100px">
                <Image src="/const-문구.png"
                  width={500}
                  height={200}
                  className="hidden md:block"
                  alt="Screenshots of the dashboard project showing desktop version"
                />
          </div>
        </div>
      </main>
    );
  }