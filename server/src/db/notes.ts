import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
})


// pre-save middleware function added to update the updatedAt field 
// whenever the note is saved or updated.

NoteSchema.pre("save", function (next) {
    this.updatedAt = new Date()
    next()
})
export const NoteModel = mongoose.model("Note", NoteSchema)

export const getNoteById = (noteId: string, userId: string) => NoteModel.findOne({ _id: noteId, user: userId })
export const getAllNotesByUser = (userId: string) => NoteModel.find({ user: userId })
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