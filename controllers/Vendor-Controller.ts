import { VendorLoginInputs } from "../dto";
import { ValidatePassword } from "../utility";
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
			return res.json({ existingVendor });
		}
	} 
    res.status(400).json({ message: "Invalid email or password" });
}catch(error){
next(error)
}
};
