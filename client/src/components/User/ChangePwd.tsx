import React, { useState } from 'react'
import styled from 'styled-components'
import TabFrame from './TabFrame'
import Input from '../Common/Input'
import Button from '../Common/Button'
import { checkPassword } from '../../utils/userfunc'
import Modal from '../Common/Modal'
import axios, { AxiosError } from 'axios'
import { getCookie } from '../../utils/Cookie'

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

  // 모달 핸들링
  const [isOpen, setIsOpen] = useState<boolean>(false)

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
      msg.newPassword =
        '최소 8자, 영문+숫자+특수문자(!@#$%&*?) 조합으로 구성되어야 합니다.'
      isValid = false
    }

    if (ckPassword.trim() === '') {
      msg.ckPassword = '비밀번호를 입력해주세요.'
      isValid = false
    } else if (newPassword !== ckPassword) {
      msg.ckPassword = '새 비밀번호와 일치하지 않습니다.'
      isValid = false
    }

    if (currentPassword === newPassword) {
      msg.newPassword = '이미 사용 중인 비밀번호로 변경할 수 없습니다.'
      isValid = false
    }

    if (!isValid) {
      setError(msg)
    } else {
      // 비밀번호 변경 api 호출
      axios
        .patch(
          `${process.env.REACT_APP_SERVER_URL}/members/mypage/passwordupdate`,
          { curPassword: currentPassword, newPassword: newPassword },
          {
            headers: {
              Authorization: `Bearer ${getCookie('access')}`,
            },
          }
        )
        .then((response) => {
          setError(msg)
          setIsOpen(true)
          setPassword({ ...password, ...msg })
        })
        .catch((error: AxiosError) => {
          // 400 에러 (현재 비밀번호를 잘못 입력했을 때)
          if (error.response?.status === 400) {
            msg.currentPassword = '현재 비밀번호가 유효하지 않습니다.'
            setError(msg)
          }
        })
    }
  }

  return (
    <>
      <TabFrame title="비밀번호 변경">
        <Form>
          <Input
            type="password"
            label="현재 비밀번호"
            placeholder="현재 비밀번호"
            name="currentPassword"
            value={currentPassword}
            error={error.currentPassword}
            onChange={handleInput}
          />
          <Input
            type="password"
            label="새 비밀번호"
            placeholder="새 비밀번호"
            name="newPassword"
            value={newPassword}
            error={error.newPassword}
            onChange={handleInput}
          />
          <Input
            type="password"
            label="새 비밀번호 확인"
            placeholder="비밀번호 확인"
            name="ckPassword"
            value={ckPassword}
            error={error.ckPassword}
            onChange={handleInput}
          />
          <Button onClick={changePassword}>변경하기</Button>
        </Form>
      </TabFrame>
      <Modal
        state={isOpen}
        setState={setIsOpen}
        msg="비밀번호가 성공적으로 변경되었습니다."
      >
        <Button onClick={() => setIsOpen(false)}>확인</Button>
      </Modal>
    </>
  )
}

const Form = styled.form`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  > button {
    margin-top: 0.8rem;
  }

  @media ${({ theme }) => theme.device.tablet} {
    width: 80%;
    min-width: 20rem;
  }

  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
  }
`

export default ChangePwd
