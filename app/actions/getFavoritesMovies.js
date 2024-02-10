import prisma from "../lib/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getFavoritesMovies(){
    try {
        const currentUser = await getCurrentUser();

        const favoritedMovies = await prisma.movie.findMany({
            where: {
              id: {
                in: currentUser?.favoriteIds,
              }
            }
        });
        
      return favoritedMovies;
    } catch (e) {
      console.error(e);
      throw new Error("Error fetching  data");
    }
}