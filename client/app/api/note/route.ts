import { createNote } from "@/lib/notes"
import { NoteData } from "@/types";

export async function POST(req: Request) {
    const noteData = await req.json() as NoteData
    const note = await createNote(noteData)
    return Response.json(note)
}