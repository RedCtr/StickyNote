import { Note } from "@/types";
import { axiosInstance } from "@/utils";
import { cookies } from "next/headers";

type NoteData = {
    title: string,
    content: string
}


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

export const getNoteById = async (noteId: string) => {
    try {
        const token = cookies().get('AUTH-TOKEN')?.value
        const note = await axiosInstance.get(`/note/${noteId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return note.data as Note
    } catch (error) {
        console.log("error", error);

    }
}


export const updateNote = async (noteId: string, updatedNote: NoteData) => {
    try {
        const token = cookies().get('AUTH-TOKEN')?.value
        const note = await axiosInstance.put(`/note/${noteId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: JSON.stringify(updatedNote)
        })
        return note.data as Note
    } catch (error) {
        console.log("error", error);

    }
}

export const createNote = async (noteData: NoteData) => {
    try {
        const token = cookies().get('AUTH-TOKEN')?.value
        const note = await axiosInstance.post('/notes', {
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: JSON.stringify(noteData)
        })
        return note.data as Note
    } catch (error) {
        console.log("error", error);

    }
}

export const deleteNote = async (noteId: string) => {
    try {
        const token = cookies().get('AUTH-TOKEN')?.value
        const note = await axiosInstance.delete(`/note/${noteId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return note.data as Note
    } catch (error) {
        console.log("error", error);

    }
}