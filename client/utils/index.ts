import axios from "axios";


export const axiosInstance = axios.create({
    baseURL: 'https://note-server-production.up.railway.app',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})