import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import TabFrame from './TabFrame'
import Input from '../Common/Input'
import Button from '../Common/Button'
import Radio from '../Common/Radio'
import Icons from '../User/Icons'
import { genderList, activityScore, icons } from '../../utils/options'
import axios from 'axios'
import { API } from '../../utils/API'
import { User } from '../../utils/interface'
import Modal from '../Common/Modal'
import { useNavigate } from 'react-router-dom'

const EditProfile = () => {
  const navigate = useNavigate()
  const [profile, setProfile] = useState<User>({
    email: '',
    nickName: '',
    gender: 'male',
    birth: '',
    height: 0,
    weight: 0,
    activity: 'NONE_ACTIVE',
    icon: 'ingredients',
  })
  const [isOk, setIsOk] = useState<boolean>(false) // 닉네임 입력란 토글
  const [del, setDel] = useState<boolean>(false) // 탈퇴 확인
  const { email, nickName, gender, birth, height, weight, activity, icon } =
    profile

  // 모달 핸들링
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [modalMsg, setModalMsg] = useState<string>('')
  const openModal = (msg: string) => {
    setIsOpen(true)
    setModalMsg(msg)
  }
  const closeModal = () => {
    if (del) {
      // 회원 탈퇴
      deleteUser()
      return
    }
    setIsOpen(false)
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setProfile({ ...profile, [name]: value })
    console.log(name, value)
  }

  // 닉네임 중복 체크

  // 프로필 수정
  const updateProfile = () => {
    // isOk === true -> 닉네임 필드 !== '' && 변경하려는 닉네임 !== 현재 닉네임 -> 닉네임 중복 여부 검증 후 프로필 수정 가능
    // isOk === false -> 바로 프로필 수정 가능
    axios
      .patch(`${API}/members/mypage/update`, {
        headers: {
          Authorization: 'Bearer ${token}',
        },
      })
      .then((response) => {
        console.log(response)
        openModal('프로필이 성공적으로 수정되었습니다.')
      })
      .then((error) => {
        console.log(error)
      })
  }

  // 회원탈퇴
  const deleteUser = () => {
    setDel(false)
    openModal(
      '회원 탈퇴가 완료되었습니다. \n그동안 라이팅을 이용해주셔서 감사합니다.'
    )

    axios
      .delete(`${API}/members/leaveid`, {
        headers: {
          Authorization: 'Bearer ${token}',
        },
      })
      .then((response) => {
        console.log(response)
        navigate('/sign-in')
      })
      .catch((error) => {
        console.error(error)
      })
  }

  useEffect(() => {
    // axios
    //   .get(`${API}/profile/1`)
    //   // .get(`${API}/members/mypage`)
    //   .then((response) => {
    //     setProfile(response.data)
    //     console.log(response.data)
    //   })
    //   .catch((error) => {
    //     console.error(error)
    //   })
  }, [])

  return (
    <>
      <TabFrame title="프로필 수정">
        <Wrapper>
          <IconContainer>
            <Icons
              radioArray={icons}
              checkedValue={icon}
              onChange={handleInput}
            />
          </IconContainer>
          <GridContainer>
            <Input
              label="이메일"
              type="email"
              name="email"
              value={email}
              disabled={true}
              onChange={handleInput}
            />
            <div className="flex-div">
              <Input
                label="닉네임"
                type="text"
                name="nickName"
                value={nickName}
                disabled={!isOk}
                onChange={handleInput}
              />
              {!isOk ? (
                <div>
                  <Button onClick={() => setIsOk(true)}>닉네임 변경</Button>
                </div>
              ) : (
                <div>
                  <Button onClick={() => console.log('gg')}>중복확인</Button>
                </div>
              )}
            </div>
            <Radio
              legend="성별"
              radioArray={genderList}
              checkedValue={gender}
              onChange={handleInput}
            />
            <Input
              label="생년월일"
              type="date"
              name="birth"
              value={birth}
              onChange={handleInput}
            />
            <Input
              label="신장(cm)"
              type="number"
              name="height"
              value={height}
              onChange={handleInput}
            />
            <Input
              label="체중(kg)"
              type="number"
              name="weight"
              value={weight}
              onChange={handleInput}
            />
          </GridContainer>
          <Radio
            legend="활동수준"
            radioArray={activityScore}
            checkedValue={activity}
            onChange={handleInput}
          />
          <ButtonWrapper>
            <Button
              outline="true"
              onClick={() => {
                setDel(true) // 회원탈퇴 버튼임을 인지시키기 위한 상태
                openModal(
                  '회원탈퇴시 유저정보 및 모든 데이터가 삭제됩니다.\n 회원탈퇴를 진행하시겠습니까?'
                )
              }}
            >
              회원탈퇴
            </Button>
            <Button onClick={updateProfile}>저장하기</Button>
          </ButtonWrapper>
        </Wrapper>
      </TabFrame>
      <Modal
        state={isOpen}
        setState={setIsOpen}
        msg={modalMsg}
        icon={del ? 'error' : ''}
      >
        <Button onClick={closeModal}>확인</Button>
        {del && <Button onClick={() => setIsOpen(false)}>취소</Button>}
      </Modal>
    </>
  )
}

const IconContainer = styled.div`
  display: flex;
  min-height: 13rem;

  @media ${({ theme }) => theme.device.mobile} {
    height: auto;
  }
`
const Wrapper = styled.div`
  @media ${({ theme }) => theme.device.mobile} {
    width: 88vw;
  }
`

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 2.4rem;
  row-gap: 1.8rem;
  margin: 1.8rem 0;

  .flex-div {
    display: flex;
    gap: 0.6rem;

    button {
      position: relative;
      top: 2rem;
    }
  }

  @media ${({ theme }) => theme.device.mobile} {
    grid-template-columns: none;
  }
`

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  margin-top: 5rem;
  justify-content: space-between;
`

export default EditProfile
