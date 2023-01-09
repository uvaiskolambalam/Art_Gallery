import React, { useState } from "react";
import "./ProfileBox.css";
import coverPic from "../../Assets/cover.jpg";
import profile from "../../Assets/Profile img.svg";
import AddPost from "../AddPost/AddPost";
import { NavLink, useNavigate } from "react-router-dom";
import AntdCollaps from "../AntdCollaps/AntdCollaps";
import { useDispatch, useSelector } from "react-redux";
import ProfileImageModal from "./ProfileImageModal";
import { useEffect } from "react";
import Url from "../Instence/Base_uel";
import PostBox from "../PostBox/PostBox";
import Cookies from "js-cookie";
const ImageContext = React.createContext();

const ProfileBox = ({ userID, getPosts }) => {
  const [upload, setUpload] = useState(false);
  const [tempUser, setTempUser] = useState(false);
  const [userProfileImage, setUserProfileImage] = useState("");
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate()
  const user = useSelector((state) => state.user);

  const userPic = useSelector((state) => state.userAllDetails);
  useEffect(() => {
    const getPosts = async () => {
      const response = await Url.get(`/getPosts/${user.id}`);
      setPosts(response.data.timeLinePost);
    };
    getPosts();
  }, []);


  const userCheck = userID === undefined ? user.id : userID;

  const visitor = userCheck === user.id ? false : true;
  const userId = user.id;
  const dispatch = useDispatch();

  const renderImage = async () => {
    if (visitor) {
      const response = await Url.get(`/getUserDetails/${userCheck}`);
      setTempUser(response.data);
    }
    const response = await Url.get(`/getUserDetails/${userId}`);
    dispatch({ type: "USER", payload: response.data });

  };
  const savedPosts = () => {
    navigate('/savedPosts')
  }
  const friends = () => {
    navigate('/friends')
  }
  const logout = () => {
    Cookies.set("userData", "");
    dispatch({
      type: "LOGOUT",
    });
    navigate("/login");
  };

  useEffect(() => {
    renderImage();
  }, [userProfileImage, upload]);
  return (
    <div>
      <div className="ProfileBox">
        <div className="coverPhoto">
          <img src={coverPic} alt="" />
        </div>
        <div className="profileBox-details">
          <div className="profileBox-profilePic">
            <div className="profilePic">
              <img
                src={
                  visitor
                    ? tempUser.profileImage
                    : userPic.profileImage
                      ? userPic.profileImage
                      : profile
                }
                alt=""
              />
            </div>

            {tempUser ? null : (
              <form action="">
                <div className="changeProfilePic">
                  <label htmlFor="file">
                    <ProfileImageModal setUpload={setUpload} />
                  </label>
                </div>
              </form>
            )}

            <div className="userName">
              <p>{visitor ? tempUser.name : user.name}</p>
              <p>{visitor ? tempUser.name : user.followers.length} followers</p>
            </div>
          </div>
          {visitor ? null : (
            <div className="controles">
              <button>Add Story</button>

              <NavLink to="/editProfile">
                <button>Edit Profile</button>
              </NavLink>
            </div>
          )}
        </div>
        <hr />

        <div className="profileBox-posts-friends-logout">
          <div className="left">
            <p onClick={savedPosts}>Saved Posts</p>
            <p onClick={friends}>Friends</p>
          </div>
          {tempUser ? null : (
            <div className="right" onClick={logout}>
              <button>Logout</button>
            </div>
          )}
        </div>
      </div>
      {tempUser ? null : (
        <div className="addPost">
          <AddPost />
        </div>
      )}
      <div className="ProfileBox-userDetails-container">
        <div className="collapsProfile">
          <AntdCollaps tempUser={tempUser} />
        </div>

        <div className="postBoxProfile">
          {posts.length > 0 && posts.filter((item) => (item.userId._id == user.id)).map((item, i) => (
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
              // updateLike={updateLike}
              // updateComment={updateComment}
              createdAt={item.createdAt}
              name={item.userId.user_name}
              photo={item.userId.profileImage}
              postmanId={item.userId._id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileBox;
