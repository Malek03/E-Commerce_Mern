import { Box, ButtonGroup,Button, Container, Typography } from "@mui/material";
import { useCart } from "../context/Cart/CartContext";

const CartPage=()=>{
    const {cartItems,totalAmount}=useCart();
    return(
        <Container  sx={{mt:2}}>
            <Typography variant="h4">My Cart</Typography>
                <Box display='flex' flexDirection="column" gap={4}>
                {cartItems.map((items)=>(
                <Box display='flex' justifyContent='space-between' flexDirection='row' alignItems='center' sx={{border:1,borderColor:'#f2f2f2',borderRadius:5,padding:1}}>
                    <Box display='flex' flexDirection='row' alignItems='center' gap={1}>
                    <img src={items.productImage} width={50} height={50}/>
                    <Box>
                    <Typography variant="h6">{items.title}</Typography>
                    <Typography>{items.quantity}X{items.price}$</Typography>
                    <Button>Remove Item</Button>
                    </Box>
                    </Box>
                    <ButtonGroup variant="contained" >
                        <Button >+</Button>
                        <Button >-</Button>
                    </ButtonGroup>
                </Box>
            ))}
            <Box>
                <Typography variant="h4">Total Amount:{totalAmount}</Typography>
                </Box>
            </Box>
        </Container>
    )
}

export default CartPage;