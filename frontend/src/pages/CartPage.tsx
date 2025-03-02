import { Box, Container, Typography } from "@mui/material";
import {useState } from "react";
import { useCart } from "../context/Cart/CartContext";

const CartPage=()=>{
    const [err,setError]=useState(false);
    const {cartItems}=useCart();

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