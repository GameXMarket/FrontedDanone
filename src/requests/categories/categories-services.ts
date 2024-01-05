import instance from ".."
import { IGetCatsResponse } from "./categories.interfaces"
import { createCategoriesDto } from "./schemas"

export const categoryServices = {
    async getAllCategories() {
        const data = await instance.get('/categories/gettall')
        return data
    },

    async createCategory(data: createCategoriesDto) {
        return instance.post('/categories', {...data})
    }
}