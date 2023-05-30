import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import DiaryCheck from './pages/DiaryCheck'
import DiaryDetail from './pages/DiaryDetail'
import Header from './components/Common/Header'
import Footer from './components/Common/Footer'
import UserSignIn from './pages/UserSignIn'
import UserSignUp from './pages/UserSignUp'
import UserFindPwd from './pages/UserFindPwd'
import NotFound from './pages/NotFound'
import UserPage from './pages/UserPage'
import EditProfile from './components/User/EditProfile'
import ChangePwd from './components/User/ChangePwd'
import FoodArchive from './pages/FoodArchivePage'
import DiaryWrite from './pages/DiaryWrite'
import UpdateReady from './pages/UpdateReady'
import Landing from './pages/Landing'
import RecipeArchive from './pages/RecipeArchive'
import RecipeDetail from './pages/RecipeDetail'

import ScrollToTop from './utils/ScrollToTop'
import PrivateRoute from './components/Common/PrivateRoute'
import PublicRoute from './components/Common/PublicRoute'

function App() {
  const location = useLocation()
  const isLandingPage = location.pathname === '/'

  return (
    <div className="App">
      <ScrollToTop />
      <Header />
      {isLandingPage ? (
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Landing />
                <Footer showAlways={true} />
              </>
            }
          />
        </Routes>
      ) : (
        <div className="wrapper">
          <Routes>
            {/* 로그인한 유저만 접근 가능, 그 외엔 '/sign-in'으로 이동 */}
            <Route element={<PrivateRoute />}>
              <Route path="/diaries" element={<DiaryCheck />} />
              <Route path="/diaries/:id" element={<DiaryDetail />} />
              <Route path="/diaries/:id/add" element={<DiaryWrite />} />
              <Route path="/diaries/:id/update" element={<DiaryWrite />} />
              <Route path="/userpage" element={<UserPage />}>
                <Route path="" element={<EditProfile />} />
                <Route path="change-pwd" element={<ChangePwd />} />
              </Route>
            </Route>
            {/* 로그인 하지 않은 유저만 접근 가능, 그 외엔 '/'로 이동 */}
            <Route element={<PublicRoute />}>
              <Route path="/sign-in" element={<UserSignIn />} />
              <Route path="/sign-up" element={<UserSignUp social={false} />} />
              <Route path="/find-pwd" element={<UserFindPwd />} />
            </Route>

            <Route path="/community" element={<UpdateReady />} />
            <Route path="/nutrient" element={<FoodArchive />} />
            <Route path="/recipe" element={<RecipeArchive />} />
            <Route path="/recipe/:id" element={<RecipeDetail />} />

            <Route path="/error/:error" element={<NotFound />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </div>
      )}
      {!isLandingPage && <Footer />}
    </div>
  )
}

export default App
