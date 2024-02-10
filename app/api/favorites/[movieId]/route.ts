import { NextResponse } from "next/server";

import getCurrentUser from "../../../actions/getCurrentUser";
import prisma from "../../../lib/prismadb";

interface IParams{
    movieId?: string;
}

export async function POST(
    request: Request,
    { params } : {params:IParams}
){

    const currentUser = await getCurrentUser();

    if(!currentUser){
        return NextResponse.error();
    }

    const { movieId } = params;

    if(!movieId || typeof movieId !== 'string'){
        throw new Error("Invalid ID");
    }

    let favoriteIds = [...(currentUser.favoriteIds || [])];

    favoriteIds.push(movieId);

    const user = await prisma.user.update({
        where:{
            id: currentUser.id
        },
        data: {
            favoriteIds
        }
    });

    return NextResponse.json(user);
}

export async function DELETE(
    request: Request,
    { params } : { params: IParams}
){
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return NextResponse.error();
    }

    const { movieId } = params;
    
    if(!movieId || typeof movieId !== 'string'){
        throw new Error("Invalid ID");
    }

    let favoriteIds = [...(currentUser.favoriteIds || [])];

    favoriteIds = favoriteIds.filter((id) => id !== movieId);

    const user = await prisma.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            favoriteIds
        }
    });

    return NextResponse.json(user);
}