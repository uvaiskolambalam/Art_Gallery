import React from "react";
import "./OtpBox.css";
import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Otp from '../../Assets/otp.gif'
import Url from '../Instence/Base_uel'
const OtpBox = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [otp, setOtp] = useState(null);

  const handleChange = async (e) => {

    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await Url.post("/otp", {
      otp,
      location,
    });
    if (response.data.success) {

      toast.success(response.data.message);
      toast("Redrection to Home page");
      localStorage.setItem("userToken", response.data.token);
      navigate("/");
    } else {
      toast.error(response.data.message)
      navigate('/otp')
    }

  };
  return (
    <div className="Otp">
      <div className="Otp-container">
        <form action="" onSubmit={handleSubmit} className='Otp-form'>
          <div className="Otp-fields">
            <img className="otp-icon" src={Otp} alt="" />
            <h3>OTP Verification</h3>
            <div className="Otp-input">
              <input type="number" onChange={handleChange} name="otp" />
            </div>
            <div className="Otp-button">
              <button type="submit">submit</button>
            </div>
          </div>
        </form>
      </div>
      {/* <Form onFinish={onFinish}>
        <Form.Item>
        <Input
                type="number"
                placeholder="OTP"
              />
        </Form.Item>
        <Button htmlType='submit'>submit</Button>
      </Form> */}
    </div>
  );
};

export default OtpBox;
