import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import Input from '../components/Common/Input'
import Button from '../components/Common/Button'
import { useNavigate, Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import { checkEmail } from '../utils/userfunc'
import axios from 'axios'
import { getCookie, setCookie } from '../utils/Cookie'
import { __getUser } from '../store/slices/profileSlice'
import { useDispatch } from 'react-redux'
import customInstance from '../utils/customInstance'
import PwdInput from '../components/Common/PwdInput'

interface userType {
  email: string
  password: string
}

const UserSignIn = () => {
  const navigate = useNavigate()
  const [values, setValues] = useState<userType>({ email: '', password: '' })
  const [error, setError] = useState<string>('')
  const dispatch = useDispatch()

  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setValues((values) => ({
      ...values,
      [name]: value,
    }))
  }, [])

  // 로그인
  const checkValid = async () => {
    if (!checkEmail(values.email) || values.password == '') {
      setError('이메일 혹은 비밀번호가 잘못되었거나 유효하지 않습니다.')
      return
    }
    // 액세스 토큰 발급(로그인)
    await axios
      .post(`${process.env.REACT_APP_SERVER_URL}/members/login`, values, {
        headers: {
          Authorization: `Bearer ${getCookie('access')}`, // 테스트 서버 이용할때는 붙였다가 삭제하면 됨
        },
      })
      .then((response) => {
        console.log(response.data)
        const tokenWithNoBearer = response.data.accessToken.substr(7)
        const tokenForReissue = response.data.refreshToken

        const current = new Date()
        current.setMinutes(current.getMinutes() + 30)

        setCookie('access', tokenWithNoBearer, {
          path: '/',
          expires: current,
        })

        current.setMinutes(current.getMinutes() + 1440)
        setCookie('refresh', tokenForReissue, {
          path: '/',
          expires: current,
        })
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          if (error.response?.data.status === 401) {
            setError('존재하지 않는 계정입니다.')
          } else {
            navigate(`/error/${error.response?.data.status}`)
          }
        }
      })

    // 발급받은 토큰으로 유저 정보 얻어오기
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/members/myprofile`, {
        headers: {
          Authorization: `Bearer ${getCookie('access')}`,
          'Content-Type': 'application / json',
          'ngrok-skip-browser-warning': '69420', // 테스트 서버 이용할때는 붙였다가 삭제하면 됨
        },
      })
      .then((response) => {
        dispatch(__getUser(response.data.data))
        navigate(`/diaries`)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <Container>
      <Logo>
        <img src={logo} alt="logo" />
      </Logo>
      <Form>
        <Input
          label="이메일"
          type="email"
          name="email"
          placeholder="email"
          onChange={handleInput}
        />
        <PwdInput
          label="비밀번호"
          name="password"
          placeholder="password"
          error={error}
          onChange={handleInput}
        />
      </Form>
      <Button onClick={checkValid}>로그인</Button>
      <div className="padding-box">
        <span>비밀번호를 잊으셨나요?</span>
        <StyledLink to="/find-pwd">비밀번호 찾기</StyledLink>
      </div>
      <div>
        <span>아직 회원이 아니신가요?</span>
        <StyledLink to="/sign-up">회원가입</StyledLink>
      </div>
    </Container>
  )
}

const Container = styled.div`
  width: 34rem;
  border: 1px solid var(--color-light-gray);
  border-radius: 1.5rem;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;

  .padding-box {
    padding-top: 1.2rem;
  }

  > div {
    display: flex;
    justify-content: center;
  }

  span {
    font-size: 1.2rem;
  }

  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
    padding: 2rem 1.8rem;
  }
`

const Logo = styled.div`
  img {
    width: 9rem;
  }
`

const StyledLink = styled(Link)`
  margin-left: 0.6rem;
  color: var(--color-point);
  font-size: 1.2rem;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin: 2rem 0;
`

export default UserSignIn
