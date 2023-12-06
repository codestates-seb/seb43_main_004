import React from 'react'
import styled from 'styled-components'
import Tab from '../components/Common/Tab'
import { useSelector } from 'react-redux'
import { RootState } from '../store'

const UserPage = () => {
  const userInfo = useSelector((state: RootState) => state.profile.data)
  const { nickName, gender, height, weight, activity, icon } = userInfo

  let activeLevel
  switch (activity) {
    case 'NONE_ACTIVE':
      activeLevel = '매우 낮음'
      break
    case 'LIGHTLY_ACTIVE':
      activeLevel = '낮음'
      break
    case 'MODERATELY_ACTIVE':
      activeLevel = '보통'
      break
    case 'VERY_ACTIVE':
      activeLevel = '높음'
      break
    case 'EXTREMELY_ACTIVE':
      activeLevel = '매우 높음'
      break
  }

  return (
    <Container>
      <UserProfile>
        <img src={`/icons/${icon}.svg`} alt="프로필 아이콘" />
        <div>
          <div className="userinfo-top">
            <h1>{nickName}</h1>
            <span>{gender === 'male' ? '남성' : '여성'}</span>
          </div>

          <ItemsWrapper>
            <div>
              <span>신장</span>
              <span>{height} cm</span>
            </div>
            <div>
              <span>체중</span>
              <span>{weight} kg</span>
            </div>
            <div>
              <span>활동수준</span>
              <span>{activeLevel}</span>
            </div>
          </ItemsWrapper>
        </div>
      </UserProfile>
      <div className="test-div">
        <Tab
          tabItem={[
            { name: '프로필 수정', path: '/userpage' },
            { name: '비밀번호 변경', path: '/userpage/change-pwd' },
          ]}
        />
      </div>
    </Container>
  )
}
const Container = styled.div`
  width: 100%;
  max-width: 88rem;
`

const ItemsWrapper = styled.div`
  display: flex;
  gap: 3rem;

  > div span:first-child {
    font-weight: 800;
    margin-right: 1.4rem;
  }

  @media ${({ theme }) => theme.device.tablet} {
    flex-direction: column;
    gap: 1rem;
  }
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

  @media ${({ theme }) => theme.device.mobile} {
    flex-direction: column;
    gap: 2rem;

    img {
      width: 9rem;
      height: 9rem;
    }
  }
`

export default UserPage
