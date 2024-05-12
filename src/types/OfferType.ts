export type OfferType = {
    attachment_id: number,
    name: string,
    description: string,
    price: number,
    count: number,
    id: number,
    user_id: number,
    status: "active" | "hidden" | "deleted",
    created_at: number,
    updated_at: number,
    upped_at: number,
    offer_files: Array<string>,
    username: string,
    user_files: string[],
    is_autogive_enabled: boolean,
    is_autoup_enabled: boolean,
    category_values: Array<{ id: number, value: string }>
}

export type OmitedOfferType = {
    id: number,
    name: string,
    price: number,
    count: number,
    carcass_select_name: string,
    carcass_in_offer_name: string,
    carcass_in_offer_value: string,
}

export type MyOfferType = {
    files?: string[]
    offers: Array<OmitedOfferType>
}

export type OffersGroup = {
    files?: string[]
    value_id: number,
    value_name: string,
    next_carcass_id: number,
    offer_count: number
}

export type getAllOffers = {
    category_values: Array<{ id: number; value: string }>;
    description: string;
    files_offer: Array<string> | null;
    files_user: Array<string> | null;
    id: number;
    name: string;
    price: number;
    username: string;
}

export type OfferWithStatus = {
    offer_id: number
    offer_is_autogive_enabled: boolean | null
    purchase_id: number
    purchase_status: string
}