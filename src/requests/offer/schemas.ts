import { z } from "zod";

export const createOfferSchema = z.object({
    attachment_id: z.number().nullable(),
    name: z.string(),
    description: z.string(),
    price: z.number(),
    count: z.number(),
    category_id: z.string(),
    game_id: z.number().optional(),
    service_id: z.number().optional(),
    amount_id: z.number().optional()
})

export type CreateOfferDto = z.infer<typeof createOfferSchema>