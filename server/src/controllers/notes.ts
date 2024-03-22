import { Request, Response } from "express"
import { createNote, deleteNote, getAllNotesByUser, getNoteById, updateNote } from "../db/notes"
import { User } from "../types"

export const createUserNote = async (req: Request, res: Response) => {
    try {
        const { title, content } = req.body

        if (!title) {
            return res.status(403).json({ message: "Note Title is required" })
        }

        //@ts-ignore
        const currentUser = req.user as User

        const newNote = await createNote({
            title,
            content,
            user: currentUser.id
        })

        return res.status(201).json(newNote)
    } catch (error) {
        console.log("error", error);
        return res.sendStatus(500)
    }
}

export const getAllNotes = async (req: Request, res: Response) => {
    try {
        //@ts-ignore
        const currentUser = req.user as User

        const notes = await getAllNotesByUser(currentUser.id!)

        return res.status(201).json(notes)
    } catch (error) {
        return res.sendStatus(500)
    }
}

export const getUserNoteById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(403).json({ message: "Note Id is required" })
        }
        //@ts-ignore
        const currentUser = req.user as User

        const note = await getNoteById(id, currentUser.id!)

        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        return res.status(200).json(note)
    } catch (error) {
        return res.sendStatus(500)
    }
}

export const updateUserNote = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, content, status } = req.body

        if (!id) {
            return res.status(403).json({ message: "Note Id is required" })
        }
        //@ts-ignore
        const currentUser = req.user as User

        const updatedNote = await updateNote(id, currentUser.id!, { title, content, status, updatedAt: new Date() })

        if (!updatedNote) {
            return res.status(404).json({ message: 'Note not found' });
        }

        return res.status(200).json(updatedNote);

    } catch (error) {
        return res.sendStatus(500)
    }
}


export const deleteUserNote = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(403).json({ message: "Note Id is required" })
        }
        //@ts-ignore
        const currentUser = req.user as User

        const deletedNote = await deleteNote(id, currentUser.id!)

        if (!deletedNote) {
            return res.status(404).json({ message: 'Note not found' });
        }

        return res.status(200).json(deletedNote);

    } catch (error) {
        return res.sendStatus(500)
    }
}
