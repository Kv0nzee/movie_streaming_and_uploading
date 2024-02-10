import getAllMovies from './actions/getAllMovies'
import getBillboard from './actions/getBillboard';
import getCurrentUser from './actions/getCurrentUser';
import getFavoritesMovies from './actions/getFavoritesMovies';

import Billboard from './components/Billboard';
import MovieList from './components/MovieList';
import ClientOnly from "./components/ClientOnly"

export default async function Home() {
  const currentUser = await getCurrentUser();
  const billboard = await  getBillboard();
  const moviesData = await getAllMovies();
  const myListData = await getFavoritesMovies();


  return (
    <main className="flex flex-col items-center justify-between min-h-screen">
      <ClientOnly>
        <Billboard data={billboard}/>
        <div className="pb-40">
          <MovieList title="Trending Now" data={moviesData} currentUser={currentUser} />
          <MovieList title="My List" data={myListData} />
        </div>
      </ClientOnly>
    </main>
  );
}
