import HttpStatus from 'http-status-codes';
import * as NoteService from '../services/note.service'

export const createNotes = async(req, res) => {
    try {
        const data = await NoteService.createNotes(req.body);
        res.status(HttpStatus.CREATED).json({
          code: HttpStatus.CREATED,
          data: data,
          message: 'User created successfully'
        });
      } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
          code: HttpStatus.BAD_REQUEST,
          message: `${error}`
        });
      }
};