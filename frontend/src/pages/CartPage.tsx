import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { BASE_URL } from "../constants/baseUrl";
import { useAuth } from "../context/Auth/AuthContext";

const CartPage=()=>{
    const {token}=useAuth();
    const [cart,setCart]=useState();
    const [err,setError]=useState(false);
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
                setCart(data);
            }catch{
                setError(true);
            }
        }
        fetched();
    },[token]);
    if(err){
        return (
            <Box>
                Failed to fetch user.Please try again
            </Box>
        )
    }
    return(
        <Container sx={{mt:2}}>
            <Typography variant="h4">My Cart</Typography>
        </Container>
    )
}

export default CartPage;