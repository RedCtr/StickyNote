import axios from "axios";


export const axiosInstance = axios.create({
    baseURL: 'http://16.16.91.252',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})