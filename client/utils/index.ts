import axios from "axios";


export const axiosInstance = axios.create({
    baseURL: 'https://sticky-note-server-7muxqck4m-redctr.vercel.app',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    },
})