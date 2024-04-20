import object from '@hapi/joi/lib/types/object';
import User from '../models/user.model';

//create new user
export const newUser = async (body) => {
  let result = await User.findOne({email: body.email}).then()
  console.log(result)
  if(result!==null){
    throw new Error('User Already Exist')
  }
  const data = await User.create(body);
  return data;
};