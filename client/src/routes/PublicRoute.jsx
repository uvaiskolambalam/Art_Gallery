import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Login from "../Pages/Login/Login";


export default function PublicRout(){
    const {user} = useSelector ((state)=>({...state}))
    return user ? <Navigate to='/'/> : <Outlet/>
}