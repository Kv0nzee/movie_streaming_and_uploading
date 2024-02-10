import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { toast } from 'react-hot-toast';

import { User } from '@prisma/client';

interface IUseFavorite{
    movieId: string;
    currentUser?: User | null;
}

const useFavorite = ({
    movieId,
    currentUser
} : IUseFavorite) => {
    const router = useRouter();

    const hasFavorited = useMemo(() => {
        const list = currentUser?.favoriteIds || [];
        
        return list.includes(movieId);
    }, [ currentUser, movieId]);

    const toggleFavorite = useCallback(async (
        e:React.MouseEvent<HTMLDivElement>
    ) => {
        e.stopPropagation();

        try{
            let request;

            if(hasFavorited){
                request = () => axios.delete(`/api/favorites/${movieId}`);
            } else{
                request = ()=>axios.post(`/api/favorites/${movieId}`);
            }

            await request();
            router.refresh();
            if(hasFavorited){
                toast.error('Remove Favorite',{
                    position: "bottom-center"
                  });
            } else{
                toast.success('Add to Favorite');
            }
        }catch(error){
            toast.error("Something went wrong.",{
                position: "bottom-center"
              });
        }
        
    }, [ hasFavorited, movieId, router ])

    return {
        hasFavorited,
        toggleFavorite
    }
}

export default useFavorite;