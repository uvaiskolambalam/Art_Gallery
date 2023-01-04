import React from "react";
import nonBlokedUserIcon from "../../Assets/nonBlock.png";
import blokedUserIcon from "../../Assets/bloked.png";
import Url from "../Instence/Base_uel";
const AdminPosts = ({ posts, getPosts }) => {
  const postBlock = async (postId) => {
    console.log(postId, "postId");
    try {
      const response = await Url.patch("/admin/blockPost", { postId });
      getPosts();
    } catch (error) {
      console.log(error);
    }
  };
  console.log(posts, "post");
  return (
    <div className="AdminUser">
      <table className="AdminUserTable">
        <tr>
          <th>SlNo</th>
          <th>Post Owner</th>
          <th>Email</th>
          <th>Date</th>
          <th>Action</th>
        </tr>
        {posts.map((item, key) => (
          <tr>
            <td>1</td>
            <td>{item.userId.user_name}</td>
            <td>{item.userId.email}</td>
            <td>{item.updatedAt}</td>
            <td className="blockButtonContainer">
              {" "}
              <button
                className="postBlock"
                onClick={() => postBlock(item?._id)}
              >
                {" "}
                {item.block ? "Unblock" : "Block"}
              </button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default AdminPosts;
