import instance from ".."
import { IGetCatsResponse } from "./categories.interfaces"
import { createCategoriesDto } from "./schemas"

export const categoryServices = {
    async getAllCategories() {
        const data = await instance.get<IGetCatsResponse>('/categories/gettall')
        return data.data
    },

    async createCategory(data: createCategoriesDto) {
        return instance.post('/categories', {...data})
    }
}