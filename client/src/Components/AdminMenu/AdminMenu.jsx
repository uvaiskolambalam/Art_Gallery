import React from "react";
import "./AdminMenu.css";
import HomeIcon from "../../Assets/home.svg";
import {Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import Users from '../../Assets/friends.svg'
import LogoutIcon from '../../Assets/logout.svg'
import PostsIcon from '../../Assets/posts.svg'
import ReportIcon from '../../Assets/report.svg'
const AdminMenu = ({home}) => {
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
      {}
      <Link to="/admin" >
        <div className={`MenuBox-item ${home ? "active" : ""}`}>
          <img src={HomeIcon} alt="" />
          <p>Home</p>
        </div>
      </Link>
      <NavLink to="/admin/users">
        <div className="MenuBox-item">
          <img src={Users} alt="" />
          <p>Users</p>
        </div>
      </NavLink>
      <NavLink to="/admin/posts">
        <div className="MenuBox-item">
          <img src={PostsIcon} alt="" />
          <p>Posts</p>
        </div>
      </NavLink>
      <NavLink to="/admin/reports">
        <div className="MenuBox-item">
          <img src={ReportIcon} alt="" />
          <p>User Reports</p>
        </div>
      </NavLink>
      <div className="MenuBox-item" onClick={logout}>
        <img src={LogoutIcon} alt="" />
        <p>LogOut</p>
      </div>
    </div>
  );
};

export default AdminMenu;
