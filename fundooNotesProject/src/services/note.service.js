import Note from '../models/note.model'

export const createNotes = async(body) => {
    return await Note.create(body);
}

export const getNoteByEmail = async(email) => {
    return Note.find(
        {createdBy: email},
        {
            title:1,
            discription:1,
            color:1
        }
    )
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
        if(updatedNote!==null)
            return updatedNote
        throw new Error('Unauthorized Request')
    })
}

export const deleteNote = async(_id, email) => {
    return await Note.findOneAndDelete(
        {
            _id, createdBy: email
        }
    ).then((result) => {
        if(result!==null)
            return
        throw new Error('Unauthorized Request')
    })
}