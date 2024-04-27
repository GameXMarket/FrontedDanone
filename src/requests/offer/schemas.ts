import { number, z } from "zod";

export const createOfferSchema = z.object({
    attachment_id: z.number().nullable(),
    img: z.array(z.any()).min(1),
    // img: z.intersection(z.record(z.string(), z.any()) ,z.object({length: z.number().min(1)})),
    name: z.string().min(1),
    description: z.string(),
    price: z.number().min(1),
    count: z.number(),
    category_value_ids: z.array(z.number())
})

export const enableAutogiveSchema = z.object({
    offer_id: z.string().min(1),
    enabled: z.boolean()
})

export type CreateOfferDto = z.infer<typeof createOfferSchema>
export type EnableAutogiveDto = z.infer<typeof enableAutogiveSchema>