import React, { useEffect } from 'react'
import { styled } from 'styled-components'
import landing1 from '../assets/landing1.png'
import landing2 from '../assets/landing2.png'
import landing3 from '../assets/landing3.png'
import landing4 from '../assets/landing4.png'
import landing5 from '../assets/landing5.png'
import feImg1 from '../assets/landing-fe1.png'
import feImg2 from '../assets/landing-fe2.png'
import feImg3 from '../assets/landing-fe3.png'
import beImg1 from '../assets/landing-be1.png'
import beImg2 from '../assets/landing-be2.png'
import beImg3 from '../assets/landing-be3.png'
import AOS from 'aos'
import 'aos/dist/aos.css'

const StyledLanding = styled.main`
  @font-face {
    font-family: 'More Sugar Regular';
    src: url('https://fonts.cdnfonts.com/s/96698/MoreSugar-8MnBn.woff')
      format('woff');
  }

  width: 100%;
  margin-top: 10rem;

  section {
    height: calc(100vh - 10rem);
    display: flex;
    align-items: center;

    .container {
      max-width: 1250px;
      width: 100%;
    }
  }

  .visual {
    background: url(${landing1}) no-repeat 50% 0 / contain;
    background-color: #ffce70;
    justify-content: center;
    flex-direction: column;

    h2 {
      font-size: 10rem;
      font-family: 'More Sugar Regular';
      color: ${({ theme }) => theme.color.white};
      background-color: ${({ theme }) => theme.color.black};
      padding: 1.5rem 2rem;
      margin-bottom: 2rem;
    }

    p {
      font-size: ${({ theme }) => theme.fontSize.mdh};
      color: ${({ theme }) => theme.color.white};
      background-color: ${({ theme }) => theme.color.black};
      padding: 1rem 1.5rem;
    }
  }
`

const Landing = () => {
  useEffect(() => {
    AOS.init()
  })

  return (
    <StyledLanding>
      <section className="visual">
        {/* 타이핑 애니메이션 적용하기 */}
        <h2>Wr!eating</h2>
        <p>더 건강해질 나를 위한 식단 일기</p>
      </section>
      <section className="diary">
        <div className="container">
          <div className="img-box">
            <img
              src={landing2}
              alt="식단일기 웹페이지를 보여주고있는 두개의 모니터"
            />
          </div>
          <div className="txt-box">
            <h3>
              매일매일 기록하는
              <br /> 나만의 식단 일기
            </h3>
            <p>
              매일 먹은 음식을 기록하고 지난 기록을 통계로 볼 수 있어요. 식단
              일기의 이모지와 함께 오늘의 일기를 표현해 보세요. 오늘의 메뉴는
              고민하지 마세요! 라잇팅이 추천해드릴게요.
            </p>
          </div>
        </div>
      </section>
      <section className="archieve">
        <div className="container">
          <div className="txt-box">
            <h3>
              오늘 뭐먹지?
              <br /> 고민은 끝!
            </h3>
            <p>
              레시피 아카이브에서 원하는 레시피를 찾아볼 수 있어요. 검색을 통해
              다양한 음식의 칼로리와 영양소 정보도 찾아보세요. 더 건강한 식사를
              라잇팅이 응원할게요!
            </p>
          </div>
          <div className="img-box">
            <img
              src={landing3}
              alt="레시피 내용을 보여주는 노트북과 음식 영양 성분을 보여주는 노트북"
            />
          </div>
        </div>
      </section>
      <section className="community">
        <div className="container">
          <div className="img-box">
            <img
              src={landing4}
              alt="커뮤니티 게시글들을 보여주고 있는 노트북"
            />
          </div>
          <div className="txt-box">
            <span>업데이트 예정</span>
            <h3>
              함께하니까
              <br /> 오히려 좋아
            </h3>
            <p>
              같은 관심사를 가진 다양한 유저들을 커뮤니티에서 만나보세요. 나만의
              레시피 공유, 식습관에 대한 고민상담, 자유로운 이야기까지! 태그를
              통해 간편하게 관심있는 내용만 모아서 찾아볼 수도 있어요.
            </p>
          </div>
        </div>
      </section>
      <section className="madeby">
        <div className="container">
          <h3>만든 사람들</h3>
          <div className="profile-box">
            <div className="fe">
              <div className="profile">
                <div className="profile-img">
                  <img
                    src={landing2}
                    alt="식단일기 웹페이지를 보여주고있는 두개의 모니터"
                  />
                </div>
                <div className="profile-info">
                  <span>Frontend</span>
                  <p>선유준</p>
                  <a href="/">깃허브 바로가기</a>
                </div>
              </div>
              <div className="profile">
                <div className="profile-img">
                  <img
                    src={landing2}
                    alt="식단일기 웹페이지를 보여주고있는 두개의 모니터"
                  />
                </div>
                <div className="profile-info">
                  <span>Frontend</span>
                  <p>선유준</p>
                  <a href="/">깃허브 바로가기</a>
                </div>
              </div>
              <div className="profile">
                <div className="profile-img">
                  <img
                    src={landing2}
                    alt="식단일기 웹페이지를 보여주고있는 두개의 모니터"
                  />
                </div>
                <div className="profile-info">
                  <span>Frontend</span>
                  <p>선유준</p>
                  <a href="/">깃허브 바로가기</a>
                </div>
              </div>
            </div>
            <div className="be">
              <div className="profile">
                <div className="profile-img">
                  <img
                    src={landing2}
                    alt="식단일기 웹페이지를 보여주고있는 두개의 모니터"
                  />
                </div>
                <div className="profile-info">
                  <span>Backend</span>
                  <p>선유준</p>
                  <a href="/">깃허브 바로가기</a>
                </div>
              </div>
              <div className="profile">
                <div className="profile-img">
                  <img
                    src={landing2}
                    alt="식단일기 웹페이지를 보여주고있는 두개의 모니터"
                  />
                </div>
                <div className="profile-info">
                  <span>Backend</span>
                  <p>선유준</p>
                  <a href="/">깃허브 바로가기</a>
                </div>
              </div>
              <div className="profile">
                <div className="profile-img">
                  <img
                    src={landing2}
                    alt="식단일기 웹페이지를 보여주고있는 두개의 모니터"
                  />
                </div>
                <div className="profile-info">
                  <span>Backend</span>
                  <p>선유준</p>
                  <a href="/">깃허브 바로가기</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="with"></section>
    </StyledLanding>
  )
}

export default Landing
