export type SaleType = {
    id: number,
    name: string,
    price: number,
    status: "process" | "review" | "completed" | "dispute" | "refund",
    created_at: number,
    buyer_id: number,
    offer_id: number,
    description: string,
    count: number,
    is_reviewed: boolean,
    updated_at: number,
    buyer: any, //temp
    offer: any, //temp
    review: any, //temp
    parcels: any[] //temp
  }