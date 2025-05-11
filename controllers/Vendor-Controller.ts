import { EditVendorInputs, VendorLoginInputs } from "../dto";
import { GenerateSignature, ValidatePassword } from "../utility";
import { FindVendor } from "./Admin-Controller";

import { Request, Response, NextFunction } from "express";

export const VendorsLogin = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { email, password } = <VendorLoginInputs>req.body;


try{
    const existingVendor = await FindVendor("", email);
	if (existingVendor !== null) {
		const validation = await ValidatePassword(
			password,
			existingVendor.password,
			existingVendor.salt
		); 
		if (validation) {
			const signature = GenerateSignature({
				_id: existingVendor.id,
				email: existingVendor.email,
				name: existingVendor.name,
				foodType: existingVendor.foodType,
			})
			 res.json({ signature });
		}
	} 
    res.status(400).json({ message: "Invalid email or password" });
}catch(error){
next(error)
}
};



export const GetVendorProfile = async(req:Request, res:Response, next:NextFunction)=>{
	const user = req.user
	if(user){
		const existingVendor = await FindVendor(user._id);
		 res.json(existingVendor);
	} else {
		 res.status(400).json({ message: "Vendor not found" });
	}
	
}

export const UpdateVendorProfile = async(req:Request, res:Response, next:NextFunction)=>{	
	const {foodType,name,address, phone} = <EditVendorInputs> req.body
	const user = req.user
	if(user){
		console.log("user Found", user)
		const existingVendor = await FindVendor(user._id);
		if(existingVendor !== null){
			existingVendor.name = name;
			existingVendor.foodType = foodType;
			existingVendor.address = address;
			existingVendor.phone = phone; 
			

	 const savedResult = await existingVendor.save()
	 res.json(savedResult)
		}
	} else {
		 res.status(400).json({ message: "Vendor not found" });
	}
	
}


export const UpdateVendorService = async(req:Request, res:Response, next:NextFunction)=>{	
	console.log("...updatubg started")

	const user = req.user
	if(user){
	
		const existingVendor = await FindVendor(user._id);
		console.log("user Found", existingVendor)
		if(existingVendor !== null){
		existingVendor.serviceAvailable = (!existingVendor.serviceAvailable)
		const savedResult = await existingVendor.save()
		res.json(savedResult)
		}
	} else {
		 res.status(400).json({ message: "Vendor not found" });
	}
}