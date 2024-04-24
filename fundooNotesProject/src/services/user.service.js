import User from '../models/user.model';
import bcrypt from 'bcrypt';

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
          if(result)
            resolve(userObj);
          else
            reject(new Error('Invalid password'))
        })
      })
    })
};

export const updateUser = async(_id, body) => {
  delete body.email;
  return User.findOneAndUpdate(
    {
      _id
    },
    body,
    {
      runValidators : false,
      new : true
    }
  ).then((result)=>{
    return result;
  })
};

export const deleteUser = async(_id) => {
  await User.findByIdAndDelete(_id)
  return '';
}