import express,{Request, Response,NextFunction,} from "express"
import { GetVendorProfile, UpdateVendorProfile, UpdateVendorService, VendorsLogin } from "../controllers"
import { Authenticate } from "../middlewares"

const router = express.Router() 


router.post("/login",VendorsLogin)

router.get('/profile', Authenticate, GetVendorProfile);
router.patch('/profile', Authenticate, UpdateVendorProfile)
router.patch('/service', Authenticate, UpdateVendorService)



router.get('/',(req:Request, res:Response, next:NextFunction)=>{
    res.status(200).json({message:'hello from Vendor '})
})

export {router as VendorRoute }