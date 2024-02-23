import prisma from "../lib/prismadb";

export default async function getMovieByGenre(movieGenre){
    try{
        const moviesByGenre = await prisma.movie.findMany({
            where:{
                genre: movieGenre
            }
        });

        return moviesByGenre;

    }catch(e){
        console.error(e);
        throw new Error("Error fetching  data");
    }
}