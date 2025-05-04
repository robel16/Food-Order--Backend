import express,{Request, Response,NextFunction,} from "express"
import { VendorsLogin } from "../controllers"



const router = express.Router() 
router.post("/login",async (req:Request, res:Response, next:NextFunction)=>{
    try{
        await VendorsLogin(req,res,next)
    }catch(error){
        next(error)
    }
})


router.get('/',(req:Request, res:Response, next:NextFunction)=>{
    res.status(200).json({message:'hello from Vendor '})
})

export {router as VendorRoute }