import { PropsWithChildren ,FC, useState} from "react";
import {AuthContext} from "./AuthContext"
const AuthProvider: FC<PropsWithChildren>=({children})=>{
    const [username,setUsername]=useState<string|null>(localStorage["username"]);
    const [token,setToken]=useState<string|null>(localStorage["token"]);



    // Another Optin
    // useEffect(()=>{
    //     const localUsername=localStorage["username"];
    //     const localToken=localStorage["token"];
    //     setUsername(localUsername);
    //     setToken(localToken);
    // },[])

    const login=(username:string,token:string)=>{
        setUsername(username);
        setToken(token);
        localStorage.setItem('username',username);
        localStorage.setItem('token',token);
    }
    
    const isAuthenticated=!!token;
    return(
        <AuthContext.Provider value={{username,token,login,isAuthenticated}}>
            {children}
        </AuthContext.Provider>
    );
}
export default AuthProvider;