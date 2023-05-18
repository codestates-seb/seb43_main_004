import React, { useState } from 'react'
import styled from 'styled-components'
import TabFrame from './TabFrame'
import Input from '../Common/Input'
import Button from '../Common/Button'
import { checkPassword } from '../../utils/userfunc'

interface pwdType {
  currentPassword: string
  newPassword: string
  ckPassword: string
}

const ChangePwd = () => {
  const [password, setPassword] = useState<pwdType>({
    currentPassword: '',
    newPassword: '',
    ckPassword: '',
  })
  const [error, setError] = useState<pwdType>({
    currentPassword: '',
    newPassword: '',
    ckPassword: '',
  })

  const { currentPassword, newPassword, ckPassword } = password

  // 비밀번호 입력값 핸들링
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setPassword({ ...password, [name]: value })
  }

  // 입력값이 모두 유효하면 비밀번호를 변경 아니면 오류 메세지 출력
  const changePassword = () => {
    const msg: pwdType = {
      currentPassword: '',
      newPassword: '',
      ckPassword: '',
    }
    let isValid = true

    if (currentPassword.trim() === '') {
      msg.currentPassword = '현재 비밀번호를 입력해주세요.'
      isValid = false
    }

    if (newPassword.trim() === '') {
      msg.newPassword = '새 비밀번호를 입력해주세요.'
      isValid = false
    } else if (!checkPassword(newPassword)) {
      msg.newPassword = '최소 8자, 영문+숫자 조합으로 구성되어야 합니다.'
      isValid = false
    }

    if (ckPassword.trim() === '') {
      msg.ckPassword = '비밀번호를 입력해주세요.'
      isValid = false
    } else if (newPassword !== ckPassword) {
      msg.ckPassword = '새 비밀번호와 일치하지 않습니다.'
      isValid = false
    }

    if (!isValid) {
      setError(msg)
    } else {
      // api 호출
      // 현재 비밀번호가 유효하지 않습니다.
      // 현재 비밀번호가 올바르고, 새 비밀번호도 제대로 입력되었다면 비밀번호 변경 모달 띄우기
      alert('비밀번호가 변경되었습니다.') // 비밀번호 변경
    }
  }

  return (
    <TabFrame title="비밀번호 변경">
      <Form>
        <Input
          type="password"
          label="현재 비밀번호"
          placeholder="현재 비밀번호"
          name="currentPassword"
          error={error.currentPassword}
          onChange={handleInput}
        />
        <Input
          type="password"
          label="새 비밀번호"
          placeholder="새 비밀번호"
          name="newPassword"
          error={error.newPassword}
          onChange={handleInput}
        />
        <Input
          type="password"
          label="새 비밀번호 확인"
          placeholder="비밀번호 확인"
          name="ckPassword"
          error={error.ckPassword}
          onChange={handleInput}
        />
        <Button onClick={changePassword}>변경하기</Button>
      </Form>
    </TabFrame>
  )
}

const Form = styled.form`
  width: 30rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export default ChangePwd
