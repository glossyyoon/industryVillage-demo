import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import '@/app/ui/global.css'

const WebcamComponent = dynamic(() => import('./ui/components/webcam'), {
  ssr: false
});

export default function Page() {
  return (
    <main >
      <div className="relative w-full h-screen flex justify-center">
        <div className=""><WebcamComponent /></div>
          <div className="absolute z-1 mt-[10vh] p-4">
            <Link 
                href= "/construction">
                <Image src="/construction.png"
                  width={200}
                  height={100}
                  className="hidden md:block"
                  alt="Screenshots of the dashboard project showing desktop version"
                />
            </Link>
          </div>
          <div className="absolute z-2 mt-[25vh] p-4">
            <Link 
              href= "/welding">
              <Image src="/용접.png"
                width={200}
                height={100}
                className="hidden md:block"
                alt="Screenshots of the dashboard project showing desktop version"
              />
            </Link>
          </div>
          <div className="absolute z-3 mt-[40vh] p-4">
            <Link 
            href= "/assemble">
                <Image src="/조립라인.png"
                  width={200}
                  height={100}
                  className="hidden md:block"
                  alt="Screenshots of the dashboard project showing desktop version"
                />
            </Link>
          </div>
        </div>
    </main>
  );
}
