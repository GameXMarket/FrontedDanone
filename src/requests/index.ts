import axios from "axios";
import { getSession } from "next-auth/react";

const instance = axios.create({
    baseURL: 'https://test.yunikeil.ru/',
    withCredentials: true
});

instance.interceptors.request.use(async function (config) {
    const session = await getSession()
    config.headers.Authorization = `Bearer ${session?.user.access}`
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

export default instance;