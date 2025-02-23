import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptionDataContext } from '../context/CaptionContext'
import './styles/CaptionLogin.css'

const CaptionLogin = () => {

  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {caption, setCaption} = React.useContext(CaptionDataContext);
    const navigate = useNavigate(); 
   
  
    const submitHandler = async (e) => {
      e.preventDefault(); 
      const caption={
        email: email,
        password: password,
      }
const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captions/login`, caption);

if(response.status === 200){
  const data = response.data;
  setCaption(data.caption);

  localStorage.setItem('token',data.token);
  navigate('/caption-home')
}

      setEmail(""); // Clear input
      setPassword(""); // Clear input
    };
  return (
    <div className="container">
      <div>
        <img
          className="logo"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSVCO4w_adxK32rCXFeKq3_NbLcR9b_js14w&s"
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
            Join a fleet? <Link to="/caption-signup" className="signup-link">Register as a Caption</Link>
          </p>
        </form>
      </div>

      <div>
        <Link to="/login" className="User-login-btn">
          Sign in as User
        </Link>
      </div>
    </div>
  );
}

export default CaptionLogin