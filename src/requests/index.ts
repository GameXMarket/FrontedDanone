import axios from "axios";

const instance = axios.create({
    baseURL: 'https://test0.yunikeil.ru/',
    withCredentials: true
});

// instance.interceptors.request.use(async function (config) {
//     return config;
//   }, function (error) {
//     if(error)
//     return Promise.reject(error);
//   });

export default instance;