import express,{Request, Response,NextFunction,} from "express"
import { AddFood, GetFoodById, GetFoods, GetVendorProfile, UpdateVendorProfile, UpdateVendorService, UpdateVendorCoverImage,VendorsLogin } from "../controllers"
import { Authenticate } from "../middlewares"
import multer from "multer"
import path from "path"
import fs from "fs"
const router = express.Router() 

const imageDir= path.join(__dirname, '..', 'images')
if(!fs.existsSync(imageDir)){
    try{
fs.mkdirSync(imageDir,)
console.log('images directory created')
    }catch(err){
        console.log('error creating images directory')
    }

}

const imageStorage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, imageDir)
    },
    filename: function(req, file, cb){
        const safeDate = new Date().toISOString().replace(/[:.]/g, '-');
        cb(null, `${safeDate}_${file.originalname}`);
    }
});

const images = multer({storage: imageStorage}).array('images',10)
router.post("/login",VendorsLogin)

router.get('/profile', Authenticate, GetVendorProfile);
router.patch('/profile', Authenticate, UpdateVendorProfile)
router.patch('/coverimage',Authenticate, images,UpdateVendorCoverImage)
router.patch('/service', Authenticate, UpdateVendorService)



router.post('/food',Authenticate, images,AddFood)
router.get('/foods',Authenticate,GetFoods)
router.get('/food/:id',GetFoodById)

router.get('/',(req:Request, res:Response, next:NextFunction)=>{
    res.status(200).json({message:'hello from Vendor '})
})

export {router as VendorRoute }