import axios from "axios";
import { getToken } from "../auth";

export const BASE_URL = 'http://localhost:8080/api/v1';

export const myAxios = axios.create({
    baseURL: BASE_URL
});

export const privateAxios = axios.create({
    baseURL: BASE_URL
});

privateAxios.interceptors.request.use(
    async (config) => {
        const token = getToken();
        console.log(token);
        if (token) {
            if (!config.headers) {
                config.headers = {}; // Ensure headers object exists
            }
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config; // Ensure to return the modified config object
    },
    (error) => {
        return Promise.reject(error);
    }
);
