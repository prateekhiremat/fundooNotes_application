  import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';

export const newUser = async (req, res, next) => {
  try {
    const data = await UserService.newUser(req.body);
    const {firstName,lastName,email} = data;
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: {
        firstName,
        lastName,
        email
      },
      message: 'User created successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};