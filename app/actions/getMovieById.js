import prisma from "../lib/prismadb";

export default async function getMovieById( movieId ){
    try {
      const movie = prisma.movie.findUnique({
        where:{
            id: movieId
        }
      });
      
      return movie;
    } catch (e) {
      console.error(e);
      throw new Error("Error fetching movie data");
    }
}