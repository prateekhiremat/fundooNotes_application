import express from 'express';
import * as userController from '../controllers/user.controller';
import * as validator from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

/* route to user registration */
router.post('', validator.userValidatorRegister, userController.userRegister);

router.post('/login', validator.loginRegister, userController.userLogin);

router.post('/email/:email', userController.forgetPassword);

router.put('/reset-password/:newPassword', userAuth, userController.resetPassword)

export default router;
