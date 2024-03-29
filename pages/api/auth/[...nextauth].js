import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { compare } from 'bcrypt';
import prisma from '../../../app/lib/prismadb';

export const AuthOptions = {
    providers: [
        // GitHub authentication provider
        GithubProvider({
          clientId: process.env.GITHUB_ID || '',
          clientSecret: process.env.GITHUB_SECRET || '',
        }),
        // Google authentication provider
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID || '',
          clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        }),
        // Credentials-based authentication provider
        Credentials({
          id: 'credentials',
          name: 'Credentials',
          credentials: {
            email: {
              label: 'Email',
              type: 'text',
            },
            password: {
              label: 'Password',
              type: 'password'
            }
          },
           // Authorization function for credentials-based authentication
          async authorize(credentials) {
            if (!credentials?.email || !credentials?.password) {
              throw new Error('Email and password required');
            }
    
            const user = await prisma.user.findUnique({ where: {
              email: credentials.email
            }});
    
            if (!user || !user.hashedPassword) {
              throw new Error('Email does not exist');
            }
    
            const isCorrectPassword = await compare(credentials.password, user.hashedPassword);
    
            if (!isCorrectPassword) {
              throw new Error('Incorrect password');
            }
    
            return user;
          }
        })
      ],
      pages: {
        signIn: '/auth'
      },
      debug: process.env.NODE_ENV === 'development',
      adapter: PrismaAdapter(prisma),
      session: { strategy: 'jwt' },
      jwt: {
        secret: process.env.NEXTAUTH_JWT_SECRET,
      },
      secret: process.env.NEXTAUTH_SECRET
    };
    
    export default NextAuth(AuthOptions);