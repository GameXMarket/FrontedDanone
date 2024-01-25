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
    }
}

export const safeCreateOffer = createSafeFetch(createOfferSchema, OfferApiService.createOffer)