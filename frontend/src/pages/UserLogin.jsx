import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles/UserLogin.css";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});

  const submitHandler = (e) => {
    e.preventDefault(); // Fixed typo
    setUserData({
      email: email,
      password: password,
    });
    setEmail(""); // Clear input
    setPassword(""); // Clear input
  };

  return (
    <div className="container">
      <div>
        <img
          className="logo"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber Logo"
        />
        <form onSubmit={submitHandler}>
          <h3 className="input-label">What's your email</h3>
          <input
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            placeholder="Enter your email"
          />
          <h3 className="input-label">Enter your password</h3>
          <input
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
            placeholder="Enter your password"
          />
          <button className="login-btn">Login</button>
          <p className="text-center">
            New here? <Link to="/signup" className="signup-link">Create new Account</Link>
          </p>
        </form>
      </div>

      <div>
        <Link to="/caption-login" className="caption-login-btn">
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
