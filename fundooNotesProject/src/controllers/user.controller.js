import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';
import * as userUtility from '../utils/user.util'

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
    
    const token = userUtility.setUser(data)
    res.cookie('uid', token)

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

export const userUpdate = async(req, res) => {
  try{
    const data = await UserService.updateUser(res.locals.user._id, req.body);
    const{firstName, lastName, email} = data
    res.status(HttpStatus.OK).json(
    {
      code : HttpStatus.OK,
      data : {
        firstName,
        lastName,
        email
      },
      message : 'User updated successfully'
    });
  }catch(error){
    res.status(HttpStatus.BAD_REQUEST).json({
      code : HttpStatus.BAD_REQUEST,
      message : `${error}`
    });
  }
};

export const deleteUser = async(req, res)=>{
  try{
    await UserService.deleteUser(res.locals.user._id);
    res.status(HttpStatus.OK).json({
      code : HttpStatus.OK,
      message : 'User deleated successfully'
    })
  }catch(error){
    res.status(HttpStatus.BAD_REQUEST).json({
      code : HttpStatus.BAD_REQUEST,
      message : `${error}`
    })
  }
}