import express from 'express';
import * as noteController from '../controllers/note.controller';
import * as validator from '../validators/note.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

/* route to notes creation */
router.post('',validator.noteValidator, userAuth, noteController.createNotes)

router.get('', userAuth, noteController.getNoteByEmail)

router.put('/:_id', userAuth, noteController.updateNote)

router.delete('/:_id', userAuth, noteController.deleteNote)

export default router;
