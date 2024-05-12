'use server'

import { signOut } from "@/auth"
import { cookies } from "next/headers"

export const logout = async (redirectUrl?: string) => {
    const cookieStore = cookies()
    cookieStore.delete("refresh")
    await signOut({redirectTo: redirectUrl || "/home"})
}