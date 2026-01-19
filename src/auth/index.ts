// TODO: next-auth configuration commented out
// Uncomment and configure when ready to implement authentication

// import { prisma } from '@/lib/prisma';
// import { PrismaAdapter } from '@auth/prisma-adapter';
// import NextAuth from 'next-auth';
// import Discord from 'next-auth/providers/discord';
//
// export const { auth, handlers, signIn, signOut } = NextAuth({
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     Discord({
//       clientId: process.env.DISCORD_CLIENT_ID!,
//       clientSecret: process.env.DISCORD_CLIENT_SECRET!,
//     }),
//   ],
//   session: {
//     strategy: 'jwt',
//   },
//   callbacks: {
//     async session({ session, token }) {
//       if (token.sub) {
//         session.user.id = token.sub;
//       }
//       return session;
//     },
//     async jwt({ token, user }) {
//       if (user) {
//         token.sub = user.id;
//       }
//       return token;
//     },
//   },
// });

// Placeholder exports for now
export const auth = async () => null;
export const handlers = { GET: () => {}, POST: () => {} };
export const signIn = async () => {};
export const signOut = async () => {};
