import instance from ".."
import { createCategoriesDto } from "./schemas"
import {CategoryType, ValueType} from "@/types/CategoryType"

export const categoryServices = {
    async getAllCategories(offset: number = 0, limit: number = 5): Promise<CategoryType[]> {
        const data = await instance.get(`/categories/carcass/gettall/?offset=${offset}&limit=${limit}`)
        return data.data
    },

    async getCategoryById(category_id: number | string): Promise<CategoryType> {
        const data = await instance.get(`/categories/carcass/${category_id}`)
        return data.data
    },  

    async getCategoryAssociated(category_id: number | string): Promise<ValueType[]> {
        const data = await instance.get(`/categories/value/getassociated?root_value_ids=${category_id}`)
        return data.data
    },  

    async getValueById(category_id: number | string): Promise<ValueType[]> {
        const data = await instance.get(`/categories/value/getmany?value_ids=${category_id}`)
        return data.data
    },  

    async getCategoryWithAssociated(category_id: number | string): Promise<{category: CategoryType, associated: ValueType[]}> {
        const data = await Promise.all([this.getCategoryById(category_id), this.getCategoryAssociated(category_id)])
        return {category: data[0], associated: data[1]}
    },  

    async createCategory(data: createCategoriesDto) {
        return instance.post('/categories', {...data})
    }
}

// TODO: Написать интерфейс для getCatsById