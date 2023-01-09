import React from 'react';
import { Collapse } from 'antd';
import { useSelector } from 'react-redux';
const { Panel } = Collapse;
const AntdCollaps = ({tempUser}) => {
  const user = useSelector((state) => state.user);
  return(
    <div>
        <Collapse accordion>
    <Panel header="Over View" key="1">
      <p>Name: {tempUser ? tempUser.name :user.name}</p>
      <p>User Name: {tempUser ? tempUser.user_name : user.user_name}</p>
      <p>Email: {tempUser ? tempUser.email : user.email}</p>
      <p>Mobile: {tempUser ? tempUser.mobile: user.mobile}</p>
    </Panel>
    <Panel header="Work and Education" key="2">
      <p>studyed at {tempUser ? tempUser.university : user.university}</p>
      <p>work at software engineer</p>
    </Panel>
    <Panel header="Place Lived" key="3">
      <p>Lives at: {tempUser? tempUser.lives : user.lives}</p>
      <p> From: {tempUser ? tempUser.from : user.from}</p>
    </Panel>
    <Panel header="Family and relatiosip" key="4">
      <p>I am a art_Gallery User</p>
    </Panel>
  </Collapse>
    </div>
  )
  };
export default AntdCollaps;