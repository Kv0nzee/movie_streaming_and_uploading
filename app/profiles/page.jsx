import getCurrentUser from "../actions/getCurrentUser";
import UserCard from '../components/UserCard'



const App = async  () => {
  const currentUser = await getCurrentUser();

  if(!currentUser){
    return Router.push('/auth');
  }


  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex flex-col">
        <h1 className="text-3xl text-center text-white md:text-6xl">Who&#39;s watching?</h1>
        <div className="flex items-center justify-center gap-8 mt-10">
          <UserCard name={currentUser?.name} image={currentUser?.image} />
        </div>
      </div>
    </div>
  );
}

export default App;