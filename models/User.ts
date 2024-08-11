import { PrismaClient, User } from "@prisma/client";
const prisma = new PrismaClient();

export async function isExist(email: string){
    const existingUser: User | null = await prisma.user.findUnique({
        where: { email },
    });
    return existingUser
}

export const getByEmail = async (email: string) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
        select: {
          email: true,
          password: true,
        },
      });
      
      return user;
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }    
  };