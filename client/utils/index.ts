import axios from "axios";


export const axiosInstance = axios.create({
    baseURL: 'https://51.21.124.6.nip.io',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})