import { Box,Button, Container, TextField, Typography } from "@mui/material";
import { useCart } from "../context/Cart/CartContext";
import { useRef } from "react";

const CheckoutPage=()=>{
    const {cartItems,totalAmount}=useCart();
    const addressRef=useRef<HTMLInputElement>(null);
    return(
        <Container fixed sx={{mt:2, display:'flex', flexDirection:'column', gap:1}}>
            <Box  display='flex' flexDirection="row" justifyContent='space-between'>
            <Typography variant="h4">Check out</Typography>
            </Box>
            <TextField inputRef={addressRef} label="Delivery Address" name="address" fullWidth></TextField>
                <Box display='flex' flexDirection="column" gap={1} sx={{border:1,borderColor:'#f2f2f2',borderRadius:5,padding:1}}>
                {cartItems.map((items)=>(
                <Box display='flex' justifyContent='space-between' flexDirection='row' alignItems='center' >
                    <Box display='flex' flexDirection='row' alignItems='center' gap={1}>
                    <img src={items.productImage} width={50} height={50}/>
                    <Box>
                    <Typography variant="h6">{items.title}</Typography>
                    </Box>
                    </Box>
                    <Typography>{items.quantity}X{items.price}$</Typography>
                </Box>
            ))}
                <Typography variant="body2" sx={{textAlign:"right" }}>Total Amount:{totalAmount}$</Typography>
            </Box>
            <Button variant="contained" fullWidth>Pay Now</Button>
        </Container>
    )
}

export default CheckoutPage;
