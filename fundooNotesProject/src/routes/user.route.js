import express from 'express';
import * as userController from '../controllers/user.controller';
import * as validator from '../validators/user.validator';

const router = express.Router();

/* route to user registration */
router.post('', validator.userValidatorRegister, userController.userRegister);

router.post('/login', validator.loginRegister, userController.userLogin);

export default router;
