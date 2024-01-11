import React, { useState } from 'react'
import styled from 'styled-components'
import Button from '../components/Common/Button'
import Input from '../components/Common/Input'
import { useNavigate } from 'react-router-dom'
import { checkEmail, checkPassword } from '../utils/userfunc'
import Modal from '../components/Common/Modal'
import axios from 'axios'

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
  const [change, setChange] = useState<boolean>(false) // 최종 변경
  const [error, setError] = useState<AuthInfo>({
    email: '',
    auth: '',
    password: '',
    ckPassword: '',
  })

  // 모달 핸들링
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [modalMsg, setModalMsg] = useState<string>('')
  const openModal = (msg: string) => {
    setIsOpen(true)
    setModalMsg(msg)
  }

  const closeModal = () => {
    if (change) {
      navigate('/sign-in')
      return
    }
    setIsOpen(false)
  }

  // 이메일, 비밀번호 입력값 핸들링
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setValues({
      ...values,
      [name]: value,
    })
  }

  // 인증번호 전송
  const sendNumber = async (email: string) => {
    const msg = { email: '' }
    const auth = { auth: '' }
    let isValid = false

    if (!email) {
      msg.email = '이메일을 입력해주세요.'
      setError({ ...error, ...msg })
      return
    }

    if (checkEmail(email)) {
      await axios
        .post(`${process.env.REACT_APP_SERVER_URL}/members/emailcheck`, {
          email: email,
        })
        .then((response) => {
          console.log(response.data)
          // 가입된 이메일이면
          if (response.data.data === true) {
            isValid = true
            openModal(
              '인증번호가 전송되었습니다. \n잠시후에 이메일을 확인해주세요.'
            )
            setError({ ...error, ...msg })
          } else {
            msg.email = '가입되지 않은 이메일입니다.'
            setError({ ...error, ...msg })
          }
        })
        .catch((error) => {
          setError({ ...error, ...msg })
        })
    } else {
      msg.email = '이메일이 유효하지 않습니다.'
      setError({ ...error, ...msg })
    }

    if (isValid) {
      // 인증번호 전송 api 호출
      await axios
        .post(
          `${process.env.REACT_APP_SERVER_URL}/members/findpassword/sendmail`,
          { email }
        )
        .then((response) => {
          // 가입된 이메일이면
          if (response.data.isactive === true) {
            setAuthNums(response.data.message)
            setError({ ...error, ...msg })
          }
        })
        .catch((error) => {
          setError({ ...error, ...msg })
        })

      setError({ ...error, ...msg })
    }
  }

  // 인증번호 확인
  const verifyNumber = () => {
    const msg = { auth: '' }

    // 인증번호가 유효한지 확인하고 유효하면 다음 폼으로 이동, 유효하지 않으면 에러 메세지...
    // 전송된 인증번호와 사용자의 입력값 비교
    if (auth === authNums) {
      openModal('인증이 완료 되었습니다.')
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
      msg.password =
        '최소 8자, 영문+숫자+특수문자(!@#$%&*?) 조합으로 구성되어야 합니다.'
      setError({ ...error, ...msg })
    } else if (checkPassword(password) && password !== ckPassword) {
      msg.ckPassword = '새 비밀번호가 일치하지 않습니다.'
      setError({ ...error, ...msg })
    } else {
      // 비밀번호 변경 API 호출
      axios
        .patch(`${process.env.REACT_APP_SERVER_URL}/members/findpassword`, {
          email: email,
          newPassword: password,
        })
        .then((response) => {
          setChange(true)
          openModal(
            '비밀번호가 성공적으로 변경되었습니다.\n로그인 페이지로 이동합니다.'
          )
        })
        .catch((error) => {
          if (axios.isAxiosError(error)) {
            if (error.response?.data.status === 401) {
              openModal('비밀번호를 변경할 수 없습니다.')
            } else {
              navigate(`/error/${error.response?.data.status}`)
            }
          }
        })
    }
  }

  return (
    <>
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
                  <Button onClick={() => sendNumber(email)}>
                    인증번호 전송
                  </Button>
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
      <Modal state={isOpen} setState={setIsOpen} msg={modalMsg}>
        <Button onClick={closeModal}>확인</Button>
      </Modal>
    </>
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
    gap: 1.8rem;
  }

  .flex-div {
    width: 100%;
    display: grid;
    grid-template-columns: 2fr 1.2fr;
    gap: 0.6rem;

    button {
      width: 100%;
      position: relative;
      top: 1.8rem;
    }
  }

  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
    padding: 2rem 1.8rem;

    .flex-div {
      grid-template-columns: 1fr;

      button {
        width: 100%;
        position: relative;
        top: 0;
    }
  }
`

export default UserFindPwd
