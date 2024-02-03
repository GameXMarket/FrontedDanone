import { z } from "zod";

export const changeNameSchema = z.object({
    name: z.string().optional(),
    color: z.string().optional()
})

export const changeEmailSchema = z.object({
    email: z.string().email()
})

export const changePasswordSchema = z.object({
    password: z.string().min(7)
})

export type ChangeNameDto = z.infer<typeof changeNameSchema>
export type ChangeEmailDto = z.infer<typeof changeEmailSchema>
export type ChangePasswordDto = z.infer<typeof changePasswordSchema>