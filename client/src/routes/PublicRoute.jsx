import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function PublicRout() {
    const { user } = useSelector((state) => ({ ...state }))
    const { admin } = useSelector((state) => ({ ...state }))
    if (user) {
        
        return user ? <Navigate to='/' /> : <Outlet />
    } else {
        
        return admin ? <Navigate to='/admin'/> : <Outlet/>
    }
}