import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Tab from '../components/Common/Tab'
import axios from 'axios'
import { API } from '../utils/API'
import { User } from '../utils/interface'

const UserPage = () => {
  const [profile, setProfile] = useState<User>({
    nickName: '',
    gender: '',
    height: 0,
    weight: 0,
    activity: '',
    icon: '',
  })
  const { nickName, gender, height, weight, activity, icon } = profile
  useEffect(() => {
    console.log('/mypage')
    axios
      .get(`${API}/profile/1`)
      // .get(`${API}/members/mypage`)
      .then((response) => {
        console.log(response)
        setProfile(response.data)
        console.log(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  return (
    <Container>
      <UserProfile>
        <img src={icon} alt="프로필 아이콘" />
        <div>
          <div className="userinfo-top">
            <h1>{nickName}</h1>
            <span>{gender}</span>
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
              <span>{activity}</span>
            </div>
          </ItemsWrapper>
        </div>
      </UserProfile>
      <Tab
        tabItem={[
          { name: '프로필 수정', path: '/userpage' }, // 프로필 수정 페이지가 기본이 된다고 가정...
          { name: '비밀번호 변경', path: '/userpage/change-pwd' },
          { name: '내가 작성한 글', path: '/userpage/posts' },
          { name: '내가 작성한 댓글', path: '/userpage/comments' },
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
