import mongoose,{Document,ObjectId,Schema} from "mongoose";
import { IProduct } from "./productModel";


const CartStatusEnum=["active" , "completed"];
export interface ICartItem extends Document{
    product:IProduct;
    unitPrice:number;
    quantity:number;
}
export interface ICart extends Document{
    userId:ObjectId | string;
    items:ICartItem[];
    totalAmount:number;
    status:"active" | "completed";
}

const cartItemSchema=new Schema<ICartItem>({
    product:{type:Schema.Types.ObjectId,ref:"Product",required:true},
    unitPrice:{type:Number,required:true,default:1},
    quantity:{type:Number,required:true}
});


const cartSchema=new Schema<ICart>({
    userId:{type:Schema.Types.ObjectId,ref:"User",required:true},
    items:[cartItemSchema],
    totalAmount:{type:Number,required:true},
    status:{type:String,enum:CartStatusEnum,default:"active"}
});


const cartModel=mongoose.model<ICart>('Cart',cartSchema);

export default cartModel;