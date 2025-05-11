import express,{Request, Response,NextFunction,} from "express"
import { AddFood, GetFoodById, GetFoods, GetVendorProfile, UpdateVendorProfile, UpdateVendorService, VendorsLogin } from "../controllers"
import { Authenticate } from "../middlewares"

const router = express.Router() 


router.post("/login",VendorsLogin)

router.get('/profile', Authenticate, GetVendorProfile);
router.patch('/profile', Authenticate, UpdateVendorProfile)
router.patch('/service', Authenticate, UpdateVendorService)



router.post('/food',Authenticate, AddFood)
router.get('/foods',Authenticate,GetFoods)
router.get('/food/:id',GetFoodById)

router.get('/',(req:Request, res:Response, next:NextFunction)=>{
    res.status(200).json({message:'hello from Vendor '})
})

export {router as VendorRoute }