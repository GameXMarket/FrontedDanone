import { z } from "zod";

// Shema на Schema исправь

export const createOfferShema = z.object({
    attachment_id: z.number().nullable(),
    name: z.string(),
    description: z.string(),
    price: z.number(),
    category_id: z.number().nullable(),
    count: z.number()
})

export type CreateOfferDto = z.infer<typeof createOfferShema>