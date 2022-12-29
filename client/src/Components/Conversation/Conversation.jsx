import React, { useState } from "react";
import "./Conversation.css";
import profile from "../../Assets/Profile img.svg";
import { useEffect } from "react";
import Url from '../Instence/Base_uel'
const Conversation = ({conversation,currentUser,conversationUser}) => {
 
console.log(conversation,'conversation');
  const [user,setUser]=useState(null)
  useEffect(()=>{
    const friendId = conversation.members.find(m=>m !==currentUser.id)
    
    const getUser=async()=>{
      try {
        
        const res = await Url.get(`/getUserDetails/${friendId}`)
        
        setUser(res.data)
        console.log(res.data,'muthe');
      } catch (error) {
       console.log(error,'errro'); 
      }

    }
    friendId && getUser()
  },[currentUser,conversation])
  
  return (
    <div className="conversation">
      <div className="conversation-profile-pic">
        <img src={user?.profileImage ? user.profileImage :profile} alt=""  />
      </div>
      <div className="conversation-name">

      <span className="conversationName">{user ? user.user_name : "Name"}</span>
      </div>
    </div>
  );
};

export default Conversation;
