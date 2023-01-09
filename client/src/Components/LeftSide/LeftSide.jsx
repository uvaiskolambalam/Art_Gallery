import React from 'react'
import LeftAbout from '../About/LeftAbout'
import MenuBox from '../MenuBox/MenuBox'
import './LeftSide.css'

const LeftSide = () => {
  return (
    <div className='leftSide'>
      <MenuBox/>
      <LeftAbout/>
    </div>
  )
}

export default LeftSide