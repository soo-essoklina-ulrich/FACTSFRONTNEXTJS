// src/types/next-auth.d.ts
import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    bearer?: string;
    refresh?: string;
    error?: string;
    user?: {
      id?: string;
      email?: string;
      name?: string;
      nom?: string;
      prenom?: string;
      numero?: string;
      role?: string;
    };
  }
}
