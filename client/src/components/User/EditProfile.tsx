import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import TabFrame from './TabFrame'
import Input from '../Common/Input'
import Button from '../Common/Button'
import Radio from '../Common/Radio'
import Icons from '../User/Icons'
import { genderList, activityScore, icons } from '../../utils/options'
import axios from 'axios'
import { User } from '../../utils/interface'
import Modal from '../Common/Modal'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store'
import { getCookie } from '../../utils/Cookie'
import { __editUser } from '../../store/slices/profileSlice'
import { userLogout } from '../../utils/userfunc'

interface noticeType {
  nickName: string
  nickNameOk: string
  birth: string
  height: string
  weight: string
}

const EditProfile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const userInfo = useSelector((state: RootState) => state.profile.data)
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
  const { email, nickName, gender, birth, height, weight, activity, icon } =
    profile

  const [isActive, setIsActive] = useState<boolean>(false) // 닉네임 입력란 토글
  const [nameCheck, setNameCheck] = useState<string>(userInfo.nickName) // 닉네임 비교
  const [del, setDel] = useState<boolean>(false) // 탈퇴 확인
  const [notice, setNotice] = useState<noticeType>({
    // 메세지 관리
    nickName: '',
    nickNameOk: '',
    birth: '',
    height: '',
    weight: '',
  })

  // 모달 핸들링`
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [modalMsg, setModalMsg] = useState<string>('')
  const openModal = (msg: string) => {
    setIsOpen(true)
    setModalMsg(msg)
  }
  const closeModal = () => {
    if (del) {
      deleteUser()
      return
    }
    setIsOpen(false)
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setProfile({ ...profile, [name]: value })
  }

  // 닉네임 중복 확인
  const cantUse = 'cant-use'
  const checkNickname = () => {
    const msg = { nickName: '', nickNameOk: '' }

    if (nickName.trim() === '') {
      msg.nickName = '닉네임을 입력해주세요.'
      setNotice({ ...notice, ...msg })
      return
    } else if (nickName.length > 8) {
      msg.nickName = '사용할 수 없는 닉네임입니다 (8자 초과)'
      setNotice({ ...notice, ...msg })
      return
    } else if (userInfo.nickName === nickName) {
      msg.nickName = '현재 사용중인 닉네임입니다.'
      setNotice({ ...notice, ...msg })
      return
    }

    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/members/nicknamecheck`,
        { nickName },
        {
          headers: {
            Authorization: `Bearer ${getCookie('access')}`,
          },
        }
      )
      .then((response) => {
        if (response.data.data === false) {
          setNameCheck(nickName)
          msg.nickNameOk = '사용할 수 있는 닉네임입니다.'
        } else {
          setNameCheck(cantUse)
          msg.nickName = '중복된 닉네임입니다.'
        }
        setNotice({ ...notice, ...msg })
      })
  }

  // 프로필 수정
  const updateProfile = () => {
    const msg = { nickName: '', weight: '', height: '', birth: '' }
    let isBlank = false

    for (const key in profile) {
      if (profile[key] === '') {
        isBlank = true
      }
    }

    if ((isActive && nameCheck === cantUse) || nameCheck !== nickName) {
      openModal('닉네임 중복 확인 필요')
      return
    }

    if (weight <= 0 && weight >= 500) {
      msg.weight = '유효하지 않은 값입니다.'
    }
    if (height <= 0 && height >= 300) {
      msg.height = '유효하지 않은 값입니다.'
    }
    if (birth === '') {
      msg.birth = '생년월일을 입력해주세요.'
    }

    if (isBlank) {
      setNotice({ ...notice, ...msg })
    } else {
      axios
        .patch(
          `${process.env.REACT_APP_SERVER_URL}/members/mypage/update`,
          {
            nickName,
            birth,
            gender,
            height,
            weight,
            activity,
            icon,
          },
          {
            headers: {
              Authorization: `Bearer ${getCookie('access')}`,
            },
          }
        )
        .then((response) => {
          dispatch(__editUser(response.data.data))
          openModal('프로필이 성공적으로 수정되었습니다.')
          setNotice({ ...notice, ...msg })
        })
        .then((error) => {
          console.error(error)
        })
    }
  }

  // 회원탈퇴
  const deleteUser = () => {
    setDel(false)
    openModal(
      '회원 탈퇴가 완료되었습니다. \n그동안 라이팅을 이용해주셔서 감사합니다.'
    )

    axios
      .delete(`${process.env.REACT_APP_SERVER_URL}/members/leaveId`, {
        headers: {
          Authorization: `Bearer ${getCookie('access')}`,
        },
      })
      .then((response) => {
        userLogout()
        navigate('/sign-in', { replace: true })
      })
      .catch((error) => {
        console.error(error)
      })
  }
  useEffect(() => {
    setProfile(userInfo)
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
                disabled={!isActive}
                success={notice.nickNameOk}
                error={notice.nickName}
                onChange={handleInput}
              />
              {!isActive ? (
                <div>
                  <Button onClick={() => setIsActive(true)}>닉네임 변경</Button>
                </div>
              ) : (
                <div>
                  <Button onClick={checkNickname}>중복확인</Button>
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
              min="1900-01-01"
              max="3000"
              value={birth}
              error={notice.birth}
              onChange={handleInput}
            />
            <Input
              label="신장(cm)"
              type="number"
              name="height"
              min={1}
              max={300}
              value={height}
              error={notice.height}
              onChange={handleInput}
            />
            <Input
              label="체중(kg)"
              type="number"
              name="weight"
              min={1}
              max={500}
              value={weight}
              error={notice.weight}
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

  @media ${({ theme }) => theme.device.tablet} {
    height: auto;
  }
`
const Wrapper = styled.div`
  @media ${({ theme }) => theme.device.tablet} {
    width: 88vw;
  }
`

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 2.4rem;
  row-gap: 2.4rem;
  margin: 1.8rem 0 2.4rem 0;

  .flex-div {
    display: flex;
    gap: 0.6rem;

    button {
      position: relative;
      top: 2rem;
    }
  }

  @media ${({ theme }) => theme.device.tablet} {
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
