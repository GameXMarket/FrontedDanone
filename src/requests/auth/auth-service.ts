import { createSafeFetch } from "@/lib/create-safe-fetch";
import instance from "..";
import { RegisterDto, LoginDto, registerShema, loginSchema } from "./schemas";
import { signIn } from "next-auth/react";
import { error } from "console";

export const AuthApiService = {

    async register(data: RegisterDto) {
        return instance.post("users/me", { ...data })
            .then(res => res.data)
    },

    async login(data: LoginDto) {
        return instance.post("auth/login", { ...data })
            .then(res => res.data)
    },
    async verifyUser(token: string) {
        return instance.get("auth/verify-user", {params: {token}})
        .then(res => res.data)
    }
}

export const safeRegister = createSafeFetch(registerShema, AuthApiService.register)
export const safeLogin = createSafeFetch(loginSchema, AuthApiService.login)