import React, { useState } from 'react'
import styled from 'styled-components'
import Input from '../components/common/Input'
import Button from '../components/common/Button'
import { useNavigate, Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import { checkEmail } from '../utils/userfunc'

interface userType {
  email: string
  password: string
}

const UserSignIn = () => {
  const navigate = useNavigate()
  const [values, setValues] = useState<userType>({ email: '', password: '' })
  const [error, setError] = useState<string>('')

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setValues({
      ...values,
      [name]: value,
    })
  }

  const checkValid = () => {
    if (!checkEmail(values.email) || values.password == '') {
      setError('이메일 혹은 비밀번호가 잘못되었거나 유효하지 않습니다.')
      return
    }
    setError('')
    navigate('/userpage')
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
        <Input
          label="비밀번호"
          type="password"
          name="password"
          placeholder="password"
          error={error}
          onChange={handleInput}
        />
      </Form>
      <Button onClick={checkValid}>로그인</Button>
      <Button outline="true" onClick={() => console.log('google social login')}>
        구글 계정으로 로그인
      </Button>
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
