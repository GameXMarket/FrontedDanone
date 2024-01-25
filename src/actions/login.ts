'use server'

import { signIn } from "@/auth";
import { loginSchema } from "@/requests/auth/schemas";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import * as z from "zod";

export const login = async (values: z.infer<typeof loginSchema>, callbackUrl: string | null) => {
    const { email, password } = values

    await signIn("credentials", {
        email,
        password,
        redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    })
}
