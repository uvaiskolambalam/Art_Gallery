import React from "react";
import { useEffect } from "react";
import FriendsBox from "../FriendsBox/FriendsBox";
import GroupBox from "../GroupBox/GroupBox";
import "./RightSide.css";
import Url from "../Instence/Base_uel";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const RightSide = () => {
 const navigate=useNavigate()
  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [render, setRender] = useState(false);
  const user = useSelector((state) => state.user);
  const userId = user.id;
  const getFriends = async () => {
    const response = await Url.post("/getFriends", { userId });
    setFriends(response.data.friends);
    // getUsers();
  };
  const updateFollow = async (followData) => {
    getFriends();
    getUsers();
    const response = await Url.post("/follow", followData);
    setRender(!render);
  };
  const getUsers = async () => {
    const response = await Url.post("/getUsers", { userId });
    setUsers(response.data.users);
    //getFriends()
  };
  const seeAll=()=>{
    navigate('/friends')
  }

  useEffect(() => {
    updateFollow();
    getFriends();
    getUsers();
  }, [render]);
  return (
    <div className="RightSide">
      <div className="RightSide-Friends">
        <p>Friends</p>
        <p onClick={seeAll}>see all...</p>
      </div>
      <div className="rightSide-group">
        {friends.map((item, i) => (
          <FriendsBox
            setRender={setRender}
            render={render}
            key={i}
            user_name={item.user_name}
            followers={item.followers.includes(user.id)}
            followsId={item._id}
            updateFollow={updateFollow}
             profileImage={item.profileImage}
            
          />
        ))}
      </div>
      <div className="RightSide-Friends">
        <p>People You may know</p>
        <p onClick={seeAll}>see all...</p>
      </div>
      <div className="rightSide-group">
        {users.map((item, i) => (
          <GroupBox
            key={i}
            render={render}
            setRender={setRender}
            user_name={item.user_name}
            followsId={item._id}
            followers={item.followers.includes(user.id)}
            updateFollow={updateFollow}
             profileImage={item.profileImage}
          />
        ))}
      </div>
    </div>
  );
};

export default RightSide;
