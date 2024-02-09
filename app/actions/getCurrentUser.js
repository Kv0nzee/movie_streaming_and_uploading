import { getServerSession } from "next-auth";

import prisma from "../lib/prismadb";
import { AuthOptions } from "../../pages/api/auth/[...nextauth]";

const serverAuth = async () => {
    const session = await getServerSession(AuthOptions);
  
    if (!session?.user?.email) {
      return "";
    }
  
    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      }
    });
    
    if (!currentUser) {
      throw new Error('Not signed in');
    }
  
    return currentUser;
  }
  
  export default serverAuth;