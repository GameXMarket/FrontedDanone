import { number, z } from "zod";

export const createOfferSchema = z.object({
    attachment_id: z.number().nullable(),
    name: z.string(),
    description: z.string(),
    price: z.number(),
    count: z.number(),
    category_value_ids: z.array(z.number())
})

export type CreateOfferDto = z.infer<typeof createOfferSchema>