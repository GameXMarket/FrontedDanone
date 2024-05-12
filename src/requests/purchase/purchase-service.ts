import { createSafeFetch } from "@/lib/create-safe-fetch"
import instance from ".."
import { CompletePurchaseDto, CreatePurchaseDto, completePurchaseSchema, createPurchaseSchema } from "./schemas"
import { PurchaseType } from "@/types/PurchaseType"

export const purchaseApiService = {
    async createPurchase(data: CreatePurchaseDto) {
        return instance.post("purchase/my/create", {...data})
        .then(res => res.data)
    },
    async confirmPurchase(data: CompletePurchaseDto) {
        return instance.post(`purchase/my/complete/?state=${data.state}&purchase_id=${data.purchase_id}`)
        .then(res => res.data)
    },
    async getAllPurchases(status?: string, offset:number = 0, limit:number = 10) {
        return instance.get<PurchaseType[]>(`purchase/my/getall?offset=${offset}&limit=${limit}&status=${status}`)
        .then(res => res.data)
    },
}

export const safeCreatePurchase = createSafeFetch(createPurchaseSchema, purchaseApiService.createPurchase)
export const safeCompletePurchase = createSafeFetch(completePurchaseSchema, purchaseApiService.confirmPurchase)