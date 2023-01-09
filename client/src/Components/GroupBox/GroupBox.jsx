import React from "react";
import "./GroupBox.css";
import icon from "../../Assets/Profile img.svg";

import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import followIcon from '../../Assets/follow.png'
import profile from "../../Assets/Profile img.svg";

const GroupBox = ({ user_name, followsId, followers, updateFollow, profileImage }) => {
  const user = useSelector((state) => state.user);
  const [follow, setFollow] = useState(followers)



  const handleFollow = async (followId) => {
    const followData = {
      userId: user.id,
      followId: followId
    }

    updateFollow(followData)

    setFollow(!follow)

  }


  return (
    <div className="group-box">
      <div className="group-box-container">
        <div className="group-box-iconDiv">
          <img src={profileImage ? profileImage : profile} alt="" />
        </div>

        <div>
          <p className="group-box-grouName">{user_name}</p>
        </div>
        <div className="follow-button">
          <button className="button-general" id="follow-btn" onClick={() => handleFollow(followsId)}> <img className="follow-icon" src={followIcon} alt="" /> </button>
        </div>
      </div>

    </div>
  );
};

export default GroupBox;
