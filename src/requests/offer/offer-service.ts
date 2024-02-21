import { createSafeFetch } from "@/lib/create-safe-fetch"
import instance from ".."
import {CreateOfferDto, createOfferSchema} from "./schemas"

export const OfferApiService = {

    async createOffer(data: CreateOfferDto) {
        return instance.post("offers/my", {...data})
        .then(res => res)
    },

    async getOfferById(id: string) {
        return instance.get<OfferType>(`offers/${id}`)
        .then(res => res.data)
    },

    async getAll(category_id?: number | string, offset: number = 0, limit: number = 5) {
        return instance.get<OfferType[]>(`offers/getall?offset=${offset}&limit=${limit}&category_value_ids=${category_id}`)
        .then(res => res.data)
    },

    async getMyAll(category_id?: number | string, offset: number = 0, limit: number = 5) {
        return instance.get<OfferType[]>(`offers/my/getall?offset=${offset}&limit=${limit}`)
        .then(res => res.data)
    }
}

export const safeCreateOffer = createSafeFetch(createOfferSchema, OfferApiService.createOffer)