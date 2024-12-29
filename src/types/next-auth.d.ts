
import NextAuth from "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
      image?: string | null;
    } & DefaultSession["user"]; 
  }

  interface User {
    id: string;
    role: string;
  }
}
