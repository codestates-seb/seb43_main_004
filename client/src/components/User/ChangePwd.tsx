import React, { useState } from 'react'
import styled from 'styled-components'
import TabFrame from './TabFrame'
import Input from '../Common/Input'
import Button from '../Common/Button'
import { checkPassword } from '../../utils/userfunc'
import Modal from '../Common/Modal'
import axios from 'axios'
import { API } from '../../utils/API'

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
      axios
        .patch(
          `${API}/members/mypage/passwordupdate`,
          { currentpw: currentPassword, newpw: newPassword },
          {
            headers: {
              Authorization: 'Bearer ${token}',
            },
          }
        )
        .then((response) => {
          console.log(response)
          // 현재 비밀번호가 올바른지는 서버에서 판단할 예정
          // 클라이언트에선 응답값에 따라 적절히 처리만 해주면 됨
          setError(msg)
          setIsOpen(true)
        })
        .then((error) => {
          console.log(error)
        })
    }
  }

  return (
    <>
      <TabFrame title="비밀번호 변경">
        <Wrapper>
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
        </Wrapper>
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

const Wrapper = styled.div`
  width: 63.7rem;
  min-height: 40rem;

  @media ${({ theme }) => theme.device.mobile} {
    width: 88vw;
  }
`

const Form = styled.form`
  width: 35rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  > button {
    margin-top: 0.8rem;
  }
`

export default ChangePwd
