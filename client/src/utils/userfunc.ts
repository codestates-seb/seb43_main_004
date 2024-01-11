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

export const checkDate = (date: string): boolean => {
  // yyyy-mm-dd
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/

  if (!dateRegex.test(date)) {
    return false
  }

  const convertedDate = new Date(date)
  convertedDate.setHours(0, 0, 0, 0)

  if (isNaN(convertedDate.getTime())) {
    return false
  }

  const Today = new Date()
  Today.setHours(0, 0, 0, 0)

  if (Today < convertedDate) {
    // 현재 날짜보다 미래를 입력했으면 false
    return false
  }

  return true
}

export const checkNumber = (nums: string): boolean => {
  const converted = Number(nums)

  if (typeof converted === 'number' && converted > 0 && converted < 500) {
    return true
  }

  return false
}

export const userLogout = () => {
  removeCookie('access', { path: '/' })
  removeCookie('refresh', { path: '/' })
  localStorage.removeItem('profileState')
}
