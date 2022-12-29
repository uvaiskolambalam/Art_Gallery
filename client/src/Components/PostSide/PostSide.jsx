import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddPost from "../AddPost/AddPost";
import logo from '../../Assets/logo-with-name.png'
import PostBox from "../PostBox/PostBox";
import "./PostSide.css";
import Url from "../Instence/Base_uel";
import { useState } from "react";
const PostSide = () => {
  const [count, setCount] = useState(null);
  const user = useSelector((state) => state.user);
  const [post, setPost] = useState([]);
  const [render, setRender] = useState(false);
  const userId = user.id;
  
 
const dispatch= useDispatch()
  const getPosts = async () => {
    const response = await Url.get(`/getPosts/${userId}`);
    //console.log(response.data,'hasldfjosjfopsaidjfapsoidaosdfjaodjfaokdfj;alsdkfjlsdkfj');
    dispatch({type:"POST" , payload:response.data}); 
    
    
    setPost(response.data.timeLinePost);
    console.log(post,'daaa');
  };
  
  const updateLike=async(likeData)=>{
    
    const likeResponse= await Url.post("/like", likeData);
    getPosts()
  }
  const updateComment=async(commentData)=>{
    const commentResponse = await Url.post('/addComment',commentData)
    getPosts()
  }
  const userD=async()=>{
    const responsee = await Url.get(`/getUserDetails/${user.id }`);
        //console.log(response.data,'yyyyyyyyyyyyyyyyyyyy');
        dispatch({type:"USER" , payload:responsee.data});
  }

  useEffect(() => {
    getPosts();
    userD()
    console.log("useEffectr");
  }, [render]);

  return (
    <div className="postSide">
      <div className="advertestment-container">

      {/* <marquee  direction="right" className='advertestment'>
        <img className="advertestment-image" src={logo} alt="" />
       <img className="advertestment-image" src={logo} alt="" />
       <img className="advertestment-image" src={logo} alt="" />
       <img className="advertestment-image" src={logo} alt="" />
       </marquee> */}
      </div>
      <AddPost setRender={setRender} />
       
      {post.map((item, i) => {
        return (
          <PostBox
            key={i}
            desc={item.desc}
            image={item.imageUrl}
            userId={user.id}
            id={item._id}
            liked={item.likes.includes(user.id)}
            likeCount={item.likes.length}
            user={user}
            comments={item.comments}
            updateLike={updateLike}
            updateComment={updateComment}
            createdAt={item.createdAt}
            name={item.userId.user_name}
            photo={item.userId.profileImage}
            postmanId={item.userId._id}
          
          />
        );
      })}
    </div>
  );
};

export default PostSide;
