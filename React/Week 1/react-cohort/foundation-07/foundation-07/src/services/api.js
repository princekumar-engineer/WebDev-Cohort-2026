import axios from "axios";
import { tokenStore } from "./tokenStore.js";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

//Here's config means "Request"
api.interceptors.request.use((config) => {
    const token = tokenStore.getAccess()
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

instance.interceptors.response.use(
    res => {
    return res
    },
    error => {
    if (error.response?.status === 401) {
        console.log(error)
    }

    return {
        success: false,
        message: error.message,
        status: error.response?.status ?? 500
    }
})