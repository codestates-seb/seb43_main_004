import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import TabFrame from './TabFrame'
import Input from '../Common/Input'
import Button from '../Common/Button'
import Radio from '../Common/Radio'
import { genderList, activityScore, icons } from '../../utils/options'
import axios from 'axios'
import { API } from '../../utils/API'
import { User } from '../../utils/interface'

const EditProfile = () => {
  const [profile, setProfile] = useState<User>({
    nickName: '',
    gender: 'male',
    birth: '',
    height: 0,
    weight: 0,
    activity: '적음',
    icon: '',
  })

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setProfile({ ...profile, [name]: value })
    console.log(name, value)
  }

  // 프로필 수정
  const updateProfile = () => {
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
    console.log('hh')
    axios
      .get(`${API}/profile/1`)
      // .get(`${API}/members/mypage`)
      .then((response) => {
        setProfile(response.data)
        console.log(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  return (
    <TabFrame title="프로필 수정">
      <IconContainer>
        <Radio
          legend="프로필 아이콘"
          radioArray={icons}
          checkedValue={profile.icon}
          onChange={handleInput}
        />
      </IconContainer>
      <GridContainer>
        <Input
          label="이메일"
          type="email"
          name="email"
          disabled={true}
          onChange={handleInput}
        />
        <div className="flex-div">
          <Input
            label="닉네임"
            type="text"
            name="nickName"
            disabled={true}
            onChange={handleInput}
          />
          <div>
            <Button onClick={() => console.log('중복확인')}>중복확인</Button>
          </div>
        </div>
        <Radio
          legend="성별"
          radioArray={genderList}
          checkedValue={profile.gender}
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
          onChange={handleInput}
        />
        <Input
          label="체중(kg)"
          type="number"
          name="weight"
          onChange={handleInput}
        />
        <Radio
          legend="활동수준"
          radioArray={activityScore}
          checkedValue={profile.activity}
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
  height: 10rem;

  @media screen and (max-width: 500px) {
    height: auto;
  }
`

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 2.4rem;
  row-gap: 1.2rem;
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
