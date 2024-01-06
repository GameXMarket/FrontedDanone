export interface IGetCat {
    id: number
    name: string
    childrens?: []
}

export interface IGetCatsResponse {
    data: IGetCat[]
}

