import { Note } from "@/types";
import { axiosInstance } from "@/utils";
import { cookies } from "next/headers";

export const getAllNotesByUser = async () => {
    try {
        const token = cookies().get('AUTH-TOKEN')?.value
        const notes = await axiosInstance.get('/notes', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return notes.data as Note[]
    } catch (error) {
        console.log("error", error);

    }
}