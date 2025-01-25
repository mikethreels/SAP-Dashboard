import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        type User = {
          id: string;
          name: string;
          email: string;
          role: string;
        };

        const users: Record<string, User> = {
          admin: { id: "1", name: "Admin TestName", email: "admin@example.com", role: "admin" },
          sales: { id: "2", name: "Sales TestName", email: "sales@example.com", role: "sales" },
          collector: { id: "3", name: "Collector TestName", email: "collector@example.com", role: "collector" },
          manager: { id: "4", name: "Manager TestName", email: "manager@example.com", role: "manager" },
        };

        if (credentials?.username && credentials?.password) {
          const user = users[credentials.username.toLowerCase()];
          if (user && credentials.password === "password") {
            return user;
          }
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        session.user = {
          ...session.user,
          id: token.id as string,
          role: token.role as string,
        };
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export default authOptions;