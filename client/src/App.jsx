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
import AdminHome from "./Pages/AdminHome/AdminHome";
import Messenger from "./Pages/Messenger/Messenger";

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
            <Route path='/signup' element={<Signup/>}/>
          </Route>

          <Route element={<ProtectedRoute/>}>
                <Route path='/' element={<Home/>} exact/>
                <Route path='/admin' element= {<AdminHome/>} exact />
                <Route path='/profile' element={<Profile/>} exact/>
                <Route path='/profile/:userID' element={<Profile/>} exact/>
                <Route path='/friends' element={<Friends/>} exact/>
                <Route path='/editProfile' element={<EditProfile/>} exact/>
                <Route path='/messenger' element={ <Messenger/> } exact/>

          </Route>
          {/* <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>}/>
          <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
          <Route path="/editProfile" element={<ProtectedRoute><EditProfile/></ProtectedRoute>}/>
          <Route path="/friends" element={<ProtectedRoute><Friends/></ProtectedRoute>}/> */}

          <Route path="/otp" element={<Otp/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
