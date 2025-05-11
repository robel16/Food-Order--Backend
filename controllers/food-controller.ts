import { Food } from "../models";

export const getFoodById = async(id: string |undefined)=>{
    if(id){
        return await Food.findById(id)
    }else{
      return false
    } 
}
