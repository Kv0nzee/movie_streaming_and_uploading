import prisma from "../lib/prismadb";

export default async function getAllMovies(){
    try {
      const movies = prisma.movie.findMany();

      return movies;
    } catch (e) {
      console.error(e);
      throw new Error("Error fetching billboard data");
    }
}