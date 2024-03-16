import { UserType } from "@/types/UserType";
import { UserRole } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";

declare module "next-auth" {
    interface User {
        id: number
        access: string,
        refresh: string
    }
    interface Session {
        user: {
            id: number,
            email: string,
            username: string,
            roleId: number,
            accessToken: string,
            img: string
        }
    }
}
