import React from 'react'
import './MenuBox.css'
import HomeIcon from '../../Assets/home.svg'
import FriendsIcon from '../../Assets/friends.svg'
import MessageIcon from '../../Assets/chat.svg'
import NotificationIcon from '../../Assets/notification.svg'
import SettingsIcon from '../../Assets/settings.svg'
import LogoutIcon from '../../Assets/logout.svg'
import profile from '../../Assets/person.svg'
import { Link, NavLink } from "react-router-dom";


const MenuBox = () => {
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
        <div className='MenuBox-item'>
          <img src={NotificationIcon} alt="" />
          <p>Notification</p>
        </div>
        <div className='MenuBox-item'>
          <img src={SettingsIcon} alt="" />
          <p>Settings</p>
        </div>
        <div className='MenuBox-item'>
          <img src={LogoutIcon} alt="" />
          <p>Logout</p>
        </div>
        
      
    </div>
  )
}

export default MenuBox