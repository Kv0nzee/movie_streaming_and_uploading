'use client';

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";

const VideoUpload = ({setVideoUrl, value}) => {
    const handleUpload = useCallback((result) => {
        setVideoUrl(result.info.secure_url);
        console.log(result.info.secure_url);
    }, [setVideoUrl]);
    return ( 
        <CldUploadWidget
        
            onUpload={handleUpload}
            uploadPreset="my5qwo0c"
            options={{
                maxFiles: 1
            }}
        >
            {({open}) => {
                return (
                    <div
                        onClick={() => open?.()}
                        className="relative flex flex-col items-center justify-center gap-4 p-20 transition border-2 border-dashed cursor-pointer hover:opacity-70 border-neutral-300 text-neutral-600"
                    >
                        <div className="text-lg font-semibold">
                            Click to upload
                        </div>
                        {value && (
                            <div
                                className="absolute inset-0 w-full h-full"
                            >
                                <video
                                    alt="upload"
                                    fill
                                    className="object-cover w-full h-full "
                                    src={value}
                                />
                            </div>
                        )}
                    </div>
                )
            }}
        </CldUploadWidget>


     );
}
 
export default VideoUpload;