import React from 'react'
import './MenuBox.css'
import HomeIcon from '../../Assets/home.svg'
import FriendsIcon from '../../Assets/friends.svg'
import MessageIcon from '../../Assets/chat.svg'
import SaveIcon from '../../Assets/save.svg'
import SettingsIcon from '../../Assets/settings.svg'
import LogoutIcon from '../../Assets/logout.svg'
import profile from '../../Assets/person.svg'
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import Cookies from "js-cookie";

const MenuBox = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    Cookies.set("userData", "");
    dispatch({
      type: "LOGOUT",
    });
    navigate("/login");
  };
  return (
    <div className='MenuBox'>
        <NavLink to='/'>
        <div className='MenuBox-item'>
        
          <img src={HomeIcon} alt="" />
          <p >Home</p>
          
        </div>
        </NavLink>
        <NavLink to='/friends'>
        <div className='MenuBox-item'>
          <img src={FriendsIcon} alt="" />
          <p>Friends</p>
        </div>
        </NavLink>
        
        <NavLink to='/profile'>
        <div className='MenuBox-item'>
          <img src={profile} alt="" />
          <p>Profile</p>
        </div>
        </NavLink>
        <NavLink to='/messenger'>
        <div className='MenuBox-item'>
          <img src={MessageIcon} alt="" />
          <p>Message</p>
        </div>
        </NavLink>
      <NavLink to='/savedPosts'>
      <div className='MenuBox-item'>
          <img src={SaveIcon} alt="" />
          <p>Saved Posts</p>
        </div>
        </NavLink>
        <div className='MenuBox-item'>
          <img src={SettingsIcon} alt="" />
          <p>Settings</p>
        </div>
        <div className='MenuBox-item' onClick={logout}>
          <img src={LogoutIcon} alt="" />
          <p>Logout</p>
        </div>
        
      
    </div>
  )
}

export default MenuBox