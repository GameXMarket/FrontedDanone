import instance from "@/requests";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text"},
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const res = await instance.post("auth/login", {email, password});

        if (res.status === 200) {
            const user = res.data
            return user;
        } 
        else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user){
        token = user as unknown as { [key: string]: any };
      } 
            
      return token;
    },
    session: async ({ session, token }) => {
      session.user = { ...token }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt"
  }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };