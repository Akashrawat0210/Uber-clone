import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Start'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptionSignup from './pages/CaptionSignup'
import CaptionLogin from './pages/CaptionLogin'
import Start from './pages/Start'
import UserProtectWrapper from './pages/UserProtectWrapper'



const App = () => {

  return (
    <Routes>
      <Route path="/" element={ <Start/>} />
      <Route path="/login" element={ <UserLogin/>} />
      <Route path="/signup" element={ <UserSignup/>} />
      <Route path="/caption-login" element={ <CaptionLogin/>} />
      <Route path="/caption-signup" element={ <CaptionSignup/>} />
      <Route path='/home' element={ 
        <UserProtectWrapper>
          <Home/>
        </UserProtectWrapper>
      } />

     </Routes>
  )
}

export default App