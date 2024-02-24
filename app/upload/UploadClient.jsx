'use client';

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import qs from "query-string";

import Input from "../components/Input";
import Select from "../components/Select";
import axios from "axios";

const UploadClient = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const [thumbnailUrl, setThumbnailUrl] = useState("");
    const [genre, setGenre] = useState("");
    const [duration, setDuration] = useState("");
    const [error, setError] = useState("");
    const [disabled, setDisabled] = useState(false);

    const genreOptions = [
        { value: 'Adventure', label: 'Adventure' },
        { value: 'Comedy', label: 'Comedy' },
        { value: 'Action', label: 'Action' },
        { value: 'Sci-Fi', label: 'Sci-Fi'}
    ];

    const router = useRouter();
    
    const uploadVideo =useCallback(() => {
        if(!title && !description && !videoUrl && !thumbnailUrl && !genre && !duration){
            setError("Please fill in all required fields before submitting the form.");
        }else{
            setError("");
            setDisabled(true);
            axios.post('/api/upload', {title, description, videoUrl, thumbnailUrl, genre, duration})
            .then(() => {
                
            })
            .catch((error) => {
                setError("Error Uplaoding Data.");
                setDisabled(false);
            }).finally(() => {
                router.refresh();
                setDisabled(false);
                router.push('/');
            })
            
        }
    }, [title, description, videoUrl, thumbnailUrl, genre, duration, router]);

    return ( 
        <div className="flex flex-col w-full pt-10 gap-y-5">
            <Input
                id="title"
                type="text"
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={disabled}
            />
             <Input
                id="description"
                type="text"
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={disabled}
            />
             <Input
                id="videoUrl"
                type="text"
                label="Video Url"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                disabled={disabled}
            />
             <Input
                id="thumbnailUrl"
                type="text"
                label="Thumbnail Url"
                value={thumbnailUrl}
                onChange={(e) => setThumbnailUrl(e.target.value)}
                disabled={disabled}
            />
             <Select
                id="genre"
                label="Genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                options={genreOptions}
                disabled={disabled}
            />
            <Input
                id="duration"
                type="text"
                label="Duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                disabled={disabled}
            />
               <h1 className={`${error ? "opacity-100 " : "opacity-0 "} w-full text-xl font-bold text-red-700 transition-all`}>{error}</h1>
            <button
                onClick={uploadVideo}
                disabled={disabled}
                className={`${disabled ? "cursor-not-allowed" : ""}  w-full py-3 mt-2 text-lg font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600`}
                >
                Submit
            </button>
        </div>
     );
}
 
export default UploadClient;