  import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';

export const userRegister = async (req, res) => {
  try {
    const data = await UserService.userRegister(req.body);
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

export const userLogin = async (req, res) => {
  try {
    const data = await UserService.userLogin(req.body);
    const {firstName, lastName, email} = data;
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: {
        firstName,
        lastName,
        email
      },
      message: 'User found successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};