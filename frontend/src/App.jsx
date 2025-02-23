import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import CaptionSignup from "./pages/CaptionSignup";
import CaptionLogin from "./pages/CaptionLogin";
import Start from "./pages/Start";
import UserProtectWrapper from "./pages/UserProtectWrapper";
import UserLogout from "./pages/UserLogout";
import Home from "./pages/Home";
import CaptionHome from "./pages/CaptionHome";
import CaptionProtectWrapper from "./pages/CaptionProtectWrapper";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/login" element={<UserLogin />} />
      <Route path="/signup" element={<UserSignup />} />
      <Route path="/caption-login" element={<CaptionLogin />} />
      <Route path="/caption-signup" element={<CaptionSignup />} />
      <Route
        path="/home"
        element={
          <UserProtectWrapper>
            <Home />
          </UserProtectWrapper>
        }
      />
      <Route
        path="/user/logout"
        element={
          <UserProtectWrapper>
            <UserLogout />
          </UserProtectWrapper>
        }
      />
      <Route path="caption-home" element={
        <CaptionProtectWrapper>
          <CaptionHome />
        </CaptionProtectWrapper>
      } />
    </Routes>
  );
};

export default App;
