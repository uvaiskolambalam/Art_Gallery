import React from "react";
import "./AdminMenu.css";
import HomeIcon from "../../Assets/home.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import Cookies from "js-cookie";
const AdminMenu = () => {
  const dispatch = useDispatch();
const navigate = useNavigate();
  
  const logout = () => {
    Cookies.set("adminData", "");
    dispatch({
      type: "ADMIN_LOGOUT",
    });
    navigate("/login");
  };
  
  return (
    <div className="AdminMenu">
      <NavLink to="/admin">
        <div className="MenuBox-item">
          <img src={HomeIcon} alt="" />
          <p>Home</p>
        </div>
      </NavLink>
      <NavLink to="/admin/users">
        <div className="MenuBox-item">
          <img src={HomeIcon} alt="" />
          <p>Users</p>
        </div>
      </NavLink>
      <NavLink to="/admin/posts">
        <div className="MenuBox-item">
          <img src={HomeIcon} alt="" />
          <p>Posts</p>
        </div>
        
      </NavLink>
      <div className="MenuBox-item" onClick={logout}>
          <img src={HomeIcon} alt="" />
          <p>LogOut</p>
        </div>
    </div>
  );
};

export default AdminMenu;
