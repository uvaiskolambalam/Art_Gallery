import React from 'react'
import LeftSide from "../../Components/LeftSide/LeftSide";
import NavBar from "../../Components/NavBar/NavBar";
import PostSide from "../../Components/PostSide/PostSide";
import SavedPost from '../../Components/SavedPost/SavedPost';
import Url from '../../Components/Instence/Base_uel'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import './SavedPosts.css'
const SavedPosts = () => {
    const user = useSelector((state) => state.user);
    const [savedPost,setSavedPost]=useState([])
    const getSavedPosts = async () => {
        const userId=user.id
        const response = await Url.get(`/getSavedPosts/${userId}`)
        setSavedPost(response.data)
    }
    useEffect(() => {
        getSavedPosts()
    },[])
  return (
    <div className="home">
    <div>
      <NavBar />
    </div>

    <div className="home-container">
      <div className="LeftSide">
        <LeftSide />
      </div>
      {/* <PostSide /> */}

        <div className='savedPost'>
        <SavedPost savedPost={savedPost} getSavedPosts={ getSavedPosts} />
        </div>
      <div className="RigthSide">
      </div>
    </div>
  </div>
  )
}

export default SavedPosts