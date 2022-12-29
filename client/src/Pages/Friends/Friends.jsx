import React from "react";
import LeftAbout from "../../Components/About/LeftAbout";
import FriendsPage from "../../Components/FriendsPage/FriendsPage";
import MenuBox from "../../Components/MenuBox/MenuBox";
import NavBar from "../../Components/NavBar/NavBar";
import "./Friends.css";
const Friends = () => {
  return (
    <div className="Friends">
      <div className="navBar-index">
        <NavBar />
      </div>
      <div className="Friends-container">
        <div className="prifile-left">
          {/* <LeftSide/> */}
          <div className="menuBox">
            <MenuBox />
          </div>
          <div>
            <LeftAbout />
          </div>
        </div>
      <div className="Friends-side">
        <FriendsPage />
      </div>
      </div>
    </div>
  );
};

export default Friends;
