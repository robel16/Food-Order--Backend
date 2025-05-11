import { Request, Response,NextFunction } from "express"
import { AuthPayload } from "../dto/auth.dto"
import { VerifySignature } from "../utility"

declare global{
    namespace Express{
        interface Request{
            user?:AuthPayload
        }
    }
}


export const Authenticate = async(req:Request, res:Response, next:NextFunction)=>{
    const validate = await VerifySignature(req)

    if(validate){
        next()
    }else{
         res.status(400).json({message:" user not authorized"})
    }
}