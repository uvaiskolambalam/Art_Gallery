import React, { useRef, useState } from 'react'
import Conversation from '../../Components/Conversation/Conversation'
import Message from '../../Components/Message/Message'
import NavBar from '../../Components/NavBar/NavBar'
import './Messenger.css'
import Send from "../../Assets/send.svg";
import ChatOnline from '../../Components/ChatOnline/ChatOnline'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import Url from '../../Components/Instence/Base_uel'
import {io} from 'socket.io-client'
import logo from '../../Assets/messenger-logo.png'
const Messenger = () => {
    const [conversation,setConversation]=useState([])
    const [currentChat,setCurrentChat]=useState(null)
    const [messages,setMessages]=useState([])
    const [newMessage,setNewMessage]=useState('')
    const [arrivalMessage,setArrivalNewMessage]=useState(null)
    const [onlineUsers,setOnlineUsers]=useState([])
    const [friends, setFriends] = useState([]);
    
    const user = useSelector((state) => state.user);
    const userId=user.id

    const scrollRef = useRef()
    const socket=useRef()

    useEffect(()=>{
        const getFriends = async () => {
            try {
              const res = await Url.post('/getFriends',{userId});
              setFriends(res.data.friends);
            } catch (error) {
              console.log(error);
            }
          };
          getFriends();
    },[])

    useEffect(()=>{
        socket.current=io("ws://localhost:8900")
        socket.current.on("getMessage",data=>{
            setArrivalNewMessage({
                sender:data.senderId,
                text:data.text,
                createdAt:Date.now()
            })

        })
    })

    useEffect(()=>{
        arrivalMessage && currentChat?.members.includes(arrivalMessage.sender)&&
        setMessages(prev=>[...prev,arrivalMessage])
    },[arrivalMessage,currentChat])
   useEffect(()=>{
    socket.current.emit('addUser', user.id)
    socket.current.on('getUsers',users=>{
        setOnlineUsers(users)
    })
   },[user])
     
    
    useEffect(()=>{
        const getConversation = async()=>{
            try {
                
                const res=await Url.get(`/conversations/${user.id}`)
                setConversation(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        getConversation()
    },[user.id])
    
    useEffect(()=>{
        const getMessages=async()=>{
            try {
                
                const res=await Url.get(`/messages/${currentChat?._id}`)
                setMessages(res.data)
            } catch (error) {
                console.log(error);
            }
        }
        getMessages()
    },[currentChat])
    const handleSubmit=async(e)=>{
        e.preventDefault()
        const message={
            sender:user.id,
            text:newMessage,
            conversationId:currentChat._id
        }

        const receiverId=currentChat.members.find(member=>member !== user.id)
        socket.current.emit("sendMessage",{
            senderId:user.id,
            receiverId,
            text:newMessage
        })
        try {
            const res=await Url.post('/messages',message)
            setMessages([...messages,res.data])
            setNewMessage("")
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        socket.current.on("getMessage",data=>{

        })
    },[])
    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behavior:"smooth"})
    },[messages])

    const getToConversation=async(conversationUser)=>{
        const data={
            senderId:userId,
            receiverId:conversationUser._id
        }
        await Url.post('/conversations',{data})
    }
    
  return (
    <>
    <div className="navBar">
    <NavBar/>
    </div>
    hi
    <div className='messenger'>
        <div className="chatMenu">
            <div className="chatMenuWrapper">
                <input type="text" placeholder='search for friends' className='chatMenuInput' />
                {conversation.map(c=>(
                    <div className='conversation-container' onClick={()=>setCurrentChat(c)}>

                        <Conversation conversation={c} currentUser={user} />
                    </div>
                ))}
            </div>
        </div>
        <div className="chatBox">
            <div className="chatBoxWrapper">
                    {currentChat ?
                    <>
                <div className="chatBoxTop">
                    {messages.map(m=>(
                        <div ref={scrollRef}>

                            <Message message={m} own={m.sender === user.id} currentUser={user} conversation={currentChat} />
                        </div>
                    ))}
                    
                </div>
                <div className="chatBoxBottom">
                    <textarea onChange={(e)=>setNewMessage(e.target.value)} value={newMessage} className='chatMessageInput' placeholder='Message'></textarea>
                    <div className='chatSubmitButtonContainer'>
                    <button onClick={handleSubmit} className='chatSubmitButton'><img  src={Send} alt="" /></button>
                    </div>
                </div></> : <div className='noConversation-container'>
                    <img src={logo} alt="" />
                    <span className='noConversationText'>Chat with Your Friends</span>

                    </div>}
                

            </div>
        </div>
        <div className="chatOnline">
            <div className="chatOnlineWrapper">
                <ChatOnline onlineUsers={onlineUsers} currentId={user.id} setCurrentChat={setCurrentChat} friends={friends} getToConversation={getToConversation}/>
            </div>
        </div>
    </div>
    </>
  )
}

export default Messenger