import { AxiosResponse } from "axios"
import instance from ".."
import { IGetCat, IGetCatsResponse } from "./categories.interfaces"
import { createCategoriesDto } from "./schemas"

export const categoryServices = {
    async getAllCategories(offset: number = 0, limit: number = 5): Promise<IGetCat[]> {
        const data = await instance.get(`/categories/gettall?offset=${offset}&limit=${limit}`)
        return data.data
    },

    async getCategoryById(category_id: number) {
        const data = await instance.get(`/categories/${category_id}`)
        return data.data
    },  

    async createCategory(data: createCategoriesDto) {
        return instance.post('/categories', {...data})
    }
}

// TODO: Написать интерфейс для getCatsById