export interface IGetCats {
    id: number
    name: string
    childrens?: any[]
}

export interface IGetCatsResponse {
    childrens: IGetCats[]
}