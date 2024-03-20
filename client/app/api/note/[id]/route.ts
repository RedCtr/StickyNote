import { createNote, deleteNote, updateNote } from "@/lib/notes"

type NoteData = {
    title: string,
    content: string
}

type ParamsNote = {
    params: {
        id: string
    }
}

export async function PUT(req: Request, { params }: ParamsNote) {
    const noteId = params.id
    const noteData = await req.json() as NoteData
    const note = await updateNote(noteId, noteData)

    return Response.json(note)
}

export async function DELETE(req: Request, { params }: ParamsNote) {
    const noteId = params.id
    const note = await deleteNote(noteId)

    return Response.json(note)
}