import { createSafeFetch } from "@/lib/create-safe-fetch"
import instance from ".."
import {CreateOfferDto, createOfferSchema} from "./schemas"
import { MyOfferType, OfferType, OffersGroup, getAllOffers } from "@/types/OfferType"
import { AttachmentApiService } from "../attachment/attachment-service"

export const OfferApiService = {

    async createOffer(data: CreateOfferDto) {
        const offer = await instance.post<OfferType>("offers/my", {...data})
        const img = await AttachmentApiService.uploadOfferImage({offer_id: offer.data.id, files: data.img})
        return offer
    },

    async getOfferById(id: string) {
        return instance.get<OfferType>(`offers/${id}`)
        .then(res => res.data)
    },

    async getAll(category_id?: number | string | number[] | string[], priceFilter?: boolean | null, search?: string | null ,offset: number = 0, limit: number = 10) {
        return instance.get<getAllOffers[]>(`offers/getall?offset=${offset}&limit=${limit}`, {
            params: {category_value_ids: category_id, is_descending: priceFilter, search_query: search},
            paramsSerializer: {
                indexes: null,
            }
        })
        .then(res => res.data)
    },

    async getMyAll(offset: number = 0, limit: number = 5) {
        return instance.get<OfferType[]>(`offers/my/getall?offset=${offset}&limit=${limit}`)
        .then(res => res.data)
    },

    async getMyByCategories(offset: number = 0, limit: number = 5) {
        return instance.get<OffersGroup[]>(`offers/my/bycategories?offset=${offset}&limit=${limit}`)
        .then(res => res.data)
    },

    async getMyByCarcassId(carcass_id?: number | string, offset: number = 0, limit: number = 5) {
        return instance.get<MyOfferType[]>(`offers/my/bycarcassid?offset=${offset}&limit=${limit}&carcass_id=${carcass_id}`)
        .then(res => res.data)
    },

    async deleteOffer(offer_id?: number | string) {
        return instance.delete(`offers/my/${offer_id}`)
        .then(res => res.data)
    }
}

export const safeCreateOffer = createSafeFetch(createOfferSchema, OfferApiService.createOffer)