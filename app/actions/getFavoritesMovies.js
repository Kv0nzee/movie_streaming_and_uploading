import prisma from "../lib/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getFavoritesMovies(){
    try {
        const currentUser = await getCurrentUser();

        const favoritesMovies = await prisma.movies.findMany({
            where:{
                id:{
                    in: currentUser?.favoriteIds
                }
            }
        });
        
      return favoritesMovies;
    } catch (e) {
      console.error(e);
      throw new Error("Error fetching billboard data");
    }
}