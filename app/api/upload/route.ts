import prisma from "../../lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(
    request: Request
){
    const body = await request.json();
    const {
      title, description, videoUrl, thumbnailUrl, genre, duration
    } = body;

    const user = await prisma.movie.create({
      data:{
        title, description, videoUrl, thumbnailUrl, genre, duration
      }
  });

    return NextResponse.json(body);
    
}