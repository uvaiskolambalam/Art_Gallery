import React, { useEffect } from "react";
import "./EditProfileBox.css";

import one_2 from "../../Assets/one-2.jpg";
import chat from "../../Assets/chat-dots.svg";
import userIcon from "../../Assets/person.png";
import calender from '../../Assets/calendar-minus.png'
import telephone from '../../Assets/telephone.png'
import education from '../../Assets/mortarboard.png'
import home from '../../Assets/home.png'
import location from '../../Assets/location.png'
import globe from '../../Assets/globe.png'
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import EditProfileMoreModal from '../EditProfileMoreModal/EditProfileMoreModal'
import Url from "../Instence/Base_uel";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
const EditProfileBox = () => {

  const user = useSelector((state) => state.user);
  const userId = user.id
  const [userData, setUserData] = useState({})
  const [render, setRender] = useState(false)
  const [photos, setPhotos] = useState([])
  const [photoFilter, setPhotoFilter] = useState([])
  const dispatch = useDispatch()
  const post = useSelector((state) => state.post);



  const handleEdit = async (edit) => {
    const editAboutData = {
      userId: userId,
      data: edit
    }
    await Url.put('/editAbout', editAboutData)

    setRender(!render)
    getUserDetail()

  }

  const handleMoreEdit = async (values) => {
    const editAboutData = {
      userId: userId,
      data: values
    }
    await Url.put('/editMoreData', editAboutData)
    setRender(!render)
    getUserDetail()
  }
  const getUserDetail = async () => {

    const response = await Url.get(`/getUserDetails/${userId}`)
    setUserData(response.data)
    getPostPhotos()

  }
  const getPostPhotos = async () => {

    const response = await Url.get(`/getPosts/${userId}`);

    dispatch({ type: "POST", payload: response.data });
    setPhotos(response.data)

  }
  const imageLoad = () => {
    if (post != '') {
      const filteredData = post.filter((item) => {
        return item.userId == userId
      })
      setPhotos(filteredData)
    }
  }
  useEffect(() => {
    getUserDetail()
  }, [])
  return (
    <div>
      <div className="EditProfileBox">
        <div className="editProfile-heading">
          <p>Edit Profile</p>
        </div>

        <div className="editProfile-container">
          <div className="editProfile-details-left">
            <div className="editProfile-details-one">
              <div className="title-button">
                <h3>About</h3>
                <button id='edit-btn' className="button-general"><EditProfileModal handleEdit={handleEdit} /></button>
              </div>
              <div className="about-details">
                <div className="about-details-content">

                  <img src={userIcon} alt="" />
                  {/* <svg src={user}></svg> */}
                  <p> {userData.user_name}</p>
                </div>
                <div className="about-details-content">
                  <img src={calender} alt="" />
                  {/* <svg src={user}></svg> */}
                  <p> {userData.mobile}</p>
                </div>

                <div className="More-details">
                  <img src={globe} alt="" />
                  <p>{userData.email}</p>
                </div>


              </div>
            </div>
            <div className="editProfile-details-one">
              <div className="title-button">
                <h3>More</h3>
                <button id='edit-btn' className="button-general"><EditProfileMoreModal handleMoreEdit={handleMoreEdit} /> </button>
              </div>
              <div className="about-details">
                <div className="More-details">
                  <img src={education} alt="" />
                  <p>Studies at {userData.university}</p>
                </div>
                <div className="More-details">
                  <img src={home} alt="" />
                  <p>Lives at {userData.lives}</p>
                </div>
                <div className="More-details">
                  <img src={location} alt="" />
                  <p>from {userData.from}</p>
                </div>
                <div className="about-details-content">
                  <img src={telephone} alt="" />
                  {/* <svg src={user}></svg> */}
                  <p>{userData.DOB}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="editProfile-details-right">
            <div className="MyPhotos-name">
              <p>Photos</p>
              <p>view More...</p>
            </div>
            <div className="MyPhotos" onLoad={imageLoad} >
              {post?.timeLinePost?.filter((item, i) => (
                item.userId._id == user.id

              )).map((item, i) => {
                return <div className="MyPhotos-image-container">
                  <img src={item.imageUrl} alt="" />
                </div>;
              })}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileBox;
