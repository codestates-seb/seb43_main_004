import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { userLogout } from '../../utils/userfunc'
import { getCookie } from '../../utils/Cookie'

const useTokenCheck = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const checkToken = () => {
      if (!getCookie('access')) {
        navigate('/sign-in', { replace: true })
      }
    }

    checkToken()
  }, [])
}

export default useTokenCheck
