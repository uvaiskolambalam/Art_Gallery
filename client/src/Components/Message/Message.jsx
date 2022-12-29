import React, { useEffect } from "react";
import "./Message.css";
import profile from "../../Assets/Profile img.svg";
import Moment from "react-moment";
import {format} from 'timeago.js'
import { useState } from "react";
import Url from '../Instence/Base_uel'

const Message = ({ message, own,currentUser,conversation }) => {
  const [user,setUser]=useState(null)
  const [render,setRender]=useState(false)
  useEffect(()=>{
    const friendId = conversation.members.find(m=>m !==currentUser.id)
    console.log(friendId,'friendId');
    // debugger
    const getUser=async()=>{
      try {
        
        const res = await Url.get(`/getUserDetails/${friendId}`)
        console.log(res.data,'hehehehehe');
        setUser(res.data)
        setRender(!render)
        console.log(res.data,'hello');
      } catch (error) {
       console.log(error,'errro'); 
      }

    }
    friendId && getUser()
    
  },[])
  console.log(user,'chakkare');
  //console.log(currentUser,'mmmeeesssaaagggeee');
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        
      <img className="messageImage" src={own ?currentUser.profileImage  : user?.profileImage} alt="" />
      
    
    {/* <img className="messageImage" src={user.profileImage  ? user.profileImage : profile} alt="" /> */}
        

        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)} </div>
    </div>
  );
};

export default Message;
