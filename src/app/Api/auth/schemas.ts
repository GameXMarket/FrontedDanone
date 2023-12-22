import { z } from "zod";

// Register Schema
export const registerShema = z.object({
    username: z.string().min(1, {message: "Это поле обязательное"}),
    email: z.string()
            .min(1, {message: "Это поле обязательное"})
            .email("Это недействительный адрес электронной почты"),
    password: z.string().min(6, {message: "Пароль должен быть не меньше 6 символов"}),
    repassword: z.string().min(6, {message: "Пароль должен быть не меньше 6 символов"})
})
.refine((data) => data.password === data.repassword, {
    message: "Пароли не совпадают",
    path: ["password", "repassword"]
})

// Login Schema
export const loginShema = z.object({
    email: z.string()
            .min(1, {message: "Это поле обязательное"})
            .email("Это недействительный адрес электронной почты"),
    password: z.string().min(6, {message: "Пароль должен быть не меньше 6 символов"}),
})

export type RegisterDto = z.infer<typeof registerShema>
export type LoginDto = z.infer<typeof loginShema>
