import mongoose, {Schema,Document} from "mongoose";


interface FoodDoc extends Document{
    vendorId: string;
    name:string;
    description:string;
    category:string;
    foodType:string;
    readyTime:number;
    price:number;
    rating: number;
    images:[string]; 
}


const FoodSchema= new Schema({
    vendorId: {type: String},
    name:{type:String, required:true},
    description:{type:String, required:true},
    category:{type:String},
    foodType:{type:String, required:true},
    readyTime:{type:Number},
    price:{type:Number, required:true},
    rating:{type:Number},
    images:{type:[String]}
},{
    toJSON:{
        transform(doc,ret){
            delete ret.password;
            delete ret.createdAt;
            delete ret.updatedAt
        }
    },
    timestamps: true
})

const Food = mongoose.model<FoodDoc>('food',FoodSchema)

export {Food};