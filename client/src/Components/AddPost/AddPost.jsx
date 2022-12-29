import React from 'react'
import './AddPost.css'
import profilePic from '../../Assets/Profile img.svg'
import addPhoto from '../../Assets/file-image.png'
import Popup from '../Popup/Popup'
import { useState } from 'react'
import AntdModal from '../AntdModal/AntdModal'
import { useSelector } from 'react-redux'

const AddPost = ({setRender}) => {
    
    const userPic = useSelector((state) => state.userAllDetails);


  return (
    <div className='AddPost'>
        <div className="AddPost-top">
            <div className="AddPost-image">
                <img src={userPic.profileImage} alt="" />
            </div>
            
            <div className="AddPost-input">
                {/* <p>Whai is on your mind</p> */}
           
                <AntdModal setRender={setRender}/>
            </div>
            <div className="AddPost-imageIcon">
                <img src={addPhoto} alt="" />
            </div>
            
        </div>
       
    </div>
  )
}

export default AddPost