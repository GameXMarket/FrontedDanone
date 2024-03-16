import { object, z } from "zod";

const userSchema = z.object({
    password: z.string().min(7, { message: "Пароль должен быть не меньше 7 символов" }),
    username: z.string(),
    is_verified: z.boolean(),
    auth: object({
        password: z.string().min(7, { message: "Пароль должен быть не меньше 7 символов" }),
    })
})

const passwordSchema = z.object({
    password: z.string().min(7, { message: "Пароль должен быть не меньше 7 символов" }),
    auth: object({
        password: z.string().min(7, { message: "Пароль должен быть не меньше 7 символов" }),
    })
})

const emailSchema = z.object({
    email: z.string().email()
})


export type userDto = z.infer<typeof userSchema>
export type passwordDto = z.infer<typeof passwordSchema>
export type emailSchema = z.infer<typeof emailSchema>