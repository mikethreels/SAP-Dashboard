
import NextAuth from "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      region: string;
      portfolio: string;
      email: string;
      name: string;
      image?: string | null;
    };
  }

  interface User {
    id: string;
    role: string;
    region: string;
    portfolio: string;
    name: string;
    email: string;
    image?: string | null;
  }
}
