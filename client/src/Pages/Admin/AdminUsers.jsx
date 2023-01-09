import React, { useState } from "react";
import AdminMenu from "../../Components/AdminMenu/AdminMenu";
import AdminNavBar from "../../Components/AdminNavBar/AdminNavBar";
import AdminUser from "../../Components/AdminUser/AdminUser";
import "./Admin.css";
import Url from "../../Components/Instence/Base_uel";
import { useEffect } from "react";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    try {
      const response = await Url.get("/admin/getAllUsers");
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="AdminHome">
      <div className="AdminHomeNavBar">
        <AdminNavBar />
      </div>
      <div className="AdminHomeMenu-content">
        <div className="AdminHomeMenu">
          <AdminMenu />
        </div>
        <div className="AdminHomeUser">

          <AdminUser users={users} getUsers={getUsers} />
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
