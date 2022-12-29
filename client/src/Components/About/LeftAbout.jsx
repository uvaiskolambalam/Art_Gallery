import React from 'react'
import logo from '../../Assets/logo-with-name.png'
import './LeftAbout.css'

const LeftAbout = () => {
  return (
    <div className='about'>
      <div className="about-logo">
        <img src={logo} alt="" />
      </div>
      <div className="about-content">
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere, non.</p>
      </div>

    </div>
  )
}

export default LeftAbout