import { Router } from "express";
import { createUserNote, deleteUserNote, getAllNotes, getUserNoteById, updateUserNote } from "../controllers/notes";
import { getCurrentUser, verifyToken } from "../middlewares";

export default (router: Router) => {
    router.get('/notes', verifyToken, getCurrentUser, getAllNotes)
    router.get('/note/:id', verifyToken, getCurrentUser, getUserNoteById)
    router.post('/notes', verifyToken, getCurrentUser, createUserNote)
    router.put('/note/:id', verifyToken, getCurrentUser, updateUserNote)
    router.delete('/note/:id', verifyToken, getCurrentUser, deleteUserNote)
}