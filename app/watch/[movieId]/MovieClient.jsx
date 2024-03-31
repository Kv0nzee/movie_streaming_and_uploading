'use client';

import { ArrowLeftIcon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

const MovieClient = ({ data }) => {
    const router = useRouter();

    const videoRef = useRef(null);

    const handleBackward = () => {
        if (videoRef.current) {
            videoRef.current.currentTime -= 15;
        }
    };

    const handleForward = () => {
        if (videoRef.current) {
            videoRef.current.currentTime += 15;
        }
    };

    return (
        <div className="z-50 w-screen h-screen bg-black">
            <nav className="fixed z-10 flex flex-row items-center w-full gap-8 px-4 mt-20 ">
                <ArrowLeftIcon onClick={() => router.push('/')} className="w-2 text-white transition cursor-pointer md:w-8 hover:opacity-80" />
                <p className="text-lg font-bold text-white md:text-xl">
                    <span className="font-light">Watching:</span> {data?.title}
                </p>
            </nav>
            <div className="relative">
                <video ref={videoRef} className="w-full h-full" poster={data?.thumbnailUrl} controls src={data?.videoUrl}></video>
                <div className="absolute flex justify-center mb-4 space-x-4 bottom-5 left-36">
                    <button onClick={handleBackward} className="text-white">
                        <ChevronDoubleLeftIcon className="w-6" />
                    </button>
                    <button onClick={handleForward} className="text-white">
                        <ChevronDoubleRightIcon className="w-6" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MovieClient;
