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
})

export const passwordWithCodeSchema = z.object({
    password: z.string().min(7, { message: "Пароль должен быть не меньше 7 символов" }),
    code: z.string().min(4, "Код состоит из 4 символов")
})

export const emailWithCodeSchema = z.object({
    email: z.string().email(),
    code_old: z.string().min(4, "Код состоит из 4 символов")
})

const codeSchema = z.object({
    code: z.string().min(4, "Код состоит из 4 символов")
})


export type userDto = z.infer<typeof userSchema>
export type passwordDto = z.infer<typeof passwordSchema>
export type passwordWithCodeDto = z.infer<typeof passwordWithCodeSchema>
export type emailWithCodeDto = z.infer<typeof emailWithCodeSchema>
export type codeDto = z.infer<typeof codeSchema>