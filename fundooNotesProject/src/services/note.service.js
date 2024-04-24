import { error } from '@hapi/joi/lib/base';
import Note from '../models/note.model'

export const createNotes = async(body) => {
    return await Note.create(body);
}

export const getNoteByEmail = async(email) => {
    return Note.find({createdBy: email})
}

export const updateNote = async(_id, body, email) => {
    return await Note.findOneAndUpdate(
        {
            _id, createdBy: email
        },
        body,
        {
            new: true
        }
    ).then((updatedNote) => {
        return updatedNote
    }).catch((error) => {
        return error
    })
}

export const deleteNote = async(_id, email) => {
    return await Note.findOneAndDelete(
        {
            _id, createdBy: email
        }
    ).then(() => {
        return 
    }).catch((error) => {
        return error
    })
}