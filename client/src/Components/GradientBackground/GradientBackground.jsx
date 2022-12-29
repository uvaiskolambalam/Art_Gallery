import React from "react";
import "./GradientBackground.css";
import SignupImage from "../../Assets/Signup-image.png";

const GradientBackground = () => {
  return (
    <div className="GradientBackground">
      <div className="GradientBackground-image">
        <img src={SignupImage} alt="" />
      </div>
    </div>
  );
};

export default GradientBackground;
