import prisma from "../lib/prismadb";

export default async function getMoviesBySearch(searchQuery){
    try {
        const moviesBySearch = await prisma.movie.findMany({
            where: {
                OR: [
                    { title: { contains: searchQuery } },
                    { description: { contains: searchQuery } }
                ]
            }
        });
        return moviesBySearch || [];
    } catch (e) {
        throw new Error(e);
    }
}
