import React from "react";
import "./AdminUser.css";
import Url from "../Instence/Base_uel";
import { useEffect } from "react";
import blokedUserIcon from "../../Assets/bloked.png";
import nonBlokedUserIcon from "../../Assets/nonBlock.png";

const AdminUser = ({ users, getUsers }) => {
  // console.log(userId,'userId...........');
  const updateBlock = async (userId) => {
    const response = await Url.patch("/admin/updateBlock", { userId });
    console.log('respo=>',response.data);
    getUsers();
  };

  return (
    <div className="AdminUser">
      <table className="AdminUserTable">
        <tr>
          <th>SlNo</th>
          <th>Name</th>
          <th>Email</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
        {users.map((item, key) => (
          <tr>
            <td>1</td>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.block ? "Bloked" : "Audinary"}</td>
            <td className="blockButtonContainer">
              <button
                className="userblock-btn"
                onClick={() => updateBlock(item?._id)}
              >
                {" "}
                {item.block ? (
                  <img src={nonBlokedUserIcon} alt="" />
                ) : (
                  <img src={blokedUserIcon} alt="" />
                )}
              </button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default AdminUser;
