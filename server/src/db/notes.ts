import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
})


export const NoteModel = mongoose.model("Note", NoteSchema)

export const getNoteById = (noteId: string, userId: string) => NoteModel.findOne({ _id: noteId, user: userId })

// Finding all notes belonging to the user and sort them by updatedAt in descending order
export const getAllNotesByUser = (userId: string) => NoteModel.find({ user: userId }).sort({ updatedAt: -1 })
export const createNote = (values: Record<string, any>) => new NoteModel(values).save().then((note) => note.toObject())
export const updateNote = (noteId: string, userId: string, values: Record<string, any>) =>
    NoteModel.findOneAndUpdate(
        { _id: noteId, user: userId },
        values,
        { new: true }
    )

export const deleteNote = (noteId: string, userId: string) =>
    NoteModel.findOneAndDelete(
        { _id: noteId, user: userId }
    )