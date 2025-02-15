import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { BASE_URL } from "../constants/baseUrl";
import { useAuth } from "../context/Auth/AuthContext";
import { useCart } from "../context/Cart/CartContext";

const CartPage=()=>{
    const {token}=useAuth();
    const [err,setError]=useState(false);
    const {cartItems,totalAmount}=useCart();
    // useEffect(()=>{
    //     if(!token){
    //         return;
    //     }
    //     const fetched=async()=>{
    //         try{
    //             const response=await fetch(`${BASE_URL}/cart`,{
    //                 headers:{
    //                     'Authorization':`Bearer ${token}`
    //                 }
    //             });
    //             const data=await response.json();
    //             setCart(data);
    //         }catch{
    //             setError(true);
    //         }
    //     }
    //     fetched();
    // },[token]);
    if(err){
        return (
            <Box>
                Failed to fetch user.Please try again
            </Box>
        )
    }

    return(
        <Container sx={{mt:2}}>
            <Typography variant="h4">
                {cartItems.map((items)=>(
                <Box>{items.title}</Box>
            ))}</Typography>
        </Container>
    )
}

export default CartPage;