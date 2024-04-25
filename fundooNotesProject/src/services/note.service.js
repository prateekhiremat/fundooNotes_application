import { result } from '@hapi/joi/lib/base';
import Note from '../models/note.model'

export const createNotes = async(body) => {
    return Note.create(body);
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

export const getNote = async(_id, userId) => {
    return Note.findOne(
        {
            _id,
            createdBy: userId
        },
        {
            title: true,
            discription: true,
            color: true
        }
    ).then((result)=>{
        if(result!==null)
            return result
        throw new Error('Unathorized request')
    })
}

export const updateNote = async(_id, body, userId) => {
    return Note.findOneAndUpdate(
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
    return Note.findOneAndDelete(
        {
            _id, createdBy: userId
        }
    ).then((result) => {
        if(result!==null)
            return
        throw new Error('Unauthorized Request')
    })
}

export const isArchived = async(_id, userId) => {
    return Note.findOne(
        {
            _id,
            createdBy: userId
        }
    ).then((note)=>{
        if(note===null)
            throw new Error('Unathorized request')
        note.isArchived = !note.isArchived
        return Note.findByIdAndUpdate(
            {
                _id
            },
            note,
            {
                new: true
            }
        )
    })
}

export const isTrashed = async(_id, userId) => {
    return Note.findOne(
        {
            _id,
            createdBy: userId
        }
    ).then((note)=>{
        if(note===null)
            throw new Error('Unathorized request')
        note.isTrashed = !note.isTrashed
        return Note.findByIdAndUpdate(
            {
                _id
            },
            note,
            {
                new: true
            }
        )
    })
}