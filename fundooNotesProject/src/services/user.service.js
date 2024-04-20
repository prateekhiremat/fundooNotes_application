import object from '@hapi/joi/lib/types/object';
import User from '../models/user.model';

/* User Registration */
export const userRegister = async (body) => {
  let result = await User.findOne({email: body.email}).then()
  if(result!==null){
    throw new Error('User Already Exist')
  }
  const data = await User.create(body);
  return data;
};

/* User Login */
export const userLogin = async (body) => {
  let result = await User.findOne({email: body.email}).then()
  console.log(result)
  if(result===null){
    throw new Error('User not found / invalid email')
  }else if(result.password!==body.password){
    throw new Error('Invalid password')
  }else{
    return result;
  }
};