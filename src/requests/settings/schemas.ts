import { z } from "zod";

export const changeNameSchema = z.object({
    name: z.string().optional(),
    color: z.string().optional()
})

export type ChangeNameDto = z.infer<typeof changeNameSchema>