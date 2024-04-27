import { createSafeFetch } from "@/lib/create-safe-fetch"
import instance from ".."
import {CreateOfferDto, EnableAutogiveDto, createOfferSchema, enableAutogiveSchema} from "./schemas"
import { MyOfferType, OfferType, OffersGroup, getAllOffers } from "@/types/OfferType"
import { AttachmentApiService } from "../attachment/attachment-service"

export const OfferApiService = {
    async deleteOffer(offer_id?: number | string) {
        return instance.delete(`offers/my/${offer_id}`)
        .then(res => res.data)
    },

    async createOffer(data: CreateOfferDto) {
        let offer
        try{
            offer = await instance.post<OfferType>("offers/my", {...data})
            await AttachmentApiService.uploadOfferImage({offer_id: offer.data.id, files: data.img})
            return offer.data
        }
        catch(err){            
            await this.deleteOffer(offer?.data.id)
            return {}
        }
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

    async getMyByCategories(search_query?: string | null, offset: number = 0, limit: number = 5) {
        return instance.get<OffersGroup[]>(`offers/my/bycategories?offset=${offset}&limit=${limit}`, {
            params: {search_query}
        })
        .then(res => res.data)
    },

    async getMyByCarcassId(carcass_id?: number | string, offset: number = 0, limit: number = 5) {
        return instance.get<MyOfferType[]>(`offers/my/bycarcassid?offset=${offset}&limit=${limit}&carcass_id=${carcass_id}`)
        .then(res => res.data)
    },
    async getMyByValueId(value_id?: number | string, offset: number = 0, limit: number = 5) {
        return instance.get<MyOfferType[]>(`offers/my/byvalueid?offset=${offset}&limit=${limit}&value_id=${value_id}`)
        .then(res => res.data)
    },
    async enableAutogive(data: EnableAutogiveDto) {
        return instance.post(`offers/my/delivery?enabled=${data.enabled}&offer_id=${data.offer_id}`)
        .then(res => res.data)
    },
}

export const safeCreateOffer = createSafeFetch(createOfferSchema, OfferApiService.createOffer)
export const safeEnableAutogive = createSafeFetch(enableAutogiveSchema, OfferApiService.enableAutogive)