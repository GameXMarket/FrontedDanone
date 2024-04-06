import instance from ".."
import { DeliveryType } from "@/types/DeliveryType"
import {CreateDeliveryDto, createDeliverySchema} from "./schemas"
import { createSafeFetch } from "@/lib/create-safe-fetch"

export const DeliveryService = {
    async getAllByOfferId(offerId: number, offset: number = 0, limit: number = 50): Promise<DeliveryType[]> {
        const data = await instance.get(`/delivery/my/getall?offset=${offset}&limit=${limit}&offer_id=${offerId}`)
        return data.data
    },
    async createDelivery(data: CreateDeliveryDto) {
        return await instance.post("/delivery/my/", [data]).then(res => res.data)
    },
}

export const safeCreateDelivery = createSafeFetch(createDeliverySchema, DeliveryService.createDelivery)