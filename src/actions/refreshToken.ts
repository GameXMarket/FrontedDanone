'use server'

import axios from "axios"
import { User } from "next-auth"
import { cookies } from "next/headers"

export const refreshToken = async () => {
    const cookieStore = cookies()
      return axios.post("https://test.yunikeil.ru/auth/refresh", null, {
        headers: {
          Cookie: `refresh=${cookieStore.get("refresh")?.value}`
        }
      })
      .then((response) => {
        if (response.status === 200) {
          const user = response.data
          cookieStore.set("refresh", response.data.refresh)
          return user;
        }
        return null as unknown as User
      })
      .catch((err) => {
        cookieStore.delete("refresh")
        return null as unknown as User
      })
  }