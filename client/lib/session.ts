import { User } from "@/types";
import { axiosInstance } from "@/utils"
import { cookies } from "next/headers";

export const getCurrentUser = async () => {
    try {
        const token = cookies().get('AUTH-TOKEN')?.value
        const user = await axiosInstance.get('/user', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return user.data as User
    } catch (error) {
        console.log("error", error);

    }
}

const logout = () => {
    cookies().set('AUTH-TOKEN', '', { expires: new Date(0) })
}