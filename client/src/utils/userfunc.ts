import { getCookie, removeCookie } from './Cookie'

export const checkEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return emailRegex.test(email)
}

export const checkPassword = (password: string): boolean => {
  // 8자 이상, 문자와 숫자 포함
  const pwdRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/
  return pwdRegex.test(password)
}

export const userLogout = () => {
  removeCookie('access', { path: '/' })
  removeCookie('refresh', { path: '/' })
  localStorage.removeItem('profileState')
}
