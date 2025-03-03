import { PropsWithChildren ,FC, useState,useEffect} from "react";
import {CartContext} from "./CartContext"
import { CartItem } from "../../types/CartItem";
import { BASE_URL } from "../../constants/baseUrl";
import { useAuth } from "../Auth/AuthContext";

const CartProvider: FC<PropsWithChildren>=({children})=>{
    const [cartItems,setCartItems]=useState<CartItem[]>([]);
    const [totalAmount,setTotalAmount]=useState<number>(0);
    const [error,setError]=useState('');
    const {token}=useAuth();
    useEffect(()=>{
        if(!token){
            return;
        }
        const fetched=async()=>{
            try{
                const response=await fetch(`${BASE_URL}/cart`,{
                    headers:{
                        'Authorization':`Bearer ${token}`
                    }
                });
                const data=await response.json();
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const cartItemsMappded=data.items.map(({product,quantity,unitPrice}:{product:any,quantity:any,unitPrice:number})=>(
                    {productId:product._id,
                    title:product.title,
                    price:unitPrice,
                    productImage:product.image,
                    quantity:quantity}))
                setCartItems(cartItemsMappded);
                setTotalAmount(data.totalAmount);
            }catch{
                setError('Failed to add to cart');
            }
        }
        fetched();
    },[token]);
    const addItemToCart=async(productId:string)=>{
        try{
            const response=await fetch(`${BASE_URL}/cart/items`,{
                method:"POST",
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${token}`
                },
                body:JSON.stringify({
                    productId,
                    quantity:1
                })
            })
            if(!response.ok){
                setError('Failed to add to cart');
            }
            const cart=await response.json();
            if(!cart){
                setError('Failde to Parse cart data')
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const cartItemsMappded=cart.items.map(({product,quantity,unitPrice}:{product:any,quantity:number,unitPrice:number})=>(
                {
                productId:product._id,
                title:product.title,
                price:unitPrice,
                productImage:product.image,
                quantity:quantity}))
            setCartItems(cartItemsMappded);
            setTotalAmount(cart.totalAmount);
        }catch{
            console.error(error);
        }
    };
    const updateItemCart=async(productId:string,quantity:number)=>{
        try{
            const response=await fetch(`${BASE_URL}/cart/items`,{
                method:"PUT",
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${token}`
                },
                body:JSON.stringify({
                    productId,
                    quantity
                })
            });
            if(!response.ok){
                setError("Faild To Update Data !!");
            }
            const cart=await response.json();
            if(!cart){
                setError("Faild To Parse Data !!")
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const cartItemsMapped=cart.items.map(({product,quantity,unitPrice}:{product:any,quantity:number,unitPrice:number})=>({
                productId:product._id,
                title:product.title,
                price:unitPrice,
                productImage:product.image,
                quantity:quantity
            }));
            setCartItems([...cartItemsMapped]);
            setTotalAmount(cart.totalAmount);
        }catch{
            console.error(error);
        }
    }
    const deleteItemCart=async(productId:string)=>{
        try{
            const response=await fetch(`${BASE_URL}/cart/items/${productId}`,{
                method:"DELETE",
                headers:{
                    'Authorization':`Bearer ${token}`
                }
            });
            if(!response){
                setError("Faild To Delete Data !!");
            }
            const cart=await response.json();
            if(!cart){
                setError("Faild To Parse Data !!")
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const cartItemsMapped=cart.items.map(({product,quantity,unitPrice}:{product:any,quantity:number,unitPrice:number})=>({
                productId:product._id,
                title:product.title,
                price:unitPrice,
                productImage:product.image,
                quantity:quantity
            }));
            setCartItems([...cartItemsMapped]);
            setTotalAmount(cart.totalAmount);
        }catch{
            console.error(error)
    }

    }
    const deleteAll=async()=>{
        try{
            const response=await fetch(`${BASE_URL}/cart`,{
                method:"DELETE",
                headers:{
                    'Authorization':`Bearer ${token}`
                }
            });
            if(!response){
                setError("Faild To Delete Data !!");
            }
            const cart=await response.json();
            if(!cart){
                setError("Faild To Parse Data !!")
            }
            setCartItems([]);
            setTotalAmount(0);
        }catch{
            console.error(error)
    }
    }
    return(
        <CartContext.Provider value={{cartItems,totalAmount,addItemToCart,updateItemCart,deleteItemCart,deleteAll}}>
            {children}
        </CartContext.Provider>
    );
}
export default CartProvider;

