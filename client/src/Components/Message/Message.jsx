import React, { useEffect } from "react";
import "./Message.css";
import { format } from 'timeago.js'
import { useState } from "react";
import Url from '../Instence/Base_uel'

const Message = ({ message, own, currentUser, conversation }) => {
  const [user, setUser] = useState(null)
  const [render, setRender] = useState(false)
  useEffect(() => {
    const friendId = conversation.members.find(m => m !== currentUser.id)
    // debugger
    const getUser = async () => {
      try {

        const res = await Url.get(`/getUserDetails/${friendId}`)
        setUser(res.data)
        setRender(!render)

      } catch (error) {
        console.log(error, 'errro');
      }

    }
    friendId && getUser()

  }, [])

  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)} </div>
    </div>
  );
};

export default Message;
