import getAllMovies from './actions/getAllMovies'
import getBillboard from './actions/getBillboard';

import Billboard from './components/Billboard';
import MovieList from './components/MovieList';

import useInfoModalStore from './hooks/useInfoModalStore';

export default async function Home() {
  const billboard = await  getBillboard();
  const moviesData = await getAllMovies();
  console.log(moviesData);
  return (
    <main className="flex flex-col items-center justify-between min-h-screen">
      <Billboard data={billboard}/>
      <div className="pb-40">
        <MovieList title="Trending Now" data={moviesData} />
        {/* <MovieList title="My List" data={favorites} /> */}
      </div>
    </main>
  );
}
