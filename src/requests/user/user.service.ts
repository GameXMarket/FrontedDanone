import instance from ".."
import { passwordDto } from "./schemas"

export const userService = {    
    // NOTE: НА ВСЯКИЙ СЛУЧАЙ
    async getUser() {
        return await instance.get('users/me').then(res => res.data)
    },
   
    async updateUserName(username: {username: string}) {
        return await instance.patch('users/me/update/username', {...username})
            .then(res => res.data)
    },
    
    async updateUserPassword(data: passwordDto) {
        return await instance.patch('users/me/update/password', {...data})
            .then(res => res.data)
    },

    async updateUserEmail(data: {email: string}) {
        return await instance.patch('users/me/update/email', {...data})
            .then(res => res.data)
    }
}