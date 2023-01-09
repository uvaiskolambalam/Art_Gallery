import React from "react";
import "./FriendsBox.css";
import RiysImage from "../../Assets/riyas.jpg";
import AzeezImage from "../../Assets/azeez kolambalam.jpg";
import JishnuImage from "../../Assets/jishnu.jpg";
import SirajuImage from "../../Assets/siraju.jpg";
import { useState } from "react";
import profile from "../../Assets/Profile img.svg";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import unFollowIcon from '../../Assets/unFollow.png'
import Url from '../Instence/Base_uel'
import { useNavigate } from "react-router-dom";


const FriendsBox = ({ user_name, followers, followsId, updateFollow, profileImage }) => {
  const user = useSelector((state) => state.user);
  const [follow, setFollow] = useState(followers)
  const navigate = useNavigate()


  const handleFollow = async (followId) => {
    const followData = {
      userId: user.id,
      followId: followId
    }
    updateFollow(followData)


    setFollow(!follow)


  }
  const getUserDetails = async () => {
    navigate(`/profile/${followsId}`,)


  }

  return (
    <div className="FriendsBox" >
      <div className="FriendsBox-container" >
        <div onClick={getUserDetails}>
          <img className="FriendsBox-Profile" src={profileImage ? profileImage : profile} alt="" />
        </div>
        <div onClick={getUserDetails}>
          <p>{user_name}</p>
        </div>
        <button className="button-general" id="unFollow-btn" onClick={() => handleFollow(followsId)}> <img className="unFollow-icon" src={unFollowIcon} alt="" /> </button>
      </div>
    </div>
  );
};

export default FriendsBox;
