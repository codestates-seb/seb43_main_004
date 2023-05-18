import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import DiaryCheck from './components/diary/DiaryCheck'
import DiaryDetail from './components/diary/DiaryDetail'
import Header from './components/Common/Header'
import Footer from './components/Common/Footer'
import UserSignIn from './pages/UserSignIn'
import UserSignUp from './pages/UserSignUp'
import UserFindPwd from './pages/UserFindPwd'
import NotFound from './pages/NotFound'
import UserPage from './pages/UserPage'
import EditProfile from './components/User/EditProfile'
import ChangePwd from './components/User/ChangePwd'
import FoodArchive from './components/archieve/FoodArchivePage'

function App() {
  return (
    <div className="App">
      <Header />
      <div className="contents">
        <div className="Wrapper">
          <Routes>
            <Route path="/" element={<DiaryCheck />} />
            <Route path="/diaries" element={<DiaryCheck />} />
            <Route path="/diaries/:id" element={<DiaryDetail />} />
            <Route path="/nutrient" element={<FoodArchive />} />
            <Route path="/sign-in" element={<UserSignIn />} />
            <Route path="/sign-up" element={<UserSignUp social={false} />} />
            <Route path="/register" element={<UserSignUp social={true} />} />
            <Route path="/find-pwd" element={<UserFindPwd />} />
            <Route path="/userpage" element={<UserPage />}>
              <Route path="" element={<EditProfile />} />
              <Route path="change-pwd" element={<ChangePwd />} />
            </Route>
            <Route path="/*" element={<NotFound error="404" />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default App
