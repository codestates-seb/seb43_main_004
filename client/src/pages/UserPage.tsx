import React, { useEffect } from 'react'
import styled from 'styled-components'
import Tab from '../components/common/Tab'

// 임시 유저 정보
const TempUser = {
  nickname: 'testuser',
  gender: 'male',
  height: 175,
  weight: 70,
  activity: 'low',
  icon: 'https://img.animalplanet.co.kr/news/2022/10/13/700/gzs211818b42g2a88a13.jpg',
}

const UserPage = () => {
  useEffect(() => {
    console.log('axios get')
  }, [])

  return (
    <Container>
      <UserProfile>
        <img src={TempUser.icon} alt="프로필 아이콘" />
        <div>
          <div className="userinfo-top">
            <h1>{TempUser.nickname}</h1>
            <span>{TempUser.gender}</span>
          </div>

          <ItemsWrapper>
            <div>
              <span>신장</span>
              <span>{TempUser.height} cm</span>
            </div>
            <div>
              <span>체중</span>
              <span>{TempUser.weight} kg</span>
            </div>
            <div>
              <span>활동수준</span>
              <span>{TempUser.activity}</span>
            </div>
          </ItemsWrapper>
        </div>
      </UserProfile>
      <Tab
        tabItem={[
          { name: '프로필 수정', path: '/userpage' }, // 프로필 수정 페이지가 기본이 된다고 가정...
          { name: '비밀번호 변경', path: '/userpage/change-pwd' },
        ]}
      />
    </Container>
  )
}
const Container = styled.div`
  max-width: 88rem;
`

const UserProfile = styled.div`
  border: 1px solid var(--color-light-gray);
  border-radius: 1.5rem;
  margin-bottom: 2rem;
  padding: 2rem;
  display: flex;
  align-items: center;
  gap: 4rem;

  img {
    width: 15rem;
    height: 15rem;
    border-radius: 100%;
    border: 3px solid var(--color-white);
    outline: 3px solid var(--color-primary);
  }

  h1 {
    display: inline-block;
    margin-right: 4rem;
    font-size: ${(props) => props.theme.fontSize.smh};
  }

  .userinfo-top {
    margin-bottom: 2rem;
  }
`

const ItemsWrapper = styled.div`
  display: flex;
  gap: 3rem;

  > div span:first-child {
    font-weight: 800;
    margin-right: 1.4rem;
  }
`

export default UserPage
