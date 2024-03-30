import type { NextAuthConfig, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { cookies } from "next/headers";

import { loginSchema } from "@/requests/auth/schemas";
import axios from "axios";


export default {
    providers: [
        Credentials({
            async authorize(credentials) {
                const validatedFields = loginSchema.safeParse(credentials);
                if (validatedFields.success) {
                    const { email, password } = validatedFields.data;

                    const res = await axios.post("https://test.yunikeil.ru/auth/login", { email, password });
                    if (res) {
                        const cookieStore = cookies()
                        cookieStore.set("refresh", res.data.refresh)
                    }

                    if (res.status === 200) {
                        const user = res.data
                        return user;
                    }
                    else {
                        //@ts-ignore
                        return null;
                    }
                }

                return null;
            }
        }),
        Credentials({
            id: "verify",
            async authorize(credentials) {
                const {access, refresh} = credentials
                const cookieStore = cookies()
                cookieStore.set("refresh", refresh as string)
                return {access} as User
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    trustHost: true
} satisfies NextAuthConfig