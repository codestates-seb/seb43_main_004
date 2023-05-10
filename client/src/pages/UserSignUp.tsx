import React, { useState } from 'react'
import styled from 'styled-components'
import Input from '../components/common/Input'
import Button from '../components/common/Button'
import Radio from '../components/common/Radio'

interface userInfo {
  email: string
  nickname: string
  password: string
  gender: string
  score: string
}

type radio = {
  id: string
  name: string
  value: string
}

const UserSignUp = () => {
  const gender: radio[] = [
    { id: 'male', name: 'gender', value: 'male' },
    { id: 'female', name: 'gender', value: 'female' },
  ]

  const activityScore: radio[] = [
    { id: '1', name: 'score', value: '적음' },
    { id: '2', name: 'score', value: '보통' },
    { id: '3', name: 'score', value: '많음' },
  ]

  const [values, setValues] = useState<userInfo>({
    email: '',
    nickname: '',
    password: '',
    gender: 'male',
    score: '적음',
  })
  const [error, setError] = useState<string>('')
  const [isValid, setIsValid] = useState<boolean>(false)

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setValues({
      ...values,
      [name]: value,
    })
  }

  const checkValid = () => {
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
        <div className="flex-div">
          <Input
            label="이메일"
            type="email"
            name="email"
            placeholder="email"
            onChange={handleInput}
          />
          <div>
            <Button onClick={() => console.log('인증번호 전송')}>
              인증번호 전송
            </Button>
          </div>
        </div>
        <div className="flex-div">
          <Input
            label="인증번호"
            type="text"
            name="auth-number"
            placeholder="0000"
            error={error}
            onChange={handleInput}
          />
          <div>
            <Button onClick={() => console.log('인증번호 확인')}>
              인증번호 확인
            </Button>
          </div>
        </div>
        <div className="flex-div">
          <Input
            label="닉네임"
            type="text"
            name="nickname"
            placeholder="홍길순"
            error={error}
            onChange={handleInput}
          />
          <div>
            <Button onClick={() => console.log('중복확인')}>중복확인</Button>
          </div>
        </div>
        <Input
          label="비밀번호"
          type="password"
          name="password"
          placeholder="비밀번호"
          onChange={handleInput}
        />
        <Input
          label="비밀번호 확인"
          type="password"
          name="passwordcheck"
          placeholder="비밀번호 확인"
          error={error}
          onChange={handleInput}
        />
        <div className="grid-div">
          <Radio
            legend="성별"
            radioArray={gender}
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
          checkedValue={values.score}
          onChange={handleInput}
        />
      </Form>
      <ul>
        <li>주로 앉아서 생활하는 사람 : 적음</li>
        <li>회사원 등 어느 정도 규칙적인 생활을 하는 사람 : 보통</li>
        <li>육체 노동자 등 신체 활동이 많은 사람 : 많음</li>
      </ul>
      <Button disabled={isValid} onClick={checkValid}>
        가입하기
      </Button>
    </Container>
  )
}

const Container = styled.div`
  width: 37rem;
  border: 1px solid var(--color-light-gray);
  border-radius: 1.5rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;

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
