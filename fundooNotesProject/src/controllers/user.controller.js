import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';

export const userRegister = async (req, res) => {
  try {
    const data = await UserService.userRegister(req.body);
    const{firstName, lastName, email} = data
    res.status(HttpStatus.CREATED).json({
      success: true,
      message: 'User created successfully',
      firstName,
      lastName,
      email
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
    const{firstName, lastName, email} = data
    res.status(HttpStatus.OK).json({
      success: true,
      message: 'User loggedIn successfully',
      firstName,
      lastName,
      email,
      token: data.token
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: `${error}`
    });
  }
};

export const forgetPassword = async(req, res) => {
  try{
    const data = await UserService.forgetPassword(req.body.email)
    res.status(HttpStatus.OK).json({
      success: true,
      message: 'Please reset your password through email',
      token: data
    });
  }catch(error){
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: `${error}`
    });
  }
}

export const resetPassword = async(req, res) => {
  try{
    const data = await UserService.resetPassword(req.userId, req.body.password)
    const email = data
    res.status(HttpStatus.OK).json({
      success: true,
      message: 'Password reset successfull',
      email: email
    });
  }catch(error){
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: `${error}`
    });
  }
}