import React from "react";
import "./PostBox.css";
import PostImageOne from "../../Assets/imageOne.jpg";
import PostImageTwo from "../../Assets/imagetwo.jpg";
import profile from "../../Assets/Profile img.svg";
import heart from "../../Assets/heart.svg";
import Chat from "../../Assets/chat-dots.svg";
import Share from "../../Assets/share-fill.svg";
import Send from "../../Assets/send.svg";
import dots from "../../Assets/three-dots.svg";
import { useEffect } from "react";
import axios from "axios";
import Url from "../Instence/Base_uel";
import heartFill from "../../Assets/heart-fill.png";
import { useState } from "react";
import Moment from "react-moment";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PostBox = ({
  image,
  desc,
  userId,
  id,
  liked,
  likeCount,
  comments,
  updateLike,
  updateComment,
  createdAt,
  name,
  photo,
  postmanId
}) => {
  const userPic = useSelector((state) => state.userAllDetails);
  const [like, setLike] = useState(liked);
  const [chatIcon, setChatIcon] = useState(false);
  const [comment, setComment] = useState("");
  const navigate=useNavigate()

  const handleLike = async () => {
    const likeData = {
      userId: userId,
      postId: id,
    };

    updateLike(likeData);
    setLike(!like);
  };

  const commentInput = async (e) => {
    setComment(e.target.value);
  };

  const sentComent = async () => {
    const commentData = {
      postId: id,
      userId: userId,
      comment: comment,
    };

    updateComment(commentData);
    setComment("");

    //setComment(response.data)
  };
  const getUserDetails= async()=>{
    navigate(`/profile/${postmanId}`,)
  }
 

  return (
    <>
      <div className="post-box">
        <div className="post-box-postmanDetails">
          <div className="post-box-firstDetails">
            <div className="postman-Profile-Pic">
              <img src={photo ? photo : profile} alt="" onClick={getUserDetails} />
            </div>
            {/* <div className="postman-defult-Profile-Pic">
              <img src={photo ? photo : profile} alt="" />
            </div> */}
            <div className="post-box-postman-name-date">
              <p>{name}</p>
              <Moment fromNow interval={30}>
                {createdAt}
              </Moment>
            </div>
          </div>
          <div>
            <img src={dots} alt="" />
            
          </div>
        </div>
        {/* =========================== */}
        <div className="postBox-text">
          <p>{desc}</p>
        </div>
        <div className="post-box-image-section">
          <img src={image} alt="" />
        </div>
        <div>
          <hr />
        </div>
        <div className="postBox-icons">
          <img src={like ? heartFill : heart} alt="" onClick={handleLike} />
          <p>{likeCount}</p>
          <img
            src={Chat}
            alt=""
            onClick={() => {
              setChatIcon(!chatIcon);
            }}
          />
          <img src={Share} alt="" />
        </div>
        <div>
          <hr />
        </div>

        {/* ============================================ */}
        <div className="postBox-container">
          {chatIcon &&
            comments.map((item, i, key) => (
              <div className="postBox-viewComment">
                <div className="postman-coment-Profile-Pic">
                  <img src={photo ? photo : profile} alt="" />
                </div>
                <div className="coment-user">
                  <p>{item.userName}</p>
                  <p className="coments-text">{item.desc}</p>
                </div>
              </div>
            ))}
        </div>

        {/* ============================================ */}

        <div className="postBox-coment">
          <div className="postman-Profile-Pic">
            <img src={userPic.profileImage} alt="" />
          </div>
          <div className="postBox-input">
            <input
              type="text"
              placeholder="Text here..."
              name="comment"
              value={comment}
              onChange={commentInput}
              id="commentInput"
            />
            <img onClick={sentComent} src={Send} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default PostBox;
