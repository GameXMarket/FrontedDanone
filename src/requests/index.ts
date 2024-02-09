import { auth } from "@/auth";
import axios from "axios";
import { useSession } from "next-auth/react";

const instance = axios.create({
    baseURL: 'https://test.yunikeil.ru/',
    withCredentials: true
});

// instance.interceptors.request.use(async function (config) {
//     return config;
//   }, function (error) {
//     // Do something with request error
//     return Promise.reject(error);
//   });

export default instance;