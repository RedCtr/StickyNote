import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})


// pre-save middleware function added to update the updatedAt field 
// whenever the note is saved or updated.

NoteSchema.pre("save", function (next) {
    this.updatedAt = new Date()
    next()
})
export const NoteModel = mongoose.model("Note", NoteSchema)