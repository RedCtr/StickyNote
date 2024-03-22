import axios from "axios";

export const BASE_URL = "https://51.21.124.6.nip.io"
// http://localhost:4000

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})