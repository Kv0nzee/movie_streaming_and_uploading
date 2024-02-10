'use client';

import MovieCard from './MovieCard';
import { isEmpty } from 'lodash';

const MovieList = ({ data, title, currentUser }) => {
  if (isEmpty(data)) {
    return null;
  }

  return (
    <div className="px-4 mt-4 space-y-8 md:px-12">
      <div>
        <p className="mb-4 font-semibold text-white text-md md:text-xl lg:text-2xl">{title}</p>
        <div className="grid grid-cols-4 gap-2">
          {data.map((movie) => (
            <MovieCard key={movie.id} data={movie} currentUser={currentUser} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MovieList;