import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import Input from '../components/Common/Input'
import Button from '../components/Common/Button'
import Radio from '../components/Common/Radio'
import { genderList, activityScore } from '../utils/options'
import { checkEmail, checkPassword } from '../utils/userfunc'
import { ApiCaller } from '../utils/apiCaller'
import {
  dtoReqEmailCheck,
  dtoReqVerifyEmail,
} from '../dto/membership/members/dtoSignup'
import { dtoResponse } from '../dto'
import { debounce } from '../utils/timefunc'
import axios from 'axios'
import Modal from '../components/Common/Modal'
import { useNavigate } from 'react-router-dom'
import PwdInput from '../components/Common/PwdInput'

interface Props {
  social?: boolean
}

interface userInfo {
  [key: string]: any
  email: string
  nickName: string
  password: string
  gender: string
  activity: string
  height: number
  weight: number
  birth: string
}

interface authentication {
  auth: string
  ckAuth: string
}

interface errorType {
  email: string
  auth: string
  nickName: string
  password: string
  ckPassword: string
}

interface successType {
  auth: string
  nickName: string
}

const UserSignUp = ({ social }: Props) => {
  const navigate = useNavigate()
  const [values, setValues] = useState<userInfo>({
    email: '',
    nickName: '',
    password: '',
    gender: 'male',
    activity: 'NONE_ACTIVE',
    height: 0,
    weight: 0,
    birth: '',
  })

  const { email, nickName, password } = values

  const [ckPassword, setCkPassword] = useState<string>('')
  const [nameCheck, setNameCheck] = useState<string>('') // 닉네임 비교
  const [authNums, setAuthNums] = useState<authentication>({
    auth: '',
    ckAuth: '',
  })

  const [error, setError] = useState<errorType>({
    email: '',
    auth: '',
    nickName: '',
    password: '',
    ckPassword: '',
  })

  const [success, setSuccess] = useState<successType>({
    auth: '',
    nickName: '',
  })

  const [isEmpty, setIsEmpty] = useState<boolean>(true) // 버튼 활성화 여부
  const [isConfirm, setIsConfirm] = useState<boolean>(false) // 인증번호 확인 여부
  const [isOpen, setIsOpen] = useState<boolean>(false) // 모달 오픈
  const [modalMsg, setModalMsg] = useState<string>('') // 모달 메세지
  const openModal = (msg: string) => {
    setIsOpen(true)
    setModalMsg(msg)
  }
  const closeModal = () => {
    if (!isEmpty && nameCheck === nickName) {
      navigate('/sign-in')
      return
    }
    setIsOpen(false)
  }

  // 사용자 입력값 핸들링
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setValues({ ...values, [name]: value })
  }

  const handleAuthNum = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setAuthNums({ ...authNums, [name]: value })
  }

  // 인증번호 전송
  const sendNumbers = async (email: string) => {
    const auth = { auth: '' }
    const msg = { email: '' }
    let isValid = false

    if (!email) {
      msg.email = '이메일을 입력해주세요.'
      setError({ ...error, ...msg })
      return
    }

    const emailData: Partial<userInfo> = {
      email: email,
    }

    // 이메일이 정상적으로 입력되었는지 확인 후 이메일 중복 체크
    if (checkEmail(email)) {
      await axios
        .post(
          `${process.env.REACT_APP_SERVER_URL}/members/emailcheck`,
          emailData
        )
        .then((response) => {
          // 가입된 이메일이 아니면
          if (response.data.data === false) {
            isValid = true
            openModal(
              '인증번호가 전송되었습니다. \n잠시후에 이메일을 확인해주세요.'
            )
            setError({ ...error, ...msg })
          } else {
            msg.email = '이미 사용 중인 이메일입니다.'
            setError({ ...error, ...msg })
          }
        })
        .catch((error) => {
          setError({ ...error, ...msg })
        })
    } else {
      msg.email = '이메일 형식이 올바르지 않습니다.'
      setError({ ...error, ...msg })
    }

    if (isValid) {
      // 인증번호 전송 api 호출
      await axios
        .post(`${process.env.REACT_APP_SERVER_URL}/members/sendmail`, emailData)
        .then((response) => {
          // 가입된 이메일이 아니면
          if (response.data.isactive === false) {
            auth.auth = response.data.message
            setAuthNums({ ...authNums, ...auth })
            setError({ ...error, ...msg })
          } else {
            msg.email = '이미 사용 중인 이메일입니다.'
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
  const verifyNumbers = () => {
    const msg = { auth: '' }

    if (authNums.auth === '') {
      msg.auth = '인증번호가 전송되지 않았습니다.'
      setError({ ...error, ...msg })
      return
    }

    if (authNums.ckAuth === '') {
      msg.auth = '인증번호를 입력해주세요.'
      setError({ ...error, ...msg })
      return
    }

    if (authNums.auth !== authNums.ckAuth) {
      msg.auth = '인증번호가 일치하지 않습니다.'
      setError({ ...error, ...msg })
    } else {
      setIsConfirm(true)
      openModal('인증이 완료되었습니다.')
      setError({ ...error, ...msg })
    }
  }

  // 닉네임 중복확인
  const cantUse = 'cant-use'
  const checkDuplicate = () => {
    const msg = { nickName: '' }
    setError({ ...error, ...msg })

    if (nickName.trim() === '') {
      msg.nickName = '닉네임을 입력해주세요.'
      setError({ ...error, ...msg })
      return
    } else if (nickName.length > 8) {
      msg.nickName = '사용할 수 없는 닉네임입니다 (8자 초과)'
      setError({ ...error, ...msg })
      return
    }

    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/members/nicknamecheck`, {
        nickName,
      })
      .then((response) => {
        // 중복 여부에 따른 분기
        if (response.data.data === false) {
          setError({ ...error, ...msg })
          msg.nickName = '사용 가능한 닉네임입니다.'
          setSuccess({ ...success, ...msg })
          setNameCheck(nickName)
        } else {
          setSuccess({ ...success, ...msg })
          msg.nickName = '이미 사용 중인 닉네임입니다.'
          setError({ ...error, ...msg })
          setNameCheck(cantUse)
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  // 비밀번호 유효성 검사
  const isValidPassword = () => {
    const msg = { password: '', ckPassword: '' }

    if (!checkPassword(password)) {
      msg.password =
        '최소 8자, 영문+숫자+특수문자(!@#$%&*?) 조합으로 구성되어야 합니다.'
      setError({ ...error, ...msg })
    } else if (password !== ckPassword) {
      msg.ckPassword = '비밀번호가 일치하지 않습니다.'
      setError({ ...error, ...msg })
    } else {
      setError({ ...error, ...msg })
    }
  }

  // 버튼 활성화를 위한 입력값 검증
  const checkValues = useCallback(
    debounce((values: userInfo, isConfirm: boolean, ckpwd: string) => {
      let isBlank = false
      let isNotValid = true

      for (const key in values) {
        if (values[key] === '') {
          isBlank = true
        }
      }

      if (
        !isBlank &&
        isConfirm &&
        ckpwd === values.password &&
        values.height > 0 &&
        values.weight > 0
      ) {
        isNotValid = false
      }

      setIsEmpty(isNotValid)
    }, 700),
    []
  )

  // 가입하기 - 모든 값이 유효한 경우 버튼 활성화
  const registerUser = () => {
    // ApiCaller<userInfo, dtoResponse>('POST', 'members/signup', values)
    if (nameCheck !== nickName || nameCheck === cantUse) {
      openModal('닉네임 중복 확인 필요')
      return
    }

    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/members/signup`, values)
      .then((response) => {
        openModal('회원가입이 완료되었습니다. \n로그인 페이지로 이동합니다.')
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          navigate(`/error/${error.response?.data.status}`)
        }
      })
  }

  useEffect(() => {
    checkValues(values, isConfirm, ckPassword)
  }, [values, isConfirm, ckPassword])

  return (
    <>
      <Container>
        <h1>회원가입</h1>
        <Form>
          {!social && (
            <>
              <div className="flex-div">
                <Input
                  label="이메일"
                  type="email"
                  name="email"
                  placeholder="이메일"
                  error={error.email}
                  disabled={isConfirm}
                  onChange={handleInput}
                />
                <div>
                  <Button
                    disabled={isConfirm}
                    onClick={() => sendNumbers(email)}
                  >
                    인증번호 전송
                  </Button>
                </div>
              </div>
              <div className="flex-div">
                <Input
                  label="인증번호"
                  type="text"
                  name="ckAuth"
                  placeholder="인증번호"
                  error={error.auth}
                  success={isConfirm ? success.auth : ''}
                  disabled={isConfirm}
                  onChange={handleAuthNum}
                />
                <div>
                  <Button disabled={isConfirm} onClick={verifyNumbers}>
                    인증번호 확인
                  </Button>
                </div>
              </div>
            </>
          )}

          <div className="flex-div">
            <Input
              label="닉네임"
              type="text"
              name="nickName"
              placeholder="8자 이내의 문자열"
              error={error.nickName}
              success={success.nickName}
              onChange={handleInput}
            />
            <div>
              <Button onClick={checkDuplicate}>중복확인</Button>
            </div>
          </div>
          {!social && (
            <>
              <PwdInput
                label="비밀번호"
                name="password"
                placeholder="영문, 숫자, 특수문자를 조합하여 최소 8자 이상"
                error={error.password}
                onChange={handleInput}
                onBlur={isValidPassword}
              />
              <PwdInput
                label="비밀번호 확인"
                name="passwordcheck"
                placeholder="비밀번호를 입력해주세요"
                error={error.ckPassword}
                onChange={(e) => setCkPassword(e.target.value)}
                onBlur={isValidPassword}
              />
            </>
          )}

          <div className="grid-div">
            <Radio
              legend="성별"
              radioArray={genderList}
              checkedValue={values.gender}
              onChange={handleInput}
            />
            <Input
              label="생년월일"
              type="date"
              name="birth"
              onChange={handleInput}
            />
            <Input
              label="신장(cm)"
              type="number"
              name="height"
              placeholder="170"
              onChange={handleInput}
            />
            <Input
              label="체중(kg)"
              type="number"
              name="weight"
              placeholder="65"
              onChange={handleInput}
            />
          </div>

          <Radio
            legend="활동수준"
            radioArray={activityScore}
            checkedValue={values.activity}
            onChange={handleInput}
          />
        </Form>
        <ul>
          <li>매우 낮음: 앉아서 일하거나 활동을 거의 하지 않는 경우</li>
          <li>낮음: 가벼운 운동이나 걷기를 하는 경우</li>
          <li>보통: 일주일에 몇 차례 유산소 운동을 하는 경우</li>
          <li>높음: 매일 운동을 꾸준히 하는 경우</li>
          <li>매우 높음: 매일 고강도의 운동을 하는 경우</li>
        </ul>
        <Button disabled={isEmpty} onClick={registerUser}>
          가입하기
        </Button>
      </Container>
      <Modal state={isOpen} setState={setIsOpen} msg={modalMsg}>
        <Button onClick={closeModal}>확인</Button>
      </Modal>
    </>
  )
}

const Container = styled.div`
  width: 40rem;
  border: 1px solid var(--color-light-gray);
  border-radius: 1.5rem;
  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;

  h1 {
    font-size: ${(props) => props.theme.fontSize.smmh};
    text-align: center;
  }

  li {
    font-size: 1.4rem;
  }

  li:nth-child(even) {
    margin: 0.4rem 0;
  }
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;

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

  .grid-div {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    row-gap: 1.6rem;
    column-gap: 0.6rem;
  }
`
export default UserSignUp
