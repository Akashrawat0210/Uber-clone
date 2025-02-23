import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CaptionDataContext } from "../context/CaptionContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./styles/CaptionSignup.css"; // Import CSS

const CaptionSignup = () => {

const navigate = useNavigate();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vehicleColor, setVehicleColor] = useState(""); 
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");



  const { caption, setCaption } = React.useContext(CaptionDataContext);

 const submitHandler = async (e) => {
  e.preventDefault();
  
  const captionData = {
    firstname,
    lastname,
    email,
    password,
    vehicleColor,  // Correct structure (not inside `vehicle` object)
    vehiclePlate,
    vehicleCapacity: Number(vehicleCapacity), // Ensure it's a number
    vehicleType: vehicleType.toLowerCase().trim(), // Ensure lowercase
  };

  console.log("Sending Data:", captionData); // Debugging

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/captions/register`, 
      captionData
    );

    if (response.status === 200) {
      const data = response.data;
      setCaption(data.caption);
      localStorage.setItem("token", data.token);
      navigate("/caption-home")
    }
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
  }


// Reset fields after successful submission
setFirstname("");
setLastname("");
setEmail("");
setPassword("");
setVehicleColor("");
setVehiclePlate("");
setVehicleCapacity("");
setVehicleType("");

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

          <h3 className="input-label">Vehicle Information</h3>
          <div className="input-group">
            <input
              className="input-field"
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
              required
              type="text"
              placeholder="Vehicle Color"
            />
            <input
              className="input-field"
              value={vehiclePlate}
              onChange={(e) => setVehiclePlate(e.target.value)}
              required
              type="text"
              placeholder="Vehicle Plate"
            />
          </div>

          <div className="input-group">
            <input
              className="input-field"
              value={vehicleCapacity}
              onChange={(e) => setVehicleCapacity(e.target.value)}
              required
              type="number"
              placeholder="Vehicle Capacity"
            />
            <select
              className="input-field"
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              required
            >
              <option value="" disabled>
                Select Vehicle Type
              </option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="bike">Bike</option>
            </select>
          </div>

          <button className="login-btn">Sign Up</button>
          <p className="text-center">
            Already have an account?{" "}
            <Link to="/caption-login" className="login-link">
              Login here
            </Link>
          </p>
        </form>
      </div>

      <div>
        <p className="small-text">
          This site is protected by reCAPTCHA and the{" "}
          <span className="underline">Google Privacy</span> and{" "}
          <span>Terms of Service apply.</span>
        </p>
      </div>
    </div>
  );
};

export default CaptionSignup;
