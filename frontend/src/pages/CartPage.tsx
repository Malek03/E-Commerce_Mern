import { Box, ButtonGroup,Button, Container, Typography } from "@mui/material";
import { useCart } from "../context/Cart/CartContext";
import { useState } from "react";

const CartPage=()=>{
    const {cartItems,totalAmount,updateItemCart,deleteItemCart,deleteAll}=useCart();
    const [empty,setEmpty]=useState<boolean>(true);
    const handleQuantity=(productId:string,quantity:number)=>{
        if(quantity<=0)
            return;
        updateItemCart(productId,quantity);
        setEmpty(true);
    }
    const removeItem=(productId:string)=>{
        deleteItemCart(productId);
        setEmpty(true);
    }
    const removeAllItem=()=>{
        deleteAll();
        setEmpty(false);
    }
    return(
        <Container fixed sx={{mt:2}}>
            <Box  display='flex' flexDirection="row" justifyContent='space-between'>
            <Typography variant="h4">My Cart</Typography>
            {
                empty?<Button onClick={removeAllItem} variant="contained" sx={{mb:3}}>Clear React</Button>:<Button></Button>
            }
            </Box>
            {cartItems.length?
                <Box display='flex' flexDirection="column" gap={4}>
                {cartItems.map((items)=>(
                <Box display='flex' justifyContent='space-between' flexDirection='row' alignItems='center' sx={{border:1,borderColor:'#f2f2f2',borderRadius:5,padding:1}}>
                    <Box display='flex' flexDirection='row' alignItems='center' gap={1}>
                    <img src={items.productImage} width={50} height={50}/>
                    <Box>
                    <Typography variant="h6">{items.title}</Typography>
                    <Typography>{items.quantity}X{items.price}$</Typography>
                    <Button onClick={()=>removeItem(items.productId)}>Remove Item</Button>
                    </Box>
                    </Box>
                    <ButtonGroup variant="contained" >
                        <Button onClick={()=>handleQuantity(items.productId,items.quantity+1)}>+</Button>
                        <Button onClick={()=>handleQuantity(items.productId,items.quantity-1)}>-</Button>
                    </ButtonGroup>
                </Box>
            ))}
            <Box>
                <Typography variant="h4">Total Amount:{totalAmount}$</Typography>
                </Box>
            </Box>:<Typography variant="h4">Cart is Empty Please Start To Shopping</Typography>
            }
        </Container>
    )
}

export default CartPage;