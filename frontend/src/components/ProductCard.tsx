import { Button, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import { useCart } from "../context/Cart/CartContext";

interface Props{
    _id:string;
    title:string;
    price:string;
    image:string;
}
export default function ProductCard({_id,title,image,price}:Props){
    const {addItemToCart}=useCart();
    return(
        <Card>
            <CardMedia sx={{height:200}} image={image} title="green iguana"></CardMedia>
            <CardContent>
                <Typography variant="h5" gutterBottom component="div">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {price}$
                </Typography>
            </CardContent>
            <CardActions>
                <Button size='small' variant='contained' onClick={()=>addItemToCart(_id)}>
                    Add to Cart
                </Button>
            </CardActions>
        </Card>
    )
}