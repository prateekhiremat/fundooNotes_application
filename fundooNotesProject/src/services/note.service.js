import Note from '../models/note.model'

export const createNotes = async(body) => {
    return await Note.create(body);
}