import { z } from "zod";

// Register Schema
export const registerShema = z.object({
    username: z.string().min(4, { message: "Имя пользователя должно быть не менее 4 символов" }),
    email: z.string()
        .min(1, { message: "Это поле обязательное" })
        .email("Это недействительный адрес электронной почты"),
    password: z.string().min(7, { message: "Пароль должен быть не меньше 7 символов" }),
    repassword: z.string().min(7, { message: "Пароль должен быть не меньше 7 символов" })
})
    .superRefine((data, ctx) => {
        if (data.password !== data.repassword) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["password"],
                message: "Пароли не совпадают"
            }),
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ["repassword"],
                    message: "Пароли не совпадают"
                })
        }
    })

// Login Schema
export const loginSchema = z.object({
    email: z.string()
        .min(1, { message: "Это поле обязательное" })
        .email("Это недействительный адрес электронной почты"),
    password: z.string().min(7, { message: "Пароль должен быть не меньше 7 символов" }),

})

export type RegisterDto = z.infer<typeof registerShema>
export type LoginDto = z.infer<typeof loginSchema>
