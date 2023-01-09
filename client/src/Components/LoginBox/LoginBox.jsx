import React from "react";
import "./LoginBox.css";
import { Form, Input, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import Cookie from "js-cookie"
import Url from '../Instence/Base_uel'


const LoginBox = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const onFinish = async (loginData) => {
    try {

      const response = await Url.post("/login", loginData)
      if (response.data.admin) {
        toast.success(response.data.message)
        dispatch({ type: "ADMIN_LOGIN", payload: response.data });

        Cookie.set("adminData", JSON.stringify(response.data))

        navigate('/admin')
      } else {
        if (response.data.success) {
          toast.success(response.data.message)
          toast("Redrection to Home page")
          dispatch({ type: "LOGIN", payload: response.data });
          Cookie.set("userData", JSON.stringify(response.data))
          navigate('/')
        } else {
          toast.error(response.data.message)
          navigate('/login')

        }

      }



    } catch (error) {

    }

  }
  return (
    <div className="LoginBox">
      <div className="LoginBox-container">
        <div className="LoginBox-Name">
          <h3>LOGIN</h3>
        </div>
        <div className="LoginBox-input">
          <Form onFinish={onFinish} className="LoginBox-Form">
            <Form.Item name="email" rules={[
              { required: true, message: '*Enter Your Email' },
              { required: true, type: "email", message: "The input is not valid E-mail!", }
            ]}>
              <Input
                className="LoginBox-inpiut-field"
                type="text"
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item name="password" rules={[
              { required: true, message: '*Enter Your Password' },
              { min: 8, message: 'Password must be minimum 8 Numbers.' }

            ]}>
              <Input
                className="LoginBox-inpiut-field"
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <div className="LoginBox-button">
              <Button htmlType="submit">LOGIN</Button>
              <Link className="anchor" to="/Signup">Signup</Link>
            </div>
          </Form>
        </div>
      </div>
    </div>

  );
};

export default LoginBox;
