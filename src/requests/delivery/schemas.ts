import * as z from "zod"

export const createDeliverySchema = z.object({
    offer_id: z.number(),
    value: z.string().min(1)
})

export type CreateDeliveryDto = z.infer<typeof createDeliverySchema>