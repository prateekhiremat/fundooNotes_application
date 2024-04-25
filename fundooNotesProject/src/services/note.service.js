import Note from '../models/note.model'

export const createNotes = async(body) => {
    return await Note.create(body);
}

export const getAllNotes = async(_id) => {
    return Note.find(
        {createdBy: _id},
        {
            title:1,
            discription:1,
            color:1
        }
    )
}

export const updateNote = async(_id, body, userId) => {
    return await Note.findOneAndUpdate(
        {
            _id, createdBy: userId
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

export const deleteNote = async(_id, userId) => {
    return await Note.findOneAndDelete(
        {
            _id, createdBy: userId
        }
    ).then((result) => {
        if(result!==null)
            return
        throw new Error('Unauthorized Request')
    })
}