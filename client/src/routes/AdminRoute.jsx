import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Login from "../Pages/Login/Login";
import Url from '../Components/Instence/Base_uel'


export default function AdminRoute(){
    const dispatch=useDispatch()
    const {admin} = useSelector ((state)=>({...state}))
   
    
        
        //getUserData()
    
    console.log(admin, 'adminData');
 

   
        
        return admin ? <Outlet/> : <Navigate to= '/login'/>
   
}