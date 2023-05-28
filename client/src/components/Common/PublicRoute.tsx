import react from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { getCookie } from '../../utils/Cookie'

const PublicRoute = () => {
  // eslint-disable-next-line react/react-in-jsx-scope
  return !getCookie('access') ? <Outlet /> : <Navigate to="/" />
}

export default PublicRoute
