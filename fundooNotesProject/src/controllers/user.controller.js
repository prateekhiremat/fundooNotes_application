import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';
import * as userUtility from '../utils/user.util'

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
    
    const token = userUtility.setUser(data)
    res.cookie('uid', token)

    const {firstName, lastName, email} = data;
    res.status(HttpStatus.OK).json({
      success: true,
      message: 'User found successfully',
      data: {
        firstName,
        lastName,
        email
      }
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: `${error}`
    });
  }
};