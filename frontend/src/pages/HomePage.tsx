import { useState,useEffect } from "react";
import { Product } from "../types/product";
import { BASE_URL } from "../constants/baseUrl";
import Box from "@mui/material/Box";
import { Container, Grid } from "@mui/material";
import ProductCard from "../components/ProductCard";

const HomePage=()=>{
    const [products,setProducts]=useState<Product[]>([]);
    const [error,setError]=useState(false);
    useEffect(()=>{
        const fetchData=async()=>{
            try{
                const response=await fetch(`${BASE_URL}/product`);
                const data=await response.json();
                setProducts(data)
            }catch{
                setError(true);
            }
        }
        fetchData()
    },[]);
    if(error){
        return <Box>Something went Wrong, Please try again!</Box>
    }
    return(
        <Container sx={{mt:2}}>
            <Grid container spacing={2}>
                {
                    products.map((p)=>(
                        <Grid item md={4} key={p._id}>
                            <ProductCard {...p}/>
                        </Grid>
                    ))
                }
            </Grid>
        </Container>
    );
}
export default HomePage;