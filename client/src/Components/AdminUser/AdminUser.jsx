import React from "react";
import "./AdminUser.css";
import Url from "../Instence/Base_uel";
import blokedUserIcon from "../../Assets/bloked.png";
import nonBlokedUserIcon from "../../Assets/nonBlock.png";

const AdminUser = ({ users, getUsers }) => {
  const updateBlock = async (userId) => {
    await Url.patch("/admin/updateBlock", { userId });
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
          <tr key={key}>
            <td>{ key+1}</td>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.block ? "Bloked" : "Ordinary"}</td>
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
