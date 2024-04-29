import User from '../models/user.model';
import bcrypt from 'bcrypt';
import * as userUtility from '../utils/user.util'
import sendMail from '../utils/emailService.util'

/* User Registration */
export const userRegister = async (body) => {
  return User.findOne({email: body.email})
    .then((userObj) => {
      if(userObj!==null) 
        throw new Error('User Already Exist')
        return bcrypt.hash(body.password,10)
    })
    .then((hashedPassword)=>{
      body.password = hashedPassword
      return User.create(body)
    })
    .then((data)=>{
      return data
    })
    .catch((error) => {
      return error
    })
};

/* User Login */
export const userLogin = async (body) => {
  return User.findOne({email: body.email})
    .then((userObj) => {
      if(userObj===null)
          throw new Error('Invalid email')
      return userObj
    })
    .then((userObj)=>{
      return new Promise((resolve, reject)=>{
        bcrypt.compare(body.password, userObj.password, function(err, result){
          if(result){
            console.log(userObj)
            console.log(userObj._id)
            const token = userUtility.generateToken(userObj._id)
            console.log(token)
            resolve({user: userObj, token});
          }
          else
            reject(new Error('Invalid password'))
        })
      })
    })
};

export const forgetPassword = async(email) => {
  return User.findOne({email})
    .then((userObj)=>{
      const token = userUtility.generateToken(userObj._id)
      const subject = 'Reset Password'
      const message = `http://localhost:3000/api/users/reset-password/`
      sendMail(userObj.email, subject, message)
      return token;
    })
    .catch(()=>{
      throw new Error('Unathorized Request')
    })
};

export const resetPassword = async(userId, newPassword) => {
  const newHashedPassword = await bcrypt.hash(newPassword, 10);
  return User.findOne({_id: userId})
    .then((userObj)=>{
      userObj.password = newHashedPassword
      userObj.__v = userObj.__v+1;
      return User.findOneAndUpdate(
        {
          _id: userObj._id
        },
        userObj,
        {
          new: true
        }
      )
    })
    .catch(() => {
      throw new Error('Unathorized request')
    })
}