import React from "react";
import "./ChatOnline.css";
import profile from "../../Assets/Profile img.svg";
import { useState } from "react";
import { useEffect } from "react";
import Url from "../Instence/Base_uel";
import { useSelector } from "react-redux";
const ChatOnline = ({ onlineUsers, currentId, setCurrentChat, friends, getToConversation }) => {
  const user = useSelector((state) => state.user);
  const userId = user.id
  const getToChat = async (id) => {
    const res = await Url.get(`/getUserDetails/${id}`)
    getToConversation(res.data)
  }

  return (
    <div className="chatOnline">
      {friends.map((item) => (

        <div className="chatOnlineFriend" onClick={() => getToChat(item._id)}>
          <div className="chatOnlineImageConteiner">
            <img src={item.profileImage ? item.profileImage : profile} alt="" />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{item.user_name}</span>
        </div>
      ))}

    </div>
  );
};

export default ChatOnline;
