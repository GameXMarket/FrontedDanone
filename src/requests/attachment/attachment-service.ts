import { createSafeFetch } from "@/lib/create-safe-fetch"
import instance from ".."
import {UploadFileDto, uploadFilesSchema} from "./schemas"
import { headers } from "next/headers"

export const AttachmentApiService = {

    async uploadOfferImage(data: UploadFileDto) {
        const formData = new FormData()
        formData.append('files', data.files[0])
        return instance.post(`attacment/uploadfiles/offer?offer_id=${data.offer_id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        .then(res => res)
    },

    async getImageByAttachmentId(attachment_id: string | number) {
        return instance.get(`attacment?attachment_id=${attachment_id}`, {headers: {Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDk3NTQwMTMsInN1YiI6Im1yYW1vcjkxOTMyNzY1QGdtYWlsLmNvbSIsInNlc3Npb24iOiJjYTA3NmU1Ny1hMTQ2LTQ3OTctYWNmMC1hYjA3NGNhNDA2OTMiLCJ0b2tlbl90eXBlIjoiYWNjZXNzIiwidXNlcl9pZCI6Mn0.-EiwwbYFa5XXvp47fYvv3IFaWY45MiqVca_pTloAgoI"}})
        .then(res => res.data)
    },

    async getImageByFileId(file_id: string | number) {
        return instance.get(`attacment/getfile?file_id=${file_id}`, {headers: {Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDk3NTQwMTMsInN1YiI6Im1yYW1vcjkxOTMyNzY1QGdtYWlsLmNvbSIsInNlc3Npb24iOiJjYTA3NmU1Ny1hMTQ2LTQ3OTctYWNmMC1hYjA3NGNhNDA2OTMiLCJ0b2tlbl90eXBlIjoiYWNjZXNzIiwidXNlcl9pZCI6Mn0.-EiwwbYFa5XXvp47fYvv3IFaWY45MiqVca_pTloAgoI"}})
        .then(res => res.data)
    },

}

export const safeUploadOfferImage = createSafeFetch(uploadFilesSchema, AttachmentApiService.uploadOfferImage)