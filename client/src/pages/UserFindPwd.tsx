import React, { useState } from 'react'
import styled from 'styled-components'
import Button from '../components/Common/Button'
import Input from '../components/Common/Input'
import { useNavigate } from 'react-router-dom'

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
  const [error, setError] = useState<string>('') // 에러 메세지

  // 이메일, 비밀번호 입력값 핸들링
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setValues({
      ...values,
      [name]: value,
    })
  }

  // 인증번호 전송
  const sendNumber = () => {
    console.log('send authentication numbers')
    // 메일 전송을 위한 api 호출 하는 로직 ......
    // 이메일이 정상적으로 입력되었는지 확인
    // 인증번호 저장
    setAuthNums('1111')
  }

  // 인증번호 확인
  const verifyNumber = () => {
    console.log('verify authentication numbers')
    console.log(`${values.auth}, ${authNums}`)
    // 인증번호가 유효한지 확인하고 유효하면 다음 폼으로 이동, 유효하지 않으면 에러 메세지...
    // 전송된 인증번호와 사용자의 입력값 비교
    if (auth === authNums) {
      setIsValid(true)
      setError('')
    } else {
      setError('인증번호가 일치하지 않습니다.')
    }
  }

  // 비밀번호 변경
  const changePassword = () => {
    console.log('change password')

    if (password !== '' && password === ckPassword) {
      // 새 비밀번호가 일치하면...
      alert('비밀번호가 변경되었습니다.')
      navigate('/sign-in')
    } else {
      setError('비밀번호가 일치하지 않습니다.')
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
                onChange={handleInput}
              />
              <div>
                <Button onClick={sendNumber}>인증번호 전송</Button>
              </div>
            </div>
            <div className="flex-div">
              <Input
                label="인증번호"
                type="text"
                name="auth"
                placeholder=""
                value={auth}
                error={error}
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
              onChange={handleInput}
            />
            <Input
              label="새 비밀번호 확인"
              type="password"
              name="ckPassword"
              value={ckPassword}
              placeholder="******"
              error={error}
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
    gap: 1rem;
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
