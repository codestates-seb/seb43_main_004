// dto 데이터
export interface dtoReqSignup {
  email: string
  nickName: string
  password: string
  birth: string
  gender: string
  height: string
  weight: string
  activity: string
}

export interface dtoReqEmailCheck {
  email: string
}

export interface dtoReqVerifyEmail {
  email: string
}

export interface dtoReqverifiedemail {
  verifyEmail: number
}
