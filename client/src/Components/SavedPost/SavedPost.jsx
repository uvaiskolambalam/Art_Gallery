import React from 'react'
import PostBox from '../PostBox/PostBox'
import PostSide from '../PostSide/PostSide'
import Url from '../Instence/Base_uel'
import { useSelector } from 'react-redux'
const SavedPost = ({ savedPost, getSavedPosts }) => {
  const user = useSelector((state) => state.user);
  const updateComment=async(commentData)=>{
    const commentResponse = await Url.post('/addComment',commentData)
    getSavedPosts()
  }
  const updateLike=async(likeData)=>{
    
    const likeResponse= await Url.post("/like", likeData);
    getSavedPosts()
  }
  
    return (
      
        <div>
            {savedPost.map((item, i) => (
                
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
            ))}
    </div>
  )
}

export default SavedPost