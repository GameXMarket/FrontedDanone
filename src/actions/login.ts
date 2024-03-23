'use server'

import { signIn } from "@/auth";
import { loginSchema } from "@/requests/auth/schemas";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginType } from "@/types/UserType";
import { isRedirectError } from "next/dist/client/components/redirect";
import * as z from "zod";

export const login = async (values: z.infer<typeof loginSchema>, callbackUrl: string | null) => {
    const { email, password } = values

    try{
        await signIn("credentials", {
            email,
            password,
            redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
        })

        
    }
    catch(err: any){
        if (isRedirectError(err)) {
            throw err;
        }
        if(err?.cause?.err?.response.data.detail){
            throw new Error(err?.cause?.err?.response.data.detail)
        }
        throw new Error("Что-то пошло не так")
    }
}

export const verifyLogin = async (values: LoginType) => {
    const {access, refresh} = values

    await signIn("verify", {
        access,
        refresh,
        redirectTo: "/home"
    })
}
