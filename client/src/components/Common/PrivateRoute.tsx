import react from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { getCookie } from '../../utils/Cookie'

const PrivateRoute = () => {
  // eslint-disable-next-line react/react-in-jsx-scope
  return getCookie('access') ? <Outlet /> : <Navigate to="/sign-in" replace />
}

export default PrivateRoute
