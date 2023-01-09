import React from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import LeftSide from '../../Components/LeftSide/LeftSide'
import NavBar from '../../Components/NavBar/NavBar'
import ProfileBox from '../../Components/Profile/ProfileBox'
import './Profile.css'

const Profile = () => {
  useEffect(() => {
    
  },[])
  const {userID} = useParams()
  return (
    <div className='profile'>
        <div>
            <NavBar/>
        </div>
        <div className="profile-container">
            <div className='prifile-left' >
               <LeftSide/>
               
            </div>
            <div className="ProfileSide">
                <ProfileBox userID={userID}/>
            </div>
        </div>

    </div>
  )
}

export default Profile