import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";
import PublicRoute from "./routes/PublicRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Otp from "./Pages/Otp/Otp";
import Signup from "./Pages/Signup/Signup";
import Profile from "./Pages/Profile/Profile";
import EditProfile from "./Pages/EditProfile/EditProfile";
import Friends from "./Pages/Friends/Friends";
import AdminHome from "./Pages/Admin/AdminHome";
import Messenger from "./Pages/Messenger/Messenger";
import AdminRoute from "./routes/AdminRoute";
import AdminUsers from "./Pages/Admin/AdminUsers";
import AdminPosts from "./Pages/Admin/AdminPosts";
import SavedPosts from "./Pages/SavedPosts/SavedPosts";
import AdminReports from "./Pages/Admin/AdminReports";

function App() {
  return (
    <>
      <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          
          {/* <Route path="/signup" element={<PublicRoute><Signup/></PublicRoute> }/>
          <Route path="/login" element={<PublicRoute><Login/></PublicRoute>}/> */}

          <Route element={<PublicRoute/>}>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup />} />
          </Route>

          <Route element={<ProtectedRoute/>}>
                <Route path='/' element={<Home/>} exact/>
                <Route path='/profile' element={<Profile/>} exact/>
                <Route path='/profile/:userID' element={<Profile/>} exact/>
                <Route path='/friends' element={<Friends/>} exact/>
                <Route path='/editProfile' element={<EditProfile/>} exact/>
                <Route path='/messenger' element={ <Messenger/> } exact/>
                <Route path='/savedPosts' element={ <SavedPosts/> } exact/>
          </Route>
          <Route element={<AdminRoute />}>
                <Route path='/admin' element={ <AdminHome/> } exact/>
                <Route path='/admin/users' element={ <AdminUsers/> } exact/>
                <Route path='/admin/posts' element={ <AdminPosts/> } exact/>
                <Route path='/admin/reports' element={ <AdminReports/> } exact/>
            
          </Route>
         
          <Route path="/otp" element={<Otp/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
