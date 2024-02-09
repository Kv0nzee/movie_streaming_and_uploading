import prisma from "../lib/prismadb";

export default async function getBillboard() {
  try {
    const moviesCount = await prisma.movie.count();
    const randomIndex = Math.floor(Math.random() * moviesCount);

    const randomMovies = await prisma.movie.findMany({
      take: 1,
      skip: randomIndex
    });

    return randomMovies[0];
  } catch (e) {
    console.error(e);
    throw new Error("Error fetching billboard data");
  }
}
