import express,{Request, Response,NextFunction} from "express"
import { Createvendor, GetVendor, GetVendorById } from "../controllers/"
const router = express.Router()

router.post('/vendor', Createvendor)
router.get('/vendors', GetVendor)
router.get('/vendor/:id', GetVendorById)


router.get('/',(req:Request, res:Response, next:NextFunction)=>{
    res.json({message:'hello from admin'})
})

export {router as AdminRoute }