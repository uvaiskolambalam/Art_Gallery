import React from "react";
import "./NavBar.css";
import Logo from "../../Assets/logo-with-name.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const NavBar = () => {
  const user = useSelector((state) => state.user);
  const userPic = useSelector((state) => state.userAllDetails);

  return (
    <div>
      <div className="Navbar">
        <div className="left">
          <Link to='/'><img className="logo" src={Logo} alt="" /></Link>

        </div>
        <div className="right">

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
