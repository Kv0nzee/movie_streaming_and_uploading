import { NextResponse } from "next/server";

import prisma from "../../../lib/prismadb";

interface IParams{
    movieId?: string;
}

export async function GET(
    request: Request,
    { params } : {params:IParams}
){
    try {
    const  movieId  = params.movieId;
    if (typeof movieId !== 'string') {
      throw new Error('Invalid Id');
    }

    if (!movieId) {
      throw new Error('Missing Id');
    }

    const movie = await prisma.movie.findUnique({
      where: {
        id: movieId
      }
    });

    return NextResponse.json(movie);

  } catch (error) {
    console.log(error);
  }
}
