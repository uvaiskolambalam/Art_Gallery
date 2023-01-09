import React from 'react'
import AdminMenu from '../../Components/AdminMenu/AdminMenu'
import AdminNavBar from '../../Components/AdminNavBar/AdminNavBar'
import AdminHomee from '../../Components/AdminHomeComponent/AdminHomeComponent'
import { useEffect } from 'react'
import { useState } from 'react'
import Url from '../../Components/Instence/Base_uel'

const AdminHome = () => {
  const [posts, setPosts] = useState(0)
  const [users, setUsers] = useState(0)
  const getPosts = async () => {
    try {
      const response = await Url.get('/admin/getAllPosts')
      setPosts(response.data.length)


    } catch (error) {
      console.log(error);
    }
  }
  const getUsers = async () => {
    try {

      const response = await Url.get("/admin/getAllUsers");
      setUsers(response.data.length);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {

    getPosts()
    getUsers()

  }, [])
  return (
    <div className="AdminHome">
      <div className="AdminHomeNavBar">
        <AdminNavBar />
      </div>
      <div className="AdminHomeMenu-content">
        <div className="AdminHomeMenu">
          <AdminMenu home />
        </div>
        <div className="AdminHomeUser">

          <div className='AdminHomeDetails'>
            <AdminHomee posts={posts} users={users} />

          </div>
        </div>

      </div>
    </div>
  )
}

export default AdminHome