import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import AdminMenu from '../../Components/AdminMenu/AdminMenu'
import AdminNavBar from '../../Components/AdminNavBar/AdminNavBar'
import AdminPostss from '../../Components/AdminPostsComponent/AdminPostsComponent'
import Url from '../../Components/Instence/Base_uel'
const AdminPosts = () => {
    const [posts, setPosts] = useState([])
   
    
    const getPosts = async () => {
        try {
            const response = await Url.get('/admin/getAllPosts')
            setPosts(response.data)
            
            
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getPosts()
    },[])
  return (
    <div className="AdminHome">
    <div className="AdminHomeNavBar">
      <AdminNavBar />
    </div>
    <div className="AdminHomeMenu-content">
      <div className="AdminHomeMenu">
        <AdminMenu />
      </div>
      <div className="AdminHomeUser">
      
          <AdminPostss posts={posts} getPosts={getPosts} />
      </div>
      
    </div>
  </div>
  )
}

export default AdminPosts