import instance from ".."
import { IDialogs } from "./messenger.interfaces"


export const messengerService = {
    async getAllChats(offset:number = 0, limit:number = 10): Promise<IDialogs> {
        return instance.get(`chat/my/getall/?offset=${offset}&limit=${limit}`)
            .then(res => res)
    },

    async getDialogById(interlocutor_id: number) {
        return instance.get(`chat/my/getdialog/?interlocutor_id=${interlocutor_id}`)
            .then(res => res.data)
    },
    
    async getChatMessages(chat_id: number, offset:number = 0, limit:number = 10) {
        return instance.get(`chat/my/getmessages/?chat_id=${chat_id}&offset=${offset}&limit=${limit}`)
            .then(res => res.data)
    }
}