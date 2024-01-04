import { createSafeFetch } from "@/lib/create-safe-fetch"
import instance from ".."
import {CreateOfferDto, createOfferShema} from "./schemas"

export const OfferApiService = {

    async createOffer(data: CreateOfferDto) {
        return instance.post("offers/my", {...data})
        .then(res => res)
    }
}

export const safeCreateOffer = createSafeFetch(createOfferShema, OfferApiService.createOffer)