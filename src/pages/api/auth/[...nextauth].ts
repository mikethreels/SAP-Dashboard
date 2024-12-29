import CredentialsProvider from "next-auth/providers/credentials";
import {JWT} from "next-auth/jwt"

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Define the user object type
        interface User {
          id: string;
          name: string;
          email: string;
          role: string;
        }

        // Define the type for the users object (indexable by string)
        const users: { [key: string]: User } = {
          admin: {
            id: "1",
            name: "Admin User",
            email: "admin@example.com",
            role: "admin", // Admin role
          },
          sales: {
            id: "2",
            name: "Sales User",
            email: "sales@example.com",
            role: "sales", // Sales role
          },
          collector: {
            id: "3",
            name: "Collector User",
            email: "collector@example.com",
            role: "collector", // Collector role
          },
          manager: {
            id: "4",
            name: "Manager User",
            email: "manager@example.com",
            role: "manager", // Manager role
          },
        };

        // Basic validation for username and password
        if (credentials?.username && credentials?.password) {
          // Use username to look up the mock user
          const mockUser = users[credentials.username.toLowerCase()];

          // Validate the mock user (e.g., admin = "admin", sales = "sales", etc.)
          if (mockUser && credentials.password === "password") {
            return mockUser; // Return the user if valid
          }
        }

        // Return null if invalid credentials
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        token.id = user.id;
        token.role = user.role; // Add the user's role to the token
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role; // Add the user's role to the session
      }
      return session;
    },
  },
  pages: {
    signIn: "/login", // Redirect to the custom login page
  },
};

export default authOptions;
