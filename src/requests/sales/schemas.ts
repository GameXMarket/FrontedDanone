import * as z from "zod"

export const createConfirmationRequestSchema = z.object({
    purchase_id: z.string().min(1)
})

export type CreateConfirmationRequestDto = z.infer<typeof createConfirmationRequestSchema>