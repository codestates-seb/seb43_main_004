import React, { useState } from 'react'
import styled from 'styled-components'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import { useNavigate } from 'react-router-dom'
import { checkEmail, checkPassword } from '../utils/userfunc'

interface AuthInfo {
  email: string
  auth: string
  password: string
  ckPassword: string
}

const UserFindPwd = () => {
  const navigate = useNavigate()
  const [values, setValues] = useState<AuthInfo>({
    email: '',
    auth: '',
    password: '',
    ckPassword: '',
  })
  const { email, auth, password, ckPassword } = values

  const [authNums, setAuthNums] = useState<string>('')
  const [isValid, setIsValid] = useState<boolean>(false) // 폼변
  const [error, setError] = useState<AuthInfo>({
    email: '',
    auth: '',
    password: '',
    ckPassword: '',
  })

  // 이메일, 비밀번호 입력값 핸들링
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setValues({
      ...values,
      [name]: value,
    })
  }

  // 인증번호 전송
  const sendNumber = (email: string) => {
    const msg = { email: '' }

    if (!email) {
      msg.email = '이메일을 입력해주세요.'
      setError({ ...error, ...msg })
      return
    }
    // 이메일이 정상적으로 입력되었는지 확인 후 인증번호 전송
    if (checkEmail(email)) {
      // api 호출
      setAuthNums('1111')
      setError({ ...error, ...msg })
    } else {
      msg.email = '이메일이 유효하지 않습니다.'
      setError({ ...error, ...msg })
    }
  }

  // 인증번호 확인
  const verifyNumber = () => {
    const msg = { auth: '' }

    console.log(`${values.auth}, ${authNums}`)
    // 인증번호가 유효한지 확인하고 유효하면 다음 폼으로 이동, 유효하지 않으면 에러 메세지...
    // 전송된 인증번호와 사용자의 입력값 비교
    if (auth === authNums) {
      setIsValid(true)
    } else {
      msg.auth = '인증번호가 일치하지 않습니다.'
      setError({ ...error, ...msg })
    }
  }

  // 비밀번호 변경
  const changePassword = () => {
    const msg = { password: '', ckPassword: '' }

    if (password.trim() === '') {
      msg.password = '새 비밀번호를 입력해주세요.'
      setError({ ...error, ...msg })
    }

    if (!checkPassword(password)) {
      msg.password = '최소 8자, 영문+숫자 조합으로 구성되어야 합니다.'
      setError({ ...error, ...msg })
    } else if (checkPassword(password) && password !== ckPassword) {
      msg.ckPassword = '새 비밀번호가 일치하지 않습니다.'
      setError({ ...error, ...msg })
    } else {
      alert('비밀번호가 변경 되었습니다.') // 모달로 대체할 예정
      navigate('/sign-in')
    }
  }

  return (
    <Container>
      <h1>비밀번호 찾기</h1>
      <form>
        {!isValid ? (
          <>
            <div className="flex-div">
              <Input
                label="이메일"
                type="email"
                name="email"
                placeholder="email"
                value={email}
                error={error.email}
                onChange={handleInput}
              />
              <div>
                <Button onClick={() => sendNumber(email)}>인증번호 전송</Button>
              </div>
            </div>
            <div className="flex-div">
              <Input
                label="인증번호"
                type="text"
                name="auth"
                placeholder=""
                value={auth}
                error={error.auth}
                onChange={handleInput}
              />
              <div>
                <Button onClick={verifyNumber} disabled={authNums === ''}>
                  인증번호 확인
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
            <Input
              label="새 비밀번호"
              type="password"
              name="password"
              value={password}
              placeholder="******"
              error={error.password}
              onChange={handleInput}
            />
            <Input
              label="새 비밀번호 확인"
              type="password"
              name="ckPassword"
              value={ckPassword}
              placeholder="******"
              error={error.ckPassword}
              onChange={handleInput}
            />
            <Button onClick={changePassword}>비밀번호 변경</Button>
          </>
        )}
      </form>
    </Container>
  )
}

const Container = styled.div`
  width: 38rem;
  padding: 3rem;
  border: 1px solid var(--color-light-gray);
  border-radius: 1.5rem;

  h1 {
    font-size: ${(props) => props.theme.fontSize.smh};
    text-align: center;
    margin-bottom: 2rem;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1.7rem;
  }

  .flex-div {
    width: 100%;
    display: flex;
    align-items: flex-center;
    gap: 0.6rem;

    button {
      position: relative;
      top: 2rem;
    }
  }
`

export default UserFindPwd
