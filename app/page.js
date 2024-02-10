import getAllMovies from './actions/getAllMovies'
import getBillboard from './actions/getBillboard';
import getCurrentUser from './actions/getCurrentUser';
import getFavoritesMovies from './actions/getFavoritesMovies';

import Billboard from './components/Billboard';
import MovieList from './components/MovieList';

import useInfoModalStore from './hooks/useInfoModalStore';

export default async function Home() {
  const currentUser = await getCurrentUser();
  const billboard = await  getBillboard();
  const moviesData = await getAllMovies();
  const myListData = await getFavoritesMovies();

  console.log(moviesData);
  return (
    <main className="flex flex-col items-center justify-between min-h-screen">
      <Billboard data={billboard}/>
      <div className="pb-40">
        <MovieList title="Trending Now" data={moviesData} currentUser={currentUser} />
        <MovieList title="My List" data={myListData} />
      </div>
    </main>
  );
}
