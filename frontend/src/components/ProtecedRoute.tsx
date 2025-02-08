import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../context/Auth/AuthContext";

const ProtecetedRoute=()=>{
    const {isAuthenticated}=useAuth()
    if(!isAuthenticated){
        return <Navigate to="/login" replace={true}></Navigate>
    }
    return <Outlet/>
}
export default ProtecetedRoute;