import React from "react";
import { Link } from "react-router-dom";
import "./styles/Start.css";  
const Start = () => {
  return (
    <div className="home-container">
      <div className="background">
        <img
          className="logo"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber Logo"
        />
        <div className="content">
          <h2 className="title">Get Started with Uber</h2>
          <Link to="/login" className="continue-btn">
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Start;
