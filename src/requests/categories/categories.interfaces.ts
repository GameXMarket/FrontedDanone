export interface IGetCat {
    id: number
    name: string
    childrens?: IGetCat[]
}

export interface IGetCatsResponse {
    data: IGetCat[]
}

