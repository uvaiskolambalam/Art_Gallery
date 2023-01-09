import React from "react";
import LeftSide from "../../Components/LeftSide/LeftSide";
import NavBar from "../../Components/NavBar/NavBar";
import PostSide from "../../Components/PostSide/PostSide";
import RightSide from "../../Components/RightSide/RightSide";
import "./Home.css";

const UserContext = React.createContext();
const Home = () => {
  return (
    <div className="home">
      <div>
        <NavBar />
      </div>

      <div className="home-container">
        <div className="LeftSide">
          <LeftSide />
        </div>
        <PostSide />

        <div className="RigthSide">
          <RightSide />
        </div>
      </div>
    </div>
  );
};

export default Home;
export { UserContext };
