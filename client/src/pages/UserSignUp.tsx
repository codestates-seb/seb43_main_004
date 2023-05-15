import React, { useState } from 'react'
import styled from 'styled-components'
import Input from '../components/common/Input'
import Button from '../components/common/Button'
import Radio from '../components/common/Radio'
import { genderList, activityScore } from '../utils/options'

interface Props {
  social?: boolean
}

interface userInfo {
  email?: string
  nickName: string
  password?: string
  gender: string
  activity: string
  height: number
  weight: number
  birth: string
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
  const [authNums, setAuthNums] = useState<string>('') // 인증번호
  const [error, setError] = useState<string>('')
  const [isEmpty, setIsEmpty] = useState<boolean>(true)

  // 사용자 입력값 핸들링
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setValues({ ...values, [name]: value })
    console.log(name, value)
  }

  // 인증번호 전송
  const sendNumbers = () => {
    // 이메일이 정상적으로 입력되었는지 확인(@/.)
    // 정상적으로 입력되지 않았다면 에러 메세지
    console.log('/members/emailcheck, email')
    console.log('/members/sendverifyemail, email')
  }
  // 인증번호 확인
  const verifyNumbers = () => {
    console.log('/members/verifiedemail, verifyEmail')
  }
  // 닉네임 중복확인
  const checkDuplicate = () => {
    console.log('/members/nicknamecheck, nickName')
    if (nickName !== '') {
      return
    }
  }
  // 가입하기 - 모든 값이 유효한 경우 버튼 활성화
  const checkValid = () => {
    console.log('/members/signup')

    if (values.email == '' || values.password == '') {
      setError('error message')
      return
    }
    setError('')
  }
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
                onChange={handleInput}
              />
              <div>
                <Button onClick={sendNumbers}>인증번호 전송</Button>
              </div>
            </div>
            <div className="flex-div">
              <Input
                label="인증번호"
                type="text"
                name="auth"
                placeholder="0000"
                error={error}
                onChange={handleInput}
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
            error={error}
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
              onChange={handleInput}
            />
            <Input
              label="비밀번호 확인"
              type="password"
              name="passwordcheck"
              placeholder="비밀번호를 입력해주세요"
              error={error}
              onChange={handleInput}
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
