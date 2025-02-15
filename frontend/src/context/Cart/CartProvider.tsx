import { PropsWithChildren ,FC, useState} from "react";
import {CartContext} from "./CartContext"
import { CartItem } from "../../types/CartItem";

const CartProvider: FC<PropsWithChildren>=({children})=>{
    const [cartItems,setCartItems]=useState<CartItem[]>([]);
    const [totalAmount,setTotalAmount]=useState<number>(0);

    const addItemToCart=(productId:string)=>{
        console.log(productId);
        setCartItems();
        setTotalAmount();
    }
    return(
        <CartContext.Provider value={{cartItems,totalAmount,addItemToCart}}>
            {children}
        </CartContext.Provider>
    );
}
export default CartProvider;