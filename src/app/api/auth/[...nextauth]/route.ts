// TODO: next-auth route commented out
// Uncomment when auth is ready

// import { handlers } from '@/auth';
//
// export const { GET, POST } = handlers;
//
// // Ensure Node.js runtime for Prisma adapter compatibility
// export const runtime = 'nodejs';

// Placeholder to prevent 404
export const GET = () => new Response('Auth disabled', { status: 503 });
export const POST = () => new Response('Auth disabled', { status: 503 });
export const runtime = 'nodejs';
