import axios from "axios";


export const axiosInstance = axios.create({
    baseURL: 'https://sticky-note-server-2plupqqyn-redctr.vercel.app',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://sticky-note-lac.vercel.app'
    }
})