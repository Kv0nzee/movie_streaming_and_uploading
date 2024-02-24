import getCurrentUser from '../actions/getCurrentUser';

import UploadClient from './UploadClient';
import { redirect } from 'next/navigation';

const Search = async () => {
    const currentUser = await getCurrentUser();

     //route-guard
  if(!currentUser){
    return redirect('/auth');
  }  

    return ( 
        <div className="flex flex-col items-center justify-center w-full px-4 pt-20 pb-40 md:px-16">
          <h1 className='w-full text-xl font-bold text-gray-200 '>Upload Video</h1>
          <UploadClient/>
        </div>
        
     );
}
 
export default Search;