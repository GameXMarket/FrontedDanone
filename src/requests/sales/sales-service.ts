import { createSafeFetch } from "@/lib/create-safe-fetch"
import instance from ".."
import { CreateConfirmationRequestDto, createConfirmationRequestSchema } from "./schemas"
import { SaleType } from "@/types/SalesType"

export const salesApiService = {
    async createConfirmationRequest(data: CreateConfirmationRequestDto) {
        return instance.post(`sales/my/confirmation?purchase_id=${data.purchase_id}`)
        .then(res => res.data)
    },
    async getAllSales(offset:number = 0, limit:number = 10) {
        return instance.get<SaleType[]>(`sales/my/getall?offset=${offset}&limit=${limit}`)
        .then(res => res.data)
    },
}

export const safeCreateConfirmationRequest = createSafeFetch(createConfirmationRequestSchema, salesApiService.createConfirmationRequest)