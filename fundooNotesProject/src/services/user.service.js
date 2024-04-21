import User from '../models/user.model';
import bcrypt from 'bcrypt'

/* User Registration */
export const userRegister = async (body) => {
  let userObj = await User.findOne({email: body.email}).then()
  if(userObj!==null){
    throw new Error('User Already Exist')
  }
  body.password = await bcrypt.hash(body.password, 10);
  const data = await User.create(body);
  return data;
};

/* User Login */
export const userLogin = async (body) => {
  let userObj = await User.findOne({email: body.email}).then()
  if(userObj===null){
    throw new Error('Invalid email')
  }
  return new Promise((resolve, reject)=>{
    bcrypt.compare(body.password, userObj.password, function(err, result){
      if(result){
        resolve(userObj)
      }else{
        reject(new Error('Invalid password'))
      }
    })
  })
};