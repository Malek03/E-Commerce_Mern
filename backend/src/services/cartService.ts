import cartModel from "../models/cartModel";
import { IOrderItem, orderModel } from "../models/orderModel";
import productModel from "../models/productModel";

    interface CreateCartForUser {
    userId: string;
    }
    const createCartForUser = async ({ userId }: CreateCartForUser) => {
    const cart = await cartModel.create({ userId });
    await cart.save();
    return cart;
    };

    interface GetActiveCartForUser {
    userId: string;
    populateProduct?:boolean;
    }
    export const getActiveCartForUser = async ({
    userId,
    populateProduct
    }: GetActiveCartForUser) => {
    let cart;
    if(populateProduct){
        cart= await cartModel.findOne({ userId, status: "active" }).populate('items.product');
    }else{
        cart= await cartModel.findOne({ userId, status: "active" });
    }
    if (!cart) {
        cart = await createCartForUser({ userId });
    }
    return cart;
    };

    interface AddItemToCart {
    productId: any;
    quantity: number;
    userId: string;
    }

    export const additemToCart = async ({
    productId,
    quantity,
    userId,
    }: AddItemToCart) => {
    const cart = await getActiveCartForUser({ userId});
    const existsInCart = cart.items.find((p) => p.product.toString() === productId);
    if (existsInCart) {
        return { data: "Item aleardy exists in cart!", statusCode: 400 };
    }
    const product = await productModel.findById(productId);
    if (!product) {
        return { data: "Product not found!", statusCode: 400 };
    }
    if(product.stock < quantity){
        return { data: "Low Stock For Item!", statusCode: 400 };
    }
    cart.items.push({
        product: productId,
        unitPrice: product.price,
        quantity
    });
    cart.totalAmount += product.price * quantity;
    product.save();
    await cart.save();
    return { data:await getActiveCartForUser({userId,populateProduct:true}), statusCode: 200 };
    }

//كررنا البيانات عشان اذا احتجنا تعديل بيانات التحديث فقط
interface UpdateItemToCart {
        productId: any;
        quantity: number;
        userId: string;
        }


export const updateitemInCart=async({productId,
    quantity,
    userId,
    }: UpdateItemToCart)=>{
        const cart = await getActiveCartForUser({ userId });
        const existsInCart = cart.items.find((p) => p.product.toString() === productId);
        if (!existsInCart) {
            return { data: "Item dose not exists in cart!", statusCode: 400 };
        }
        const product = await productModel.findById(productId);
        if (!product) {
            return { data: "Product not found!", statusCode: 400 };
        }
        if(product.stock < quantity){
            return { data: "Low Stock For Item!", statusCode: 400 };
        }
        const otherCartlItems=cart.items.filter((p)=>p.product.toString() !== productId)
        let total=otherCartlItems.reduce((sum,product)=>{
            sum +=product.quantity*product.unitPrice;
            return sum;
        },0);
    existsInCart.quantity=quantity;
    total+=existsInCart.quantity*existsInCart.unitPrice;
    cart.totalAmount=total;
    await cart.save();
    return { data:await getActiveCartForUser({userId,populateProduct:true}), statusCode: 200 };
}


interface RemoveItemToCart {
    productId: any;
    userId: string;
    }



export const removeitemInCart=async({productId,
    userId,
    }: RemoveItemToCart)=>{
        const cart = await getActiveCartForUser({ userId });
        const existsInCart = cart.items.find((p) => p.product.toString() === productId);
        if (!existsInCart) {
            return { data: "Item dose not exists in cart!", statusCode: 400 };
        }
        const otherCartlItems=cart.items.filter((p)=>p.product.toString() !== productId)
        cart.items=otherCartlItems;
        cart.totalAmount = otherCartlItems.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
        await cart.save();
        return { data:await getActiveCartForUser({userId,populateProduct:true}), statusCode: 200 };
    }



interface ClearCart{
    userId:string;
}
export const clearCart=async(
    {userId}:ClearCart)=>{
        const cart = await getActiveCartForUser({ userId });
        cart.items=[]
        cart.totalAmount=0;
        await cart.save();
        return { data:await getActiveCartForUser({userId,populateProduct:true}), statusCode: 200 };
    }

interface Checkout{
    userId:string;
    address:string;
}
export const checkout=async({userId,address}:Checkout)=>{
    if(!address){
        return { data:"Please Add Your Address" , statusCode:400}
    }
    const cart=await getActiveCartForUser({userId});
    const orderItems:IOrderItem[]=[]
    // Loop Cart and Create orderItem
    for(const item of cart.items){
        const product=await productModel.findById(item.product);
        if(!product){
            return {data:"Product not found",statusCode:400}
        }
            const orderItem:IOrderItem={
                productTitle:product.title,
                productImage:product.image,
                quantity:item.quantity,
                unitrice:item.unitPrice
            }
            orderItems.push(orderItem)
    }
    const order=await orderModel.create({
        orderItems,
        total:cart.totalAmount,
        address:address,
        userId
    });
    await order.save();
    cart.status="completed";
    await cart.save();
    return {data:order,statusCode:200};
}
