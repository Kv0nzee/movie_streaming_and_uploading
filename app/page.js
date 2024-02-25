import getAllMovies from './actions/getAllMovies'
import getBillboard from './actions/getBillboard';
import getCurrentUser from './actions/getCurrentUser';
import getFavoritesMovies from './actions/getFavoritesMovies';
import getMovieByGenre from './actions/getMovieByGenre';

import Billboard from './components/Billboard';
import MovieList from './components/MovieList';
import ClientOnly from "./components/ClientOnly"
import { redirect } from 'next/navigation';

export default async function Home() {
  const currentUser = await getCurrentUser();
  const billboard = await getBillboard();
  const moviesData = await getAllMovies();
  const myListData = await getFavoritesMovies();
  const comedyMovies = await getMovieByGenre("Comedy");
  const adventureMovies = await getMovieByGenre("Adventure");
  const actionMovies = await getMovieByGenre("Action");
  const scifiMovies = await getMovieByGenre("Sci-Fi");
  const thrillerMovies = await getMovieByGenre("Thriller");

// Create a Set to automatically remove duplicates
const uniqueGenres = Array.from(new Set(moviesData.map(movie => movie.genre)));

  //route-guard
  if(!currentUser){
    return redirect('/auth');
  }  

  return (
    <main className="flex flex-col items-center justify-between min-h-screen">
      <ClientOnly currentUser={currentUser}>
        <Billboard data={billboard}/>
        <div className="pb-40">
          <MovieList title="Trending Now" data={moviesData} currentUser={currentUser} />
          <MovieList title="My List" data={myListData} currentUser={currentUser} />
          {uniqueGenres.map( async(genre, index) => (
            <MovieList key={index} title={genre} data={await getMovieByGenre(genre)} currentUser={currentUser} />
          ))}
        </div>
      </ClientOnly>
    </main>
  );
}