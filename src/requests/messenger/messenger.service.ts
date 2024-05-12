import instance from ".."


export const messengerService = {
    async getAllChats(offset:number = 0, limit:number = 10) {
        return instance.get(`chat/my/getall?offset=${offset}&limit=${limit}`)
            .then(res => res.data)
    },

    async getDialogById(interlocutor_id: number) {
        return instance.get(`chat/my/getdialog?interlocutor_id=${interlocutor_id}`)
            .then(res => res.data)
            .catch(err => console.warn(err)) 
    },
    
    async getChatMessages(chat_id: number, offset:number = 0, limit:number = 1000) {
        return instance.get(`chat/my/getmessages?chat_id=${chat_id}&offset=${offset}&limit=${limit}`)
            .then(res => res.data)
    },
    async createDialog(interlocutor_id: number, data: {content?: string, message_image: string | null}) {
        return instance.post(`chat/my/newdialog?interlocutor_id=${interlocutor_id}`, {...data})
            .then(res => res.data)
    }
}