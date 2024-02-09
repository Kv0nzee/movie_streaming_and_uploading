'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

const images = [
    '/images/default-blue.png',
    '/images/default-red.png',
    '/images/default-slate.png',
    '/images/default-green.png'
  ]
  
const UserCard = ({ name, image }) => {
    const router = useRouter();
    const imgSrc = image? image : images[Math.floor(Math.random() * 4)];
  
    const selectProfile = useCallback(() => {
      router.push('/');
    }, [router]);
    
    return (
      <div onClick={() => selectProfile()}>     
        <div className="flex-row mx-auto group w-44">
            <div className="flex items-center justify-center overflow-hidden border-2 border-transparent rounded-md w-44 h-44 group-hover:cursor-pointer group-hover:border-white">
              <Image draggable={false} className="object-contain bg-cover w-max h-max" src={imgSrc} alt="logo" width={176} height={176} />
            </div>
          <div className="mt-4 text-2xl text-center text-gray-400 group-hover:text-white">{name}</div>
        </div>
      </div>
    );
  }
  export default  UserCard;