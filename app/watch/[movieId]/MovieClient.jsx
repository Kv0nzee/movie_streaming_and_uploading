'use client';

import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

const MovieClient = ({ data }) => {
    const router = useRouter();
    return ( 
        <div className="z-50 w-screen h-screen bg-black">
            <nav className="fixed z-10 flex flex-row items-center w-full gap-8 px-4 mt-20 ">
                <ArrowLeftIcon onClick={() => router.push('/')} className="w-2 text-white transition cursor-pointer md:w-8 hover:opacity-80" />
                <p className="text-lg font-bold text-white md:text-xl">
                <span className="font-light">Watching:</span> {data?.title}
                </p>
            </nav>
            <video className="w-full h-full" autoPlay controls src={data?.videoUrl}></video>
        </div>
     );
}
 
export default MovieClient;