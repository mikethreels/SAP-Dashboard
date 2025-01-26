import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions, Session, User as NextAuthUser } from "next-auth";
import { JWT } from "next-auth/jwt";

// Extend NextAuthUser to include region and portfolio
interface User extends NextAuthUser {
  region: string;
  portfolio: string;
}

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Mock user data with region and portfolio
        const users: Record<string, User> = {
          admin: { id: "1", name: "Admin TestName", email: "admin@example.com", role: "admin", region: "", portfolio: "" },
          sales: { id: "2", name: "Sales TestName", email: "sales@example.com", role: "sales", region: "North", portfolio: "" },
          collector: { id: "3", name: "Collector TestName", email: "collector@example.com", role: "collector", region: "", portfolio: "PortfolioA" },
          manager: { id: "4", name: "Manager TestName", email: "manager@example.com", role: "manager", region: "", portfolio: "" },
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
        token.region = user.region; // Add region to JWT
        token.portfolio = user.portfolio; // Add portfolio to JWT
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        session.user = {
          ...session.user,
          id: token.id as string,
          role: token.role as string,
          region: token.region as string, // Add region to session
          portfolio: token.portfolio as string, // Add portfolio to session
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