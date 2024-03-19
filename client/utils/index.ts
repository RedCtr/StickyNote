import axios from "axios";


export const axiosInstance = axios.create({
    baseURL: 'http://localhost:4000',
    withCredentials: true,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    },
})