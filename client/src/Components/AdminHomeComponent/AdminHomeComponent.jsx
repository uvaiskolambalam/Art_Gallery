import React from "react";
import "./AdminHomeComponent.css";
import { useNavigate } from "react-router-dom";

const AdminHomeComponent = ({ posts, users }) => {
  const navigate = useNavigate();

  return (
    <div className="AdminHomeComponent">
      <div className="AdminHomeComponent-container">
        <div className="containen-title">
          <p>Total Users</p>
        </div>
        <div className="container-number">{users}</div>
        <div className="container-bottom">
          <button onClick={() => navigate("/admin/users")}>view details</button>
        </div>
      </div>
      <div className="AdminHomeComponent-container">
        <div className="containen-title">
          <p>Total Posts</p>
        </div>
        <div className="container-number">{posts}</div>
        <div className="container-bottom">
          <button onClick={() => navigate("/admin/posts")}>view details</button>
        </div>
      </div>
    </div>
  );
};

export default AdminHomeComponent;
