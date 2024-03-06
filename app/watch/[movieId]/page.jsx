import { redirect } from "next/navigation";
import getCurrentUser from "../../actions/getCurrentUser";
import getMovieById from '../../actions/getMovieById';

import MovieClient from './MovieClient';

const Watch = async ({params}) => {
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return redirect('/auth');
    }  
  const data  = await getMovieById(params.movieId);
  return (
    <MovieClient data={data} />
  )
}

export default Watch;