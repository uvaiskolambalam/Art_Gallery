import React from "react";
import "./ChatOnline.css";
import profile from "../../Assets/Profile img.svg";
import { useState } from "react";
import { useEffect } from "react";
import Url from "../Instence/Base_uel";
import { useSelector } from "react-redux";
const ChatOnline = ({ onlineUsers, currentId, setCurrentChat,friends,getToConversation }) => {
  const user = useSelector((state) => state.user);
  const userId=user.id
  console.log(currentId, "currentsiid");
  // const [friends, setFriends] = useState([]);
  // const [onlineFriends, setOnlineFriends] = useState([]);

  // useEffect(() => {
  //   const getFriends = async () => {
  //     try {
  //       const res = await Url.post('/getFriends',{userId});
  //        console.log(res.data,'online user');
  //       setFriends(res.data.friends);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getFriends();
  // }, [currentId]);
  
    const getToChat=async(id)=>{
        const res =await Url.get(`/getUserDetails/${id}`)
        //console.log(res.data,'nahas');
        getToConversation(res.data)
    }
    getToChat()
  
  // useEffect(() => {
  //   setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  // }, [friends, onlineUsers]);
  console.log(friends,'hhhh');
  return (
    <div className="chatOnline">
      {friends.map((item)=>(

        <div className="chatOnlineFriend" onClick={()=>getToChat(item._id)}>
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
