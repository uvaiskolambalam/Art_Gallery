import React from "react";
import "./SignupBox.css";
import { Form, Input, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from 'react-hot-toast'
import Url from '../Instence/Base_uel'


const SignupBox = () => {
  const navigate=useNavigate()
  const onFinish =  async (value) => {
    
    try {
     
      const response = await Url.post("/signup",value);

     
      if(response.data.success){
       
        navigate('/otp',{state:{name:value.name,user_name:value.user_name,email:value.email,mobile:value.mobile,password:value.password}})
      }else{
        toast.error(response.data.message)
      }

      
      
    } catch (error) {}
  };

  return (
    <div className="SignupBox">
      <div className="SignupBox-container">
        <div className="SignupBox-Name">
          <h3>SIGNUP</h3>
        </div>
        <div className="SignupBox-input">
          <Form onFinish={onFinish} className="SignupBox-Form">
            <Form.Item name="name" rules={[
              {required:true,message:'*Enter Your Name'},
              {min: 5, message: 'Username must be minimum 5 characters.' },
              {pattern: /^[a-zA-Z0-9]+$/, message: 'Name can only include letters.', }
            ]}>
              <Input
              id="Name"
                className="SignupBox-inpiut-field"
                type="text"
                placeholder="Name"
              />
           
            </Form.Item>
            <Form.Item name="user_name" rules={[
              {required:true,message:'*Enter Your User_ame'},
              {min: 5, message: 'Username must be minimum 5 characters.' }
              ]}>
              <Input
                className="SignupBox-inpiut-field"
                type="text"
                placeholder="User Name"
              />
            </Form.Item>
            <Form.Item name="email" rules={[
              {required:true,message:'*Enter Your Email'},
              { required: true, type: "email", message: "The input is not valid E-mail!", }
              ]}>
              <Input
                className="SignupBox-inpiut-field"
                type="text"
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item name="mobile" rules={[
              {required:true,message:'*Enter Your Mobile'},
              {min: 10, message: 'Mobile must be minimum 10 Numbers.' },
              {max: 10, message: 'Mobile must be maximum 10 Numbers.' }
              ]}>
              <Input
                className="SignupBox-inpiut-field"
                type="number"
                placeholder="Mobile"
              />
            </Form.Item>
            <Form.Item name="password" rules={[
              {required:true,message:'*Enter Your Password'},
              {min: 8, message: 'Password must be minimum 8 Numbers.' }

              ]}>
              <Input
                className="SignupBox-inpiut-field"
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <div className="SignupBox-button">
              <Button htmlType="submit">SIGNUP</Button>
              <Link className="anchor" to="/login">
                Login
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
  
};
export default SignupBox;
