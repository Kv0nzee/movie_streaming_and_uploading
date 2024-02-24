import getMoviesBySearch from '../actions/getMoviesBySearch'; 
import getCurrentUser from '../actions/getCurrentUser';

import SearchClient from './SearchClient';
import MovieList from '../components/MovieList';
import { redirect } from 'next/navigation';

interface Props{
    searchParams: {
        search: string
    }
};

const Search = async ({ searchParams } : Props) => {
    const searchMoviesList = await getMoviesBySearch(searchParams.search); 
    const currentUser = await getCurrentUser();

     //route-guard
  if(!currentUser){
    return redirect('/auth');
  }  

    return ( 
        <div className="flex flex-col items-center justify-center w-full pb-40">
          <div className='w-full px-4 md:px-16'>
            <SearchClient/>
          </div>
          {
            searchMoviesList.length >= 1 ? (
                <MovieList title={searchParams.search !== "" ? `Search Ressult: for `+searchParams.search : "Trending Now"} data={searchMoviesList} currentUser={currentUser} />
            ) : (
                <h2 className='flex items-center justify-center min-h-[40vh] font-extrabold text-xl text-white'> Search Result Not Found</h2>
            )
          }
        </div>
        
     );
}
 
export default Search;