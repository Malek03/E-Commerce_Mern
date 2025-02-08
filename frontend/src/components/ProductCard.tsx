import { Button, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import Card from "@mui/material/Card";

interface Props{
    _id:string;
    title:string;
    price:string;
    image:string;
}
export default function ProductCard({title,image,price}:Props){
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
                <Button size='small' variant='contained'>
                    Add to Cart
                </Button>
            </CardActions>
        </Card>
    )
}