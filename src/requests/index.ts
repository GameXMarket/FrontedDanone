import axios from "axios";

const instance = axios.create({
    baseURL: 'https://test.yunikeil.ru/',
    withCredentials: true
});

export default instance;