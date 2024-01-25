
export type LoginType = {
    access: string,
    refresh: string,
}

export type UserType = {
    email: string,
    username: string,
    id: number,
    is_verified: boolean,
    role_id: number,
    created_at: number,
    updated_at: number
}

export enum UserRole {
    USER = "USER",
    ADMIN = "ADMIN"
}