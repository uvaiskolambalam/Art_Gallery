import React from "react";

import "./FriendsPage.css";
import Url from "../Instence/Base_uel";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import friendsColorIcon from "../../Assets/friends.png";
import searchColorIcon from "../../Assets/search-color.png";
import addFriendColorIcon from "../../Assets/addFriend-color.png";
import followIcon from "../../Assets/follow.png";
import unFollowIcon from "../../Assets/unFollow.png";
const FriendsPage = () => {
  const user = useSelector((state) => state.user);
  const [friends, setFriends] = useState([]);
  const [users, setUsers] = useState([]);
  const [render, setRender] = useState(true);
  const [search, setSearch] = useState([])
  const [searchUsers, setSearchUsers] = useState([])

  const [filteredResultsFriends, setFilteredResults] = useState([]);
  const [filteredResultsUsers, setFilteredResultsUsers] = useState([]);
  const userId = user.id;

  const getUsers = async () => {
    const response = await Url.post("/getUsers", { userId });
    setUsers(response.data.users);
  };

  const getFriends = async () => {
    const response = await Url.post("/getFriends", { userId });
    setFriends(response.data.friends);
  };

  const handleFollow = async (followId) => {
    const followData = {
      userId: userId,
      followId: followId,
    };
    await Url.post("/follow", followData);
    setRender(!render)
  };


  const handleSearchFriends = (values) => {
    setSearch(values)
    if (search !== '') {
      const filteredData = friends.filter((item) => {
        return Object.values(item).join('').toLowerCase().includes(search.toLowerCase())
      })
      setFilteredResults(filteredData)
    }
    else {
      setFilteredResults(friends)
    }

  }

  const handleSearchUsers = (values) => {
    setSearchUsers(values)
    if (searchUsers !== '') {
      const filteredData = users.filter((item) => {
        return Object.values(item).join('').toLowerCase().includes(searchUsers.toLowerCase())
      })
      setFilteredResultsUsers(filteredData)
    }
    else {
      setFilteredResultsUsers(users)
    }

  }





  useEffect(() => {
    getUsers()
    getFriends()
  }, [render]);
  return (
    <>
      <div className="top-container">
        <div className="FriendsPage">
          <div className="FriendsPage-container">
            <div className="head">
              <div className="headding">
                <img src={friendsColorIcon} alt="" />
                <p>Friends</p>
              </div>
              <div className="search">
                <img src={searchColorIcon} alt="" />
                <input placeholder="search your friend..." type="text" onChange={(e) => handleSearchFriends(e.target.value)} />
              </div>
            </div>

            <div className="FriendPage-body">
              {search.length > 1 ? (
                filteredResultsFriends.map((item, i) => (
                  <div className="body-container" key={i}>
                    <div className="friendsPage-One">
                      <div className="friends-profile-pic">
                        <img src={item.profileImage} alt="" />
                      </div>
                      <div>
                        <p>{item.user_name}</p>
                      </div>
                    </div>
                    <div>
                      <div>

                        <button
                          className="button-general"
                          id="follow-btn"
                          onClick={() => handleFollow(item._id)}
                        >
                          {" "}
                          <img
                            className="follow-icon"
                            src={unFollowIcon}
                            alt=""
                          />{" "}
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                friends.map((item, i) => (
                  <div className="body-container" key={i}>
                    <div className="friendsPage-One">
                      <div className="friends-profile-pic">
                        <img src={item.profileImage} alt="" />
                      </div>
                      <div>
                        <p>{item.user_name}</p>
                      </div>
                    </div>
                    <div>
                      <div>

                        <button
                          className="button-general"
                          id="follow-btn"
                          onClick={() => handleFollow(item._id)}
                        >
                          {" "}
                          <img
                            className="follow-icon"
                            src={unFollowIcon}
                            alt=""
                          />{" "}
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}

            </div>
          </div>
        </div>
        <div className="FriendsPage">
          <div className="FriendsPage-container">
            <div className="head">
              <div className="headding">
                <img src={addFriendColorIcon} alt="" />
                <p>People You may know</p>
              </div>
              <div className="search">
                <img src={searchColorIcon} alt="" />
                <input placeholder="search your friend..." type="text" onChange={(f) => handleSearchUsers(f.target.value)} />
              </div>
            </div>
            <div className="FriendPage-body">
              {searchUsers.length > 1 ? (
                filteredResultsUsers.map((item, i) => (
                  <div className="body-container" key={i}>
                    <div className="friendsPage-One">
                      <div className="friends-profile-pic">
                        <img src={item.profileImage} alt="" />
                      </div>
                      <div>
                        <p>{item.user_name}</p>
                      </div>
                    </div>
                    <div>
                      <div>

                        <button
                          className="button-general"
                          id="follow-btn"
                          onClick={() => handleFollow(item._id)}
                        >
                          {" "}
                          <img
                            className="follow-icon"
                            src={followIcon}
                            alt=""
                          />{" "}
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                users.map((item, i) => (
                  <div className="body-container" key={i}>
                    <div className="friendsPage-One">
                      <div className="friends-profile-pic">
                        <img src={item.profileImage} alt="" />
                      </div>
                      <div>
                        <p>{item.user_name}</p>
                      </div>
                    </div>
                    <div>
                      <div>

                        <button
                          className="button-general"
                          id="follow-btn"
                          onClick={() => handleFollow(item._id)}
                        >
                          {" "}
                          <img
                            className="follow-icon"
                            src={followIcon}
                            alt=""
                          />{" "}
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}

            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default FriendsPage;
