import { Note, NoteData } from "@/types";
import { axiosInstance } from "@/utils";
import { cookies } from "next/headers";


const BASE_URL = "https://51.21.124.6.nip.io"

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
        const note = await fetch(`${BASE_URL}/note/${noteId}`, {
            method: 'PUT',
            body: JSON.stringify(updatedNote),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        })
        return await note.json() as Note
    } catch (error) {
        console.log("error", error);

    }
}

export const createNote = async (noteData: NoteData) => {
    try {
        const token = cookies().get('AUTH-TOKEN')?.value

        const res = await fetch(`${BASE_URL}/notes`, {
            method: 'POST',
            body: JSON.stringify(noteData),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        })

        const note = await res.json()
        console.log("note", note);

        return note as Note
    } catch (error) {
        console.log("error", error);

    }
}

export const deleteNote = async (noteId: string) => {
    try {
        const token = cookies().get('AUTH-TOKEN')?.value
        const note = await fetch(`${BASE_URL}/note/${noteId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        })

        return await note.json() as Note
    } catch (error) {
        console.log("error", error);

    }
}