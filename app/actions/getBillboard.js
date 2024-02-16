import prisma from "../lib/prismadb";

export default async function getBillboard() {
  try {
    const moviesCount = await prisma.movie.count();

    // Generating a random index within the range of available movies
    const randomIndex = Math.floor(Math.random() * moviesCount);

    // Fetching a movie from the database based on the random index
    const randomMovies = await prisma.movie.findMany({
      take: 1, // Only fetching one movie
      skip: randomIndex // Skipping to the randomly generated index
    });

    // Returning the randomly selected movie
    return randomMovies[0];
  } catch (e) {
    console.error(e);
    throw new Error("Error fetching billboard data");
  }
}