import { CheckCircleOutline } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";

const OrderSuccessPage=()=>{
    const navigate=useNavigate();
    const handleBackHome=()=>{
        navigate('/');
    }
    return(
        <Container fixed  sx={{mt:2, display:'flex', flexDirection:'column',alignItems:'center',justifyContent:'center', gap:1}}>
            <CheckCircleOutline sx={{color:"green",fontSize:'80px'}}></CheckCircleOutline>
            <Typography variant="h4">Thanks for your order</Typography>
            <Typography>We Started processing it,and we will get back to you soooon ^__*</Typography>
            <Button variant="contained" onClick={handleBackHome}>Back Home</Button>
        </Container>
    )
}
export default OrderSuccessPage;