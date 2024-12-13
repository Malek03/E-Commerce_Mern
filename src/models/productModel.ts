import mongoose ,{Document,Schema} from "mongoose";

export interface IProduct extends Document{
    title:string;
    image:string;
    price:string;
    stock:number;
};

const productShema =new Schema<IProduct>({
    title:{type:String,required:true},
    image:{type:String,required:true},
    price:{type:String,required:true},
    stock:{type:Number,required:true,default:0},
});

const productModel=mongoose.model<IProduct>('Product',productShema);
export default productModel;