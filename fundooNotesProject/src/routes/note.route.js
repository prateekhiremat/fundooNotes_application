import express from 'express';
import * as noteController from '../controllers/note.controller';

const router = express.Router();

/* route to notes creation */
router.post('',noteController.createNotes);

export default router;
