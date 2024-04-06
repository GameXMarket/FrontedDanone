export type CategoryType = {
    id: number,
    select_name: string,
    in_offer_name: string,
    is_last: boolean,
    updated_at: number,
    is_root: boolean,
    author_id: number,
    admin_comment: string,
    created_at: number,
    author: any, //temp
    values: Array<ValueType>
}

export type ValueType = {
    carcass_id: number,
    next_carcass_id: number,
    value: string,
    updated_at: number,
    id: number,
    author_id: number,
    created_at: number,
    next_carcass: any, //temp
    author: any, //temp
    carcass: any //temp,
    subvalues?: ValueType[]
}