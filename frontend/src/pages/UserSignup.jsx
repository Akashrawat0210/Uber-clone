import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext"; // Ensure correct path
import "./styles/UserSignup.css";

const UserSignup = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});

  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext); // useContext now works

  const submitHandler = async (e) => {
    e.preventDefault();
    const newUser = {
      firstname,
      lastname,
      email,
      password,
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);
      if (response.status === 201) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem("token", data.token);
        navigate("/login");
      }
    } catch (error) {
      console.error("Signup Error:", error);
    }

    setFirstname("");
    setLastname("");
    setEmail("");
    setPassword("");
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
          <h3 className="input-label">What's your name</h3>
          <div className="input-group">
            <input
              className="input-field"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
              type="text"
              placeholder="First-name"
            />
            <input
              className="input-field"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
              type="text"
              placeholder="Last-name"
            />
          </div>

          <h3 className="input-label">What's your email</h3>
          <input
            className="input-field full-width"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            placeholder="Enter your email"
          />

          <h3 className="input-label">Enter your password</h3>
          <input
            className="input-field full-width"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
            placeholder="Enter your password"
          />

          <button className="login-btn">Sign Up</button>
          <p className="text-center">
            Already have an account?{" "}
            <Link to="/login" className="login-link">
              Login here
            </Link>
          </p>
        </form>
      </div>

      <div>
        <p className="small-text">
          By proceeding, you consent to receive calls, WhatsApp, or SMS
          messages, including automated messages, from Uber and its affiliates
          to the number provided.
        </p>
      </div>
    </div>
  );
};

export default UserSignup;
