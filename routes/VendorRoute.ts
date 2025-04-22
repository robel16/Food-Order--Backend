import express,{Request, Response,NextFunction} from "express"

const router = express.Router()
router.get('/',(req:Request, res:Response, next:NextFunction)=>{
    res.send(200).json({message:'hello from Vendor '})
})

export {router as VendorRoute }