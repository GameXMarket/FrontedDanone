import instance from "@/requests";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import VkProvider from "next-auth/providers/vk";
import { cookies } from "next/headers";


async function refreshAccessToken() {
  const cookieStore = cookies()
  try{
    const response = await instance.post("auth/refresh", null ,{
      headers:{
        Cookie: `refresh=${cookieStore.get("refresh")?.value}`
      } 
    })

    if (response.status === 200) {
      const user = response.data
      cookieStore.set("refresh", response.data.refresh)
      return user;
    }
    else{
      cookieStore.delete("refresh")
      return {
        token: cookieStore.get("refresh"),
        error: "Refresh Error"
      }
    }
  }
  catch(error){
    cookieStore.delete("refresh")
    return {
      token: cookieStore.get("refresh"),
      error: "Refresh Error"
    }
  }
}


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

        if(res){
          const cookieStore = cookies()
          cookieStore.set("refresh", res.data.refresh)
        }

        if (res.status === 200) {
            const user = res.data
            return user;
        } 
        else {
          return null;
        }
      },
    }),
    // VkProvider({
    //   clientId: "Skj2aqGyXSRUcvE3sGtS",
    //   clientSecret: "362c6fa8362c6fa8362c6fa8e0353ad2103362c362c6fa853a77d39deb32be4b0b4c22a"
    // })
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user){
        token = user as any as {[key: string]: string};
      } 

      if(token.access){
        //@ts-ignore
        const expires_in = JSON.parse(atob(token?.access?.split(".")[1])).exp

        if(Date.now() < expires_in*1000){
          return token;
        }  
      }

      return refreshAccessToken()

    },
    session: async ({ session, token }) => {
      if(token.error){
        throw token.error
      }
      session.user = { ...token }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt"
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST };