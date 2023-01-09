import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import AdminMenu from '../../Components/AdminMenu/AdminMenu'
import AdminNavBar from '../../Components/AdminNavBar/AdminNavBar'
import AdminReport from '../../Components/AdminReport/AdminReport'
import Url from '../../Components/Instence/Base_uel'

const AdminReports = () => {
  const [reports, setReports] = useState([])
  const getReports = async () => {
    try {
      const response = await Url.get('/admin/getReports')
      setReports(response.data)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getReports()
  }, [])
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

          <AdminReport reports={reports} getReports={getReports} />
        </div>

      </div>
    </div>
  )
}

export default AdminReports