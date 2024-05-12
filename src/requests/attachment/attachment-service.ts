import { getSession } from "next-auth/react"
import { createSafeFetch } from "@/lib/create-safe-fetch"
import instance from ".."
import {UploadFileDto, UploadMessageFileDto, uploadFilesSchema, UploadUserFileDto} from "./schemas"
import { toFormData } from "axios"

async function getAttachment(path: string) {
    const session = await getSession()
    const token = session?.user?.accessToken
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined
    const response = await instance.get(path, { headers })
    return response.data
}

export const AttachmentApiService = {

    async uploadOfferImage(data: UploadFileDto) {
        const formData = new FormData()
        for(let i = data.files?.length!-1; i >= 0; i--){
            formData.append('files', data.files[i])
        }        
        return instance.post(`attacment/uploadfiles/offer?offer_id=${data.offer_id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        .then(res => res)
    },

    async getImageByAttachmentId(attachment_id: string | number) {
        return getAttachment(`attacment?attachment_id=${attachment_id}`)
    },

    async getImageByFileId(file_id: string | number) {
        return getAttachment(`attacment/getfile?file_id=${file_id}`)
    },

    async uploadFileUser(data: UploadUserFileDto) {
        const formattedData = new FormData() 
        formattedData.append('file', data.files[0])
    
        return instance.post('attacment/uploadfiles/user', formattedData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then(res => res.data)
    },

    async uploadFileMessage(data: UploadMessageFileDto, accessToken: string) {
        const formattedData = new FormData() 
        formattedData.append('files', data.files[0])
    
        return instance.post(`attacment/uploadfiles/message?message_id=${data.message_id}`, formattedData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${accessToken}` 
            }
        }).then(res => res.data)
    },

    async removeUserAvatar() {
        return instance.delete('attacment/deletefiles/user')
            .then(res => res.data)
    }

}

export const safeUploadOfferImage = createSafeFetch(uploadFilesSchema, AttachmentApiService.uploadOfferImage)