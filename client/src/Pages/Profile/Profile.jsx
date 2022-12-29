import React from 'react'
import { useParams } from 'react-router-dom'
import LeftAbout from '../../Components/About/LeftAbout'
import LeftSide from '../../Components/LeftSide/LeftSide'
import MenuBox from '../../Components/MenuBox/MenuBox'
import NavBar from '../../Components/NavBar/NavBar'
import ProfileBox from '../../Components/Profile/ProfileBox'
import './Profile.css'

const Profile = () => {
  const {userID} = useParams()
  console.log(userID,'asdfasdfasdf');
  return (
    <div className='profile'>
        <div>
            <NavBar/>
        </div>
        <div className="profile-container">
            <div className='prifile-left' >
               <LeftSide/>
                {/* <div className='menuBox'>
                <MenuBox/>
                </div>
               <div>
               <LeftAbout/>
               </div> */}
            </div>
            <div className="ProfileSide">
                <ProfileBox userID={userID}/>
            </div>
        </div>

    </div>
  )
}

export default Profile