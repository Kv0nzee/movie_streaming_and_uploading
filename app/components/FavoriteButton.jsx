'use client';

import { PlusIcon, CheckIcon } from '@heroicons/react/24/outline';

import useFavorite from "../hooks/useFavorite";



const FavoriteButton =  ({ movieId, currentUser }) => {

  const { hasFavorited, toggleFavorite } = useFavorite({
    movieId,
    currentUser
  });
  
  const Icon = hasFavorited ? CheckIcon : PlusIcon;

  return (
    <div onClick={toggleFavorite} className="flex items-center justify-center w-6 h-6 transition border-2 border-white rounded-full cursor-pointer group/item lg:w-10 lg:h-10 hover:border-neutral-300">
      <Icon className="w-4 text-white group-hover/item:text-neutral-300 lg:w-6" />
    </div>
  )
}

export default FavoriteButton;