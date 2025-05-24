import { EditVendorInputs, VendorLoginInputs } from "../dto";
import { CreateFoodInput } from "../dto/food.dto";
import { Food } from "../models";
import { GenerateSignature, ValidatePassword } from "../utility";
import { FindVendor } from "./Admin-Controller";

import { Request, Response, NextFunction } from "express";
import { getFoodById, } from "./food-controller";

export const VendorsLogin = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { email, password } = <VendorLoginInputs>req.body;


try{
    const existingVendor = await FindVendor("", email);
	console.log('existing user', existingVendor)
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
			console.log("this is the signature", signature)
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

export const UpdateVendorCoverImage = async(
	req: Request,
	res: Response,
	next: NextFunction)=>{

  const user = req.user
if(user){
	const vendor = await FindVendor(user._id)
	if(vendor !== null){
		const files = req.files as  Express.Multer.File [] || []
	  if(!Array.isArray(files) || files.length === 0){
		res.status(400).json({message: "No files to upload"})
	  } ;
		const images = files.map((file:Express.Multer.File)=> file.filename);
		vendor.coverImages.push(...images);
		const result = await vendor.save()
	 console.log("result:", result)
	res.json(result)
	}
}
 res.status(400).json({"message": "something went wrong"})
}




export const AddFood = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  console.log('...creating food');

  // Check if user is authenticated
  const user = req.user;
  if (!user) {
    res.status(401).json({ message: 'Unauthorized: User not authenticated' });
    return;
  }

  try {
    const { name, description, category, foodType, readyTime, price } = <CreateFoodInput>req.body;

    const vendor = await FindVendor(user._id);
    if (vendor !== null) {

const files = req.files as [Express.Multer.File]
const images = files.map((files:Express.Multer.File)=>files.filename)

        const createdFood = await Food.create({
      vendorId: vendor._id,
      name,
      description,
      category,
      foodType,
      images:images,
      readyTime,
      price,
      rating: 0,
    });

    // Add food to vendor's foods array and save
    vendor.foods.push(createdFood);
    const result = await vendor.save();
console.log('food result', result)
    // Send success response
    res.json(result);
    }
  } catch (error) {
    console.error('Error adding food:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


export const GetFoodById = async(req:Request, res:Response, next:NextFunction)=>{
try{
	const foodId= req.params.id
	console.log("fetched the foodid",foodId)
	const food = await getFoodById(foodId)
	if(!food){
		res.status(400).json({message:"food not found"})
	}else{
		res.status(200).json(food)
	}
}catch(error){
	console.log("error when finding the food", error)
	res.status(500).json({message: 'internal serer error'})
}
}

export const GetFoods = async (req:Request, res:Response, next:NextFunction)=>{
	const user = req.user;
	if (!user) {
	  res.status(401).json({ message: 'Unauthorized: User not authenticated' });
	  return;
	}
const food = await Food.find({vendorId:user._id})
if(food!==null){
	res.status(200).json(food)
	return
} 
res.json({message:"food not found"})
}