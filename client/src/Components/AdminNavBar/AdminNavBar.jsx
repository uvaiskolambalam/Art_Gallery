import React from 'react'
import Logo from '../../Assets/logo-with-name.png'
import admin from '../../Assets/one-4.jpg'
import './AdminNavBar.css'
const AdminNavBar = () => {
  return (
      <div className='AdminNavBar'>
          <div className="adminNavBarLogo">
              <img src={Logo} alt="" />
          </div>
          <div className="adminProfile">
              <img src={admin} alt="" />
          </div>
          
    </div>
  )
}

export default AdminNavBar