import { AxiosResponse } from "axios"
import instance from ".."
import { IGetCat, IGetCatsResponse } from "./categories.interfaces"
import { createCategoriesDto } from "./schemas"

export const categoryServices = {
    async getAllCategories() {
        const data  = await instance.get<IGetCatsResponse[]>('/categories/gettall')
        return data

    },

    async getCategoryById(category_id: string | string[]) {
        const data = await instance.get(`/categories/${category_id}`)
        return data
    },  

    async createCategory(data: createCategoriesDto) {
        return instance.post('/categories', {...data})
    }
}

// TODO: Написать интерфейс для getCatsById