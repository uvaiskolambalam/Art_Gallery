import React from 'react'
import LeftAbout from '../../Components/About/LeftAbout'
import EditProfileBox from '../../Components/EditProfile/EditProfileBox'
import MenuBox from '../../Components/MenuBox/MenuBox'
import NavBar from '../../Components/NavBar/NavBar'
import './EditProfile.css'

const EditProfile = () => {
  return (
    <div>
        <div className='EditProfile'>
            <div>
                <NavBar/>
            </div>
            <div className='EditProfile-container'>
            <div className='prifile-left' >
                {/* <LeftSide/> */}
                <div className='menuBox'>
                <MenuBox/>
                </div>
               <div>
               <LeftAbout/>
               </div>
            </div>
            <div className="EditProfile-details">
                <EditProfileBox/>
            </div>

            </div>

        </div>
    </div>
  )
}

export default EditProfile