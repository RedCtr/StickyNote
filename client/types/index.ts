export type User = {
    _id?: string,
    firstName: string,
    lastName: string,
    email: string,
    password?: string
}

export type Note = {
    _id: string,
    title: string,
    content: string,
    user: string,
    createdAt: string,
    updatedAt: string,
}

export type NoteData = {
    title: string,
    content?: string
}