import { createSafeFetch } from "@/lib/create-safe-fetch"
import instance from ".."
import { codeDto, emailWithCodeDto, emailWithCodeSchema, passwordDto, passwordWithCodeDto, passwordWithCodeSchema } from "./schemas"
import { UserType } from "@/types/UserType"

export const userService = {    
    async getUser() {
        return await instance.get('users/me').then(res => res.data)
    },
   
    async updateUserName(username: {username: string}) {
        return await instance.patch('users/me/update/username', {...username})
            .then(res => res.data)
    },
    
    async sendCodeForPassword() {
        return await instance.post('users/me/password')
            .then(res => res.data)
    },

    async verifyPasswordChange(data: passwordWithCodeDto) {
        return await instance.post(`auth/password-change?code=${data.code}`, {password: data.password})
            .then(res => res)
    },

    async sendCodeToOldEmail() {
        return await instance.post('users/me/oldmail')
            .then(res => res.data)
    },

    async sendCodeToNewEmail(data: emailWithCodeDto) {
        return await instance.post(`users/me/newmail`, {...data})
            .then(res => res.data)
    },

    async verifyEmailChange(data: codeDto): Promise<UserType> {
        return await instance.post(`auth/email-change?code=${data.code}`)
            .then(res => res.data)
    },

    async deleteUser(data: passwordDto) {
        return await instance.delete('users/me/update/password', {data})
            .then(res => res.data)
    },
}

export const safeVerifyPasswordChange = createSafeFetch(passwordWithCodeSchema, userService.verifyPasswordChange)
export const safeSendCodeToNewEmail = createSafeFetch(emailWithCodeSchema, userService.sendCodeToNewEmail)