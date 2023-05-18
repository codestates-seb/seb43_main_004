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

const UserSignUp = ({ social }: Props) => {
  const [values, setValues] = useState<userInfo>({
    email: '',
    nickName: '',
    password: '',
    gender: 'male',
    activity: '적음',
    height: 0,
    weight: 0,
    birth: '',
  })

  const { email, nickName, password, gender, activity, height, weight, birth } =
    values
  const [ckPassword, setCkPassword] = useState<string>('')
  const [authNums, setAuthNums] = useState<authentication>({
    auth: '',
    ckAuth: '',
  })

  console.log(nickName, gender, activity, height, weight, birth) // 빌드를 위한 콘솔

  const [error, setError] = useState<errorType>({
    email: '',
    auth: '',
    nickName: '',
    password: '',
    ckPassword: '',
  })
  const [isEmpty, setIsEmpty] = useState<boolean>(true) // 버튼 활성화 여부
  const [isConfirm, setIsConfirm] = useState<boolean>(false) // 인증번호 확인 여부

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
  const sendNumbers = (email: string) => {
    const auth = { auth: '' }
    const msg = { email: '' }
    let isValid = false

    if (!email) {
      msg.email = '이메일을 입력해주세요.'
      setError({ ...error, ...msg })
      return
    }

    // 이메일이 정상적으로 입력되었는지 확인 후 이메일 중복확인 api 호출
    if (checkEmail(email)) {
      console.log('/members/emailcheck, email') // 중복확인 후 중복이 아니면 isValid = true
      isValid = true
    } else {
      msg.email = '이메일이 유효하지 않습니다.'
      setError({ ...error, ...msg })
    }

    if (isValid) {
      console.log('/members/sendverifyemail, email') // 인증번호 전송 api 호출
      auth.auth = '1111'
      setError({ ...error, ...msg })
      setAuthNums({ ...authNums, ...auth })
    }
  }

  // 인증번호 확인
  const verifyNumbers = () => {
    const msg = { auth: '' }
    console.log(authNums)
    if (authNums.auth.trim() === '') {
      msg.auth = '인증번호를 입력해주세요.'
      setError({ ...error, ...msg })
      return
    }

    if (authNums.auth !== authNums.ckAuth) {
      msg.auth = '인증번호가 일치하지 않습니다.'
      setError({ ...error, ...msg })
    } else {
      setIsConfirm(true)
      setError({ ...error, ...msg })
      alert('인증이 완료되었습니다.')
    }
  }

  // 닉네임 중복확인
  const checkDuplicate = () => {
    console.log('/members/nicknamecheck, nickName')
    // api res값에 따라 모달로 에러 메세지 띄우기
  }

  // 비밀번호 유효성 검사
  const isValidPassword = () => {
    const msg = { password: '', ckPassword: '' }

    if (!checkPassword(password)) {
      msg.password = '최소 8자, 영문+숫자 조합으로 구성되어야 합니다.'
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
  const checkValid = () => {
    console.log('/members/signup')
  }

  useEffect(() => {
    checkValues(values, isConfirm, ckPassword)
  }, [values, isConfirm, ckPassword])

  return (
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
                placeholder="email"
                error={error.email}
                disabled={isConfirm}
                onChange={handleInput}
              />
              <div>
                <Button onClick={() => sendNumbers(email)}>
                  인증번호 전송
                </Button>
              </div>
            </div>
            <div className="flex-div">
              <Input
                label="인증번호"
                type="text"
                name="ckAuth"
                placeholder="0000"
                error={error.auth}
                disabled={isConfirm}
                onChange={handleAuthNum}
              />
              <div>
                <Button onClick={verifyNumbers}>인증번호 확인</Button>
              </div>
            </div>
          </>
        )}

        <div className="flex-div">
          <Input
            label="닉네임"
            type="text"
            name="nickName"
            placeholder="홍길순"
            error={error.nickName}
            onChange={handleInput}
          />
          <div>
            <Button onClick={checkDuplicate}>중복확인</Button>
          </div>
        </div>
        {!social && (
          <>
            <Input
              label="비밀번호"
              type="password"
              name="password"
              placeholder="영문+숫자 조합하여 최소 8자 이상"
              error={error.password}
              onChange={handleInput}
              onBlur={isValidPassword}
            />
            <Input
              label="비밀번호 확인"
              type="password"
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
        <li>주로 앉아서 생활하는 사람 : 적음</li>
        <li>회사원 등 어느 정도 규칙적인 생활을 하는 사람 : 보통</li>
        <li>육체 노동자 등 신체 활동이 많은 사람 : 많음</li>
      </ul>
      <Button disabled={isEmpty} onClick={checkValid}>
        가입하기
      </Button>
    </Container>
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

  li:nth-child(2) {
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
