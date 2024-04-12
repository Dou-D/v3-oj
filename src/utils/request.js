import axios from 'axios'
import storage from '@/services/storage';

const service = axios.create({
    baseURL: "http://10.19.146.82:8080",
    timeout: 1000 * 60,
});
// request拦截器
service.interceptors.request.use((config) => {
    Object.assign(config.headers, { Authorization: `Bearer ${storage.get(storage.USER_TOKEN)}` })
    return config
}, error => Promise.reject(error))

// response拦截器
service.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default service;