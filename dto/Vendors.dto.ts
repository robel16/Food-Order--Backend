export interface CreatevendorInputs{
    name: string;
    ownerName: string;
    foodType: [string];
    pinCode: string;
    address: string;
    phone: string;
    email: string;
    password: string;
}

export interface EditVendorInputs{
    name: string;
    address: string;
    phone:string;
    foodType: [string];
}


export interface VendorLoginInputs {
    email: string;
    password: string;
}



export interface VendorPayload{
    _id: string;
    email: string;
    name: string;
    foodType: [string];
}