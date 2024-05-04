export type PurchaseType = {
    id: number,
    seller_id: number,
    name: string,
    count: number,
    created_at: number,
    price: number,
    status: "process" | "review" | "completed" | "dispute" | "refund",
    seller_username: string,
    seller_files: any // temp
    purchase_files: any // temp
}