import { Request,Response,NextFunction } from "express";
import { CreatevendorInputs } from "../dto";
import { vendor } from "../models";
import { GeneratePassword, GenerateSalt } from "../utility";

export const Createvendor = async (req:Request,res:Response,  next:NextFunction)=>{
const {name, address, pinCode, foodType, email, password,ownerName,phone} = <CreatevendorInputs> req.body

const existingVendor = await vendor.findOne({email:email})
if(!existingVendor ){
    const salt = await GenerateSalt();
    const userPassword = await GeneratePassword(password,salt)
const createVendor = await vendor.create({
    name: name,
    address: address,
    pinCode: pinCode,
    foodType: foodType,
    email:email,
    password: userPassword,
    salt: salt,
    ownerName: ownerName,
    phone:phone,
    rating: 0,
    serviceAvailable:false,
    coverImages: [],

    
})
res.status(200).json({message: "vendor created successfully"})
}else{
  res.status(400).json({message:'email already existed'})  
}

}

export const GetVendor = async (req:Request,res:Response,  next:NextFunction)=>{}


export const GetVendorById = async (req:Request,res:Response,  next:NextFunction)=>{}
