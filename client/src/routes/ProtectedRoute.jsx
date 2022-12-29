import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Login from "../Pages/Login/Login";
import Url from '../Components/Instence/Base_uel'


export default function ProtectedRoute(){
    const dispatch=useDispatch()
    const {user} = useSelector ((state)=>({...state}))
   
    
        
        //getUserData()
    
    console.log(user, 'userData');
    return user ? <Outlet/> : <Navigate to= '/login'/>
}