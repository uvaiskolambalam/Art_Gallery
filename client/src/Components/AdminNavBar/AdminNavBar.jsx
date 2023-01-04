import React from 'react'
import Logo from '../../Assets/logo-with-name.png'
import './AdminNavBar.css'
const AdminNavBar = () => {
  return (
      <div className='AdminNavBar'>
          <div className="adminNavBarLogo">
              <img src={Logo} alt="" />
          </div>
          <div className="adminProfile">
              <img src='' alt="" />
          </div>
          
    </div>
  )
}

export default AdminNavBar