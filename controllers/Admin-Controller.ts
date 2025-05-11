import { Request, Response, NextFunction } from "express";
import { CreatevendorInputs } from "../dto";
import { vendor } from "../models";
import { GeneratePassword, GenerateSalt } from "../utility";

export const FindVendor = async (id: string | undefined, email?: string) => {
	if (email) {
		return await vendor.findOne({ email: email });
	} else {
		return await vendor.findById(id);
	}
};

export const Createvendor = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const {
		name,
		address,
		pinCode,
		foodType,
		email,
		password,
		ownerName,
		phone,
	} = <CreatevendorInputs>req.body;

	const existingVendor = await FindVendor(undefined, email);
	if (!existingVendor) {
		const salt = await GenerateSalt();
		const userPassword = await GeneratePassword(password, salt);
		const createVendor = await vendor.create({
			name: name,
			address: address,
			pinCode: pinCode,
			foodType: foodType,
			email: email,
			password: userPassword,
			salt: salt,
			ownerName: ownerName,
			phone: phone,
			rating: 0,
			serviceAvailable: false,
			coverImages: [],
			foods:[]
		});
		res.status(200).json({ message: "vendor created successfully" });
	} else {
		res.status(400).json({ message: "email already existed" });
	}
};

export const GetVendor = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const Vendor = await vendor.find();
		if (Vendor !== null) {
			// res.status(200).json({ message: "Vendors fetched successfully" });
			res.json(Vendor);
		}
	} catch (error) {
		next(error);
	}
};

export const GetVendorById = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const vendorId = req.params.id;
		const Vendor = await FindVendor(vendorId);
		if (Vendor !== null) {
			res.status(200).json(Vendor);
		}
		res.status(400).json({ message: "can't fetch vendor" });
	} catch (error) {
		res.status(400).json({ message: "vendor not found" });
	}
};
