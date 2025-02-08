import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useRef, useState } from "react";
import { BASE_URL } from "../constants/baseUrl";
import { useAuth } from "../context/Auth/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage=()=>{
    const [err,setErr]=useState('');
    const [done,setdone]=useState('');
    const emailRef=useRef<HTMLInputElement>(null);
    const passwordRef=useRef<HTMLInputElement>(null);
    const navigate=useNavigate();
    const {login} = useAuth();

    const onSubmit= async()=>{
        const email=emailRef.current?.value;
        const password=passwordRef.current?.value;
        if(!email || !password){
            setErr(`One of the Password or Email is Empty`)
            return;
        }
        const response=await fetch(`${BASE_URL}/user/login`,{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email,
                password
            })
        });
        if(!response.ok){
            setErr('Incorrect email or password!');
            return;
        }
        const token=await response.json();
        if(!token){
            setErr("Incorrect token");
            return;
        }
        login(email,token);
        navigate('/');
        setdone('Incorrect email or password!');
    }
    return(
        <Container>
            <Box sx={{ display: "flex", justifyContent: 'center', flexDirection: 'column', alignItems: 'center', mt: 4}}>
                <Typography variant="h5" sx={{mb:2}}>Login To Your Account</Typography>
                <Box sx={{ display: "flex", flexDirection: 'column', gap: 2, border: 1, p: 2, borderColor: '#f5f5f5' }}>
                    <TextField inputRef={emailRef} type="email" label="Email" name="email"></TextField>
                    <TextField inputRef={passwordRef} type="password" label="Password" name="password"></TextField>
                    <Button variant="contained" onClick={onSubmit}>Login</Button>
                    {err && <Typography sx={{color:'red;'}}>{err}</Typography>}
                    {done && <Typography sx={{color:'Green;'}}>{done}</Typography>}
                </Box>
            </Box>
        </Container>
    );
}
export default LoginPage;