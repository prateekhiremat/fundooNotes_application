import dotenv from 'dotenv';
dotenv.config();

import jwt from 'jsonwebtoken'
const secretKey = process.env.SECRET_KEY;

export function setUser(user){
    const payload = {
        _id: user.id,
        email: user.email
    }
    return jwt.sign(payload,secretKey);
}