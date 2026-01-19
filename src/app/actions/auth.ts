// TODO: Auth server actions - commented out
// Uncomment when next-auth is ready

// 'use server';
//
// import { signIn, signOut } from '@/auth';
//
// export async function logout() {
//   await signOut({ redirectTo: '/login' });
// }
//
// export async function loginDiscord() {
//   await signIn('discord', { redirectTo: '/' });
// }
//
// export async function loginGitHub() {
//   await signIn('github', { redirectTo: '/' });
// }

// Placeholder exports
export async function logout() {}
export async function loginDiscord() {}
export async function loginGitHub() {}
