import HttpStatus from 'http-status-codes';
import * as NoteService from '../services/note.service'

export const createNotes = async(req, res) => {
    try {
        req.body.createdBy = res.locals.user.email
        const data = await NoteService.createNotes(req.body);
        res.status(HttpStatus.CREATED).json({
          success: true,
          message: 'Note created successfully',
          data: data
        });
      } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
          code: HttpStatus.BAD_REQUEST,
          message: `${error}`
        });
      }
};

export const getNoteByEmail = async(req, res) => {
  try{
    const data = await NoteService.getNoteByEmail(res.locals.user.email)
    res.status(HttpStatus.OK).json({
      success: true,
      message: 'fetched successfully',
      data: data
    });
  }catch(error){
    res.status(HttpStatus.OK).json({
      success: false,
      message: `${error}`
    });
  }
}

export const updateNote = async(req, res) => {
  try{
    const data = await NoteService.updateNote(req.params._id, req.body, res.locals.user.email);
    res.status(HttpStatus.OK).json({
      success: true,
      message: 'Note Updated Successfully',
      data: data
    });
  }catch(error){
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: `${error}`
    });
  }
}

export const deleteNote = async(req, res) => {
  try{
    await NoteService.deleteNote(req.params._id, res.locals.user.email);
    res.status(HttpStatus.OK).json({
      success: true,
      message: 'Note Deleated Successfully',
    });
  }catch(error){
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: `${error}`
    });
  }
}