import Note from '../models/note.model'
import { deleteNoteFromRedisClint, getAllNotesFromRedisClint, getNoteFromRedisClint, setToRedisClint } from '../utils/redisClint';

export const createNotes = async(userId, body) => {
    const note = await Note.create(body);
    await setToRedisClint(userId, note)
    return note;
}

export const getAllNotes = async(_id) => {
    return await getAllNotesFromRedisClint(_id)
}

export const getNote = async(_id, userId) => {
    const note = await getNoteFromRedisClint(userId, _id);
    console.log(note)
    if(note!==null)
        return note
    throw new Error('Note not found')
    
}

export const updateNote = async(_id, body, userId) => {
    let note = await getNoteFromRedisClint(userId, _id);
    if(note===null)
        throw new Error('Note not found')
    note = await Note.findOneAndUpdate(
        {
            _id, createdBy: userId
        },
        body,
        {
            new: true
        }
    )
    await deleteNoteFromRedisClint(userId, _id)
    await setToRedisClint(userId, note)
    return note
}

export const deleteNote = async(_id, userId) => {
    const note = await getNoteFromRedisClint(userId, _id);
    if(note===null)
        throw new Error('Note not found')
    await Note.findOneAndDelete(
        {
            _id, createdBy: userId
        }
    )
    await deleteNoteFromRedisClint(userId, _id)
}

export const isArchived = async(_id, userId) => {
    let note = await getNoteFromRedisClint(userId, _id);
    if(note===null)
        throw new Error('Note not found')
    note[0].isArchived = !note[0].isArchived
    note = await Note.findByIdAndUpdate(
        {
            _id
        },
        note[0],
        {
            new: true
        }
    )
    await deleteNoteFromRedisClint(userId, _id)
    await setToRedisClint(userId, note)
    return note;
}

export const isTrashed = async(_id, userId) => {
    let note = await getNoteFromRedisClint(userId, _id);
    if(note===null)
        throw new Error('Note not found')
    note[0].isTrashed = !note[0].isTrashed
    note = await Note.findByIdAndUpdate(
        {
            _id
        },
        note[0],
        {
            new: true
        }
    )
    await deleteNoteFromRedisClint(userId, _id)
    await setToRedisClint(userId, note)
    return note;
}

export const getAllNotesForRedis = async(_id) => {
    return Note.find(
        {createdBy: _id}
    )
}