import Axios from "axios";
import { API_URL } from "../config";
import { checkAuth } from "../auth";
import storage from "../utils/storage";

function authRequestInterceptor(config) {
    const user = storage.getUser();
    checkAuth(user);
    if(user?.token) {
        config.headers["Authorization"] = "Bearer " + `${user.token}`;
    }
    config.headers["Context-Type"] = "application/json";
    return config;
}

export const axios = Axios.create({
    baseURL: API_URL
});

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        const message = error.response?.data?.message || error.message;
        return Promise.reject({message, code: error.response?.status});
    }
)