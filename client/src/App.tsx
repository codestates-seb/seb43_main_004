import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import UserSignIn from './pages/UserSignIn'
import UserSignUp from './pages/UserSignUp'
import UserFindPwd from './pages/UserFindPwd'
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import NotFound from './pages/NotFound'
import UserPage from './pages/UserPage'
import EditProfile from './components/User/EditProfile'
import ChangePwd from './components/User/ChangePwd'

function App() {
  return (
    <>
      {/* <Header /> */}
      <div className="App">
        <Routes>
          <Route path="/sign-in" element={<UserSignIn />} />
          <Route path="/sign-up" element={<UserSignUp />} />
          <Route path="/find-pwd" element={<UserFindPwd />} />
          <Route path="/userpage" element={<UserPage />}>
            <Route path="" element={<EditProfile />} />
            <Route path="change-pwd" element={<ChangePwd />} />
          </Route>
          <Route path="/*" element={<NotFound error="404" />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
