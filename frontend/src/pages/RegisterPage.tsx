import { Container, Typography, Box, TextField ,Button} from "@mui/material"
import { useRef, useState } from "react";
import { BASE_URL } from "../constants/baseUrl";

const RegisterPage = () => {
    const [err,seterr]=useState("");
    const fnameRef=useRef<HTMLInputElement>(null);
    const lnameRef=useRef<HTMLInputElement>(null);
    const emailRef=useRef<HTMLInputElement>(null);
    const passwordRef=useRef<HTMLInputElement>(null);

    const onSubmit=async()=>{
        const firstName=fnameRef.current?.value;
        const lastName=lnameRef.current?.value;
        const email=emailRef.current?.value;
        const password=passwordRef.current?.value;
        console.log(firstName,lastName,email,password)
        const response=await fetch(`${BASE_URL}/user/register`,{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                firstName,
                lastName,
                email,
                password,
            }),
        });
        if(!response.ok){
            console.log("I am Here")
            seterr("Unable to register try difference credentials!")
            return;
        }
        const data=await response.json();
        console.log(data);
    };
    return (
        <Container>
            <Box sx={{ display: "flex", justifyContent: 'center', flexDirection: 'column', alignItems: 'center', mt: 4}}>
                <Typography variant="h5" sx={{mb:2}}>Register New Account</Typography>
                <Box sx={{ display: "flex", flexDirection: 'column', gap: 2, border: 1, p: 2, borderColor: '#f5f5f5' }}>
                    <TextField inputRef={fnameRef} label="First Name" name="firstName"></TextField>
                    <TextField inputRef={lnameRef} label="Last Name" name="lastName"></TextField>
                    <TextField inputRef={emailRef} type="email" label="Email" name="email"></TextField>
                    <TextField inputRef={passwordRef} type="password" label="Password" name="password"></TextField>
                    <Button variant="contained" onClick={onSubmit}>Register</Button>
                    {err && <Typography sx={{color:'red;'}}>{err}</Typography>}
                </Box>
            </Box>
        </Container>
    );
}
export default RegisterPage;