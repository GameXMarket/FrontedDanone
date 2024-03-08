'use server'

import { signIn } from "@/auth";
import { loginSchema } from "@/requests/auth/schemas";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { isRedirectError } from "next/dist/client/components/redirect";
import * as z from "zod";

export const login = async (values: z.infer<typeof loginSchema>, callbackUrl: string | null) => {
    const { email, password } = values

    try{
        await console.log(email, password)
        await signIn("credentials", {
            email,
            password,
            redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
        }).then(response => console.log(response))

        
    }
    catch(err: any){
        if (isRedirectError(err)) {
            throw err;
        }
        if(err?.cause?.err?.response?.status === 401){
            throw new Error("Сначала подтвердите почту")
        }
        if(err?.cause?.err?.response?.status === 422) {
            console.log(err)
        }
    }
}
