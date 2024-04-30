import express from 'express';
import * as userController from '../controllers/user.controller';
import * as validator from '../validators/user.validator';
import { userAuth, userAuthForResetPassword } from '../middlewares/auth.middleware';

const router = express.Router();

/* route to user registration */
router.post('', validator.userValidatorRegister, userController.userRegister);

router.post('/login', validator.loginRegister, userController.userLogin);

router.post('/email', validator.email, userController.forgetPassword);

router.post('/password', validator.password, userAuthForResetPassword, userController.resetPassword)

export default router;
