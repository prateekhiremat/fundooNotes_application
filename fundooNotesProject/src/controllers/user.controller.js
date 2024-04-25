import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';

export const userRegister = async (req, res) => {
  try {
    const data = await UserService.userRegister(req.body);
    res.status(HttpStatus.CREATED).json({
      success: true,
      message: 'User created successfully',
      data: data
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: `${error}`
    });
  }
};

export const userLogin = async (req, res) => {
  try {
    const data = await UserService.userLogin(req.body);
    res.status(HttpStatus.OK).json({
      success: true,
      message: 'User loggedIn successfully',
      data: data.user,
      token: data.token
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: `${error}`
    });
  }
};