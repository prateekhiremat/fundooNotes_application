import express from 'express';
import * as noteController from '../controllers/note.controller';
import * as validator from '../validators/note.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

/* route to notes creation */
router.post('', userAuth,validator.noteValidator, noteController.createNotes)

router.get('', userAuth, noteController.getAllNotes)

router.put('/:_id', userAuth, noteController.updateNote)

router.delete('/:_id', userAuth, noteController.deleteNote)

export default router;
