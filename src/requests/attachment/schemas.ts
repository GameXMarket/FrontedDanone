import { number, z } from "zod";

const MAX_FILE_SIZE = 1000000
const ACCEPTED_IMAGE_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
]

export const uploadFilesSchema = z.object({
    offer_id: z.number(),
    files: z
        .any()
        .refine((files) => files?.length >= 1, { message: 'Image is required.' })
        //   .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), {
        //     message: '.jpg, .jpeg, .png and .webp files are accepted.',
        //    })
        .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, {
            message: `Max file size is 5MB.`,
        }),
})

export const uploadFileSchema = z.object({
    offer_id: z.number(),
    files: z
        .any()
        .refine((files) => files?.length >= 1, { message: 'Image is required.' })
        //   .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), {
        //     message: '.jpg, .jpeg, .png and .webp files are accepted.',
        //    })
        .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, {
            message: `Max file size is 5MB.`,
        }),
})

export type UploadFilesDto = z.infer<typeof uploadFilesSchema>
export type UploadFileDto = z.infer<typeof uploadFileSchema>