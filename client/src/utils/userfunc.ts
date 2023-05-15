export const checkEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  // const emailRegex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,}')
  return emailRegex.test(email)
}
