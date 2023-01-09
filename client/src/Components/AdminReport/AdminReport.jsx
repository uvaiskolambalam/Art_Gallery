import React from 'react'
import './AdminReport.css'
import Url from '../Instence/Base_uel'
const AdminReport = ({ reports,getReports }) => {
    const postBlock = async (postId) => {
        console.log(postId, "postId");
        try {
           await Url.patch("/admin/blockPost", { postId });
           getReports();
        } catch (error) {
          console.log(error);
        }
      };

  return (
    <div className="AdminUser">
      <table className="AdminUserTable">
        <tr>
          <th>SlNo</th>
          <th>Post Owner</th>
          <th>Post Reporter</th>
          <th>Post Image</th>
          <th>Action</th>
        </tr>
              {reports.map((item,key) => (
          
          <tr key={key} className="bodyTR">
                      <td>{ key+1}</td >
                      <td className='rep-profileImage'><img src={item.userId.profileImage} alt="" /><p>{item.userId.user_name}</p><p>{ item.userId.email}</p></td>
            {item.reports.map((a) => (
                          
                <td className='rep-profileImage'><img src={a.profileImage} alt="" /><p>{a.user_name}</p><p>{a.email}</p></td>
            ))}
            <td className='rep-postImage'>{ <img className='postImage' src={item.imageUrl} alt="" />}</td>
            <td className="blockButton">
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
  )
}

export default AdminReport