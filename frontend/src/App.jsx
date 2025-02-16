import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptionSignup from './pages/CaptionSignup'
import CaptionLogin from './pages/CaptionLogin'


const App = () => {
  return (
    <Routes>
      <Route path="/" element={ <Home/>} />
      <Route path="/login" element={ <UserLogin/>} />
      <Route path="/signup" element={ <UserSignup/>} />
      <Route path="/caption-login" element={ <CaptionLogin/>} />
      <Route path="/caption-signup" element={ <CaptionSignup/>} />

     </Routes>
  )
}

export default App