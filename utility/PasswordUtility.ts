import bcrypt from 'bcrypt';
import { VendorPayload } from '../dto';
import { Request } from 'express';

import jwt from 'jsonwebtoken'; 
import { APP_SECRET } from '../config';
import { AuthPayload } from '../dto/auth.dto';
export const GenerateSalt= async ()=>{
    return await bcrypt.genSalt()
}

export const GeneratePassword =  async (password: string,salt:string)=>{
    return await bcrypt.hash(password,salt)
}

export const ValidatePassword =  async (enteredPassword: string, savedpassword: string, salt: string)=>{
    return await GeneratePassword(enteredPassword, salt)=== savedpassword
}


export const GenerateSignature = (payload: VendorPayload)=>{
    return  jwt.sign(payload,APP_SECRET,{expiresIn: "1d"})
    
}


export const VerifySignature = async(req:Request)=>{
    const signature = req.get("Authorization")
if(signature){
    const payload = await jwt.verify(signature.split(' ')[1], APP_SECRET) as AuthPayload

    req.user = payload;
    return true
}



}