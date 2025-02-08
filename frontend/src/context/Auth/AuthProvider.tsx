import { PropsWithChildren ,FC, useState} from "react";
import {AuthContext} from "./AuthContext"
const USERNAME_KEY='username';
const TOKEN_KEY='token';
const AuthProvider: FC<PropsWithChildren>=({children})=>{
    const [username,setUsername]=useState<string|null>(localStorage[USERNAME_KEY]);
    const [token,setToken]=useState<string|null>(localStorage[TOKEN_KEY]);
    const isAuthenticated=!!token;

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
        localStorage.setItem(USERNAME_KEY,username);
        localStorage.setItem(TOKEN_KEY,token);
    }
    const logout=()=>{
        localStorage.removeItem(USERNAME_KEY);
        localStorage.removeItem(TOKEN_KEY);
        setUsername(null);
        setToken(null);
    }

    return(
        <AuthContext.Provider value={{username,token,isAuthenticated,logout,login}}>
            {children}
        </AuthContext.Provider>
    );
}
export default AuthProvider;