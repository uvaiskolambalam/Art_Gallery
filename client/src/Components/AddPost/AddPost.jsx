import React from "react";
import "./AddPost.css";
import addPhoto from "../../Assets/file-image.png";
import AntdModal from "../AntdModal/AntdModal";
import { useSelector } from "react-redux";

const AddPost = ({ setRender }) => {
  const userPic = useSelector((state) => state.userAllDetails);

  return (
    <>
      <div className="AddPost">
        <div className="AddPost-top">
          <div className="AddPost-image">
            <img src={userPic.profileImage} alt="" />
          </div>

          <div className="AddPost-input">
            <AntdModal setRender={setRender} />
          </div>
          <div className="AddPost-imageIcon">
            <img src={addPhoto} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddPost;
