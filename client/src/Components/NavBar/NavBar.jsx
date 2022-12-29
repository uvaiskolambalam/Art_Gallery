import React from "react";
import "./NavBar.css";
import Logo from "../../Assets/logo-with-name.png";
// import ChatIcon from "../../Assets/chat.svg";
import NotificationIcon from "../../Assets/notification.svg";
import ProfileImage from "../../Assets/Profile img.svg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const NavBar = () => {
  const  user  = useSelector((state) => state.user);
  const userPic = useSelector((state) => state.userAllDetails);
  const darkmode=()=>{
    const element =document.body
    element.classList.toggle("dark-mode")
  }
  return (
    <div>
      <div className="Navbar">
        <div className="left">
          <Link to='/'><img className="logo" src={Logo} alt="" /></Link>
          
        </div>
        <div className="right">
          {/* <img className="chatIcon" src={ChatIcon} alt="" /> */}
          {/* <img className="chatIcon" src={NotificationIcon} alt="" /> */}
          <button onClick={darkmode}>dark</button>

          <div className="profileImage">
          <Link to='/profile'><img src={userPic.profileImage} alt="" /></Link>
            
          </div>
          <p>{user.name}</p>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
