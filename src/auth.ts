import NextAuth from "next-auth"
import { UserType } from "@/types/UserType";

import authConfig from "@/auth.config";
import axios from "axios";
import { cookies } from "next/headers";


const refreshToken = async () => {
  const cookieStore = cookies()

    const response = await axios.post("https://test.yunikeil.ru/auth/refresh", null, {
        headers: {
            Cookie: `refresh=${cookieStore.get("refresh")?.value}`
        }
    })

    if (response.status === 200) {
        const user = response.data
        cookieStore.set("refresh", response.data.refresh)
        return user;
    }
    else {
        cookieStore.delete("refresh")
        await signOut({ redirectTo: "/login" })
        return null
    }
}


export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  unstable_update,
} = NextAuth({
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, account }) {
      return true;
    },
    //@ts-ignore //only for vercel
    async session({ token, session }) {
      if (token.id && session.user) {
        //@ts-ignore
        session.user.id = token.id as number;
      }

      if (Number.isInteger(token.roleId) && session.user) {
        session.user.roleId = token.roleId as number;
      }

      if (session.user) {
        session.user.username = token.username as string;
        session.user.email = token.email as string;
        session.user.accessToken = token.accessToken as string
      }

      return session;
    },
    async jwt({ token, user, trigger, session }) {
      if(trigger === "update" && session?.name){
        token.username = session.name
      }
      if (token.accessToken) {
        //@ts-ignore
        const expires_in = JSON.parse(atob(token.accessToken.split(".")[1])).exp

        if (Date.now() > expires_in * 1000) {
          user = await refreshToken()
        }

      }
      if (!user) return token;

      const existingUser = await axios.get<UserType>("https://test.yunikeil.ru/users/me", {
        headers: {
          "Authorization": `Bearer ${user.access}`
        }
      });

      if (existingUser?.status !== 200) return token;

      token.email = existingUser.data.email;
      token.id = existingUser.data.id;
      token.username = existingUser.data.username;
      token.roleId = existingUser.data.role_id;
      token.accessToken = user.access;
      token.img = existingUser.data.files[0]

      return token;
    }
  },
  session: { strategy: "jwt" },
  ...authConfig,
});