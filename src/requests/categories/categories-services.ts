import instance from ".."
import { IGetCats, IGetCatsResponse } from "./categories.interfaces"
import { createCategoriesDto } from "./schemas"

export const categoryServices = {
    async getAllCategories(offset: number = 0, limit: number = 5) {
        const data = await instance.get<IGetCats[]>(`/categories/gettall?offset=${offset}&limit=${limit}`)
        return data.data
    },

    async createCategory(data: createCategoriesDto) {
        return instance.post('/categories', {...data})
    },
    async getCategoryById(id: number) {
        return instance.get(`/categories/${id}`).then(res => res.data)
    }
}