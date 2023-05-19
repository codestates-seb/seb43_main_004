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

const EditProfile = () => {
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
  const [isOk, setIsOk] = useState<boolean>(false)
  const { email, nickName, gender, birth, height, weight, activity, icon } =
    profile

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setProfile({ ...profile, [name]: value })
    console.log(name, value)
  }

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
      })
      .then((error) => {
        console.log(error)
      })
  }

  // 회원탈퇴
  const deleteUser = () => {
    axios
      .delete(`${API}/members/leaveid`, {
        headers: {
          Authorization: 'Bearer ${token}',
        },
      })
      .then((response) => {
        console.log(response.data)
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
    <TabFrame title="프로필 수정">
      <IconContainer>
        <Icons radioArray={icons} checkedValue={icon} onChange={handleInput} />
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
        <Radio
          legend="활동수준"
          radioArray={activityScore}
          checkedValue={activity}
          onChange={handleInput}
        />
      </GridContainer>
      <ButtonWrapper>
        <Button outline="true" onClick={deleteUser}>
          회원탈퇴
        </Button>
        <Button onClick={updateProfile}>저장하기</Button>
      </ButtonWrapper>
    </TabFrame>
  )
}

const IconContainer = styled.div`
  display: flex;
  min-height: 13rem;

  @media screen and (max-width: 500px) {
    height: auto;
  }
`

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 2.4rem;
  row-gap: 1.8rem;
  margin-top: 1.2rem;

  .flex-div {
    display: flex;
    gap: 0.6rem;

    button {
      position: relative;
      top: 2rem;
    }
  }

  @media screen and (max-width: 500px) {
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
