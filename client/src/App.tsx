import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import DiaryCheck from './pages/DiaryCheck'
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
import DiaryWrite from './pages/DiaryWrite'
import UpdateReady from './pages/UpdateReady'
import Landing from './pages/Landing'
import RecipeArchive from './pages/RecipeArchive'
import RecipeDetail from './pages/RecipeDetail'
import useTokenCheck from './store/hooks/useTokenCheck'

function App() {
  const location = useLocation()
  // useTokenCheck()

  return (
    <div className="App">
      <Header />
      {location.pathname === '/' ? (
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
      ) : (
        <div className="wrapper">
          <Routes>
            <Route path="/diaries" element={<DiaryCheck />} />
            <Route path="/diaries/:id" element={<DiaryDetail />} />
            <Route path="/diaries/:id/add" element={<DiaryWrite />} />
            <Route path="/diaries/:id/update" element={<DiaryWrite />} />
            <Route path="/community" element={<UpdateReady />} />
            <Route path="/nutrient" element={<FoodArchive />} />
            <Route path="/recipe" element={<RecipeArchive />} />
            <Route path="/recipe/:id" element={<RecipeDetail />} />
            <Route path="/sign-in" element={<UserSignIn />} />
            <Route path="/sign-up" element={<UserSignUp social={false} />} />
            {/* <Route path="/register" element={<UserSignUp social={true} />} /> */}
            <Route path="/find-pwd" element={<UserFindPwd />} />
            <Route path="/userpage" element={<UserPage />}>
              <Route path="" element={<EditProfile />} />
              <Route path="change-pwd" element={<ChangePwd />} />
            </Route>
            <Route path="/error/:error" element={<NotFound />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </div>
      )}
      <Footer />
    </div>
  )
}

export default App
