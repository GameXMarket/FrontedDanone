import { z } from 'zod'

const createCategorySchema = z.object({
    name: z.string()
})

export type createCategoriesDto = z.infer<typeof createCategorySchema>