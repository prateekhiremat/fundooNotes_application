import dotenv from 'dotenv';
dotenv.config();

import jwt from 'jsonwebtoken'
const secretKey = process.env.SECRET_KEY;

export function generateToken(userId){
    const payload = {
        _id: userId
    }
    return jwt.sign(payload,secretKey);
}