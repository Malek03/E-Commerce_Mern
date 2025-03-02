import { createContext ,useContext} from "react";
import { CartItem } from "../../types/CartItem";


interface CartContextType{
    cartItems:CartItem[];
    totalAmount:number;
    addItemToCart:(productId:string)=>void;
    updateItemCart:(productId:string,quantity:number)=>void;
    deleteItemCart:(productId:string)=>void;
}

export const CartContext=createContext<CartContextType>({
    cartItems:[],
    totalAmount:0,
    addItemToCart:()=>{},
    updateItemCart:()=>{},
    deleteItemCart:()=>{}
});

export const useCart=()=>useContext(CartContext);
