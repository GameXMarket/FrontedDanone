import * as z from "zod"

export const createPurchaseSchema = z.object({
    offer_id: z.string().min(1),
    count: z.number().optional()
})

export const completePurchaseSchema = z.object({
    purchase_id: z.string().min(1),
    state: z.boolean()
})

export type CreatePurchaseDto = z.infer<typeof createPurchaseSchema>
export type CompletePurchaseDto = z.infer<typeof completePurchaseSchema>