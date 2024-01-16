export type CategoryType = {
    author: any
    author_id: number
    childrens: CategoryType[]
    created_at: number
    id: number
    is_last: boolean
    name: string
    parrent_id?: number
    updated_at: number
    values: any[]
}