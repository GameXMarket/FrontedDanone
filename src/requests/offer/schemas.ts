import { number, z } from "zod";

export const createOfferSchema = z.object({
    attachment_id: z.number().nullable(),
    img: z.intersection(z.record(z.string(), z.any()) ,z.object({length: z.number().min(1)})),
    name: z.string().min(1),
    description: z.string(),
    price: z.number().min(1),
    count: z.number(),
    category_value_ids: z.array(z.number())
})

export type CreateOfferDto = z.infer<typeof createOfferSchema>