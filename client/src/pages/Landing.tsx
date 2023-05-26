import React, { useEffect, useMemo, useState } from 'react'
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
import Button from '../components/Common/Button'
import { useNavigate } from 'react-router-dom'

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
    justify-content: center;
    align-items: center;

    .container {
      max-width: 1250px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .img-box {
        width: 55rem;
        height: 55rem;
        background-color: ${({ theme }) => theme.color.second};
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          display: block;
          width: 120%;
        }
      }

      .txt-box {
        width: 45%;

        h3 {
          font-size: ${({ theme }) => theme.fontSize.lgh};
          line-height: 1.3em;
          margin-bottom: 2rem;
        }

        p {
          font-size: ${({ theme }) => theme.fontSize.larger};
          line-height: 1.3em;
          word-break: keep-all;
          display: inline-block;
        }
      }
    }
  }

  .visual {
    background-color: #ffce70;
    position: relative;
    overflow: hidden;
    text-align: center;

    img {
      height: 115%;
    }

    .txt-box {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

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

  .diary {
    .txt-box {
      text-align: right;
    }
  }

  .archieve {
    background-color: ${({ theme }) => theme.color.point};
    color: ${({ theme }) => theme.color.white};
  }

  .community {
    .txt-box {
      text-align: right;

      span {
        background-color: ${({ theme }) => theme.color.point};
        color: ${({ theme }) => theme.color.white};
        font-weight: 500;
        padding: 1rem 1.5rem;
        display: inline-block;
        margin-bottom: 1rem;
      }
    }
  }

  .madeby {
    background-color: ${({ theme }) => theme.color.primary};

    .container {
      flex-direction: column;
      gap: 3rem;

      h3 {
        font-size: ${({ theme }) => theme.fontSize.lgh};
        background-color: ${({ theme }) => theme.color.black};
        color: ${({ theme }) => theme.color.white};
        padding: 1.5rem 2rem;
      }

      .profile-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;

        & > div {
          width: 48%;
          display: flex;
          flex-direction: column;
          gap: 3rem;
        }

        .profile {
          display: flex;
          justify-content: space-between;
          align-items: center;

          .profile-img {
            width: 23%;
            border: 3px solid ${({ theme }) => theme.color.point};
            border-radius: 50%;
            padding: 0.3rem;
            display: flex;
            justify-content: center;
            align-items: center;

            img {
              width: 100%;
            }
          }

          .profile-info {
            width: 70%;

            .position {
              display: inline-block;
              background-color: ${({ theme }) => theme.color.point};
              color: ${({ theme }) => theme.color.white};
              font-size: ${({ theme }) => theme.fontSize.small};
              font-weight: 700;
              padding: 0.5rem 1rem;
              margin-bottom: 1rem;
            }

            .name {
              font-size: ${({ theme }) => theme.fontSize.smmh};
              font-weight: 700;
              margin-bottom: 1rem;
            }

            .part {
              margin-bottom: 1.5rem;
              display: block;
              font-size: ${({ theme }) => theme.fontSize.small};
              line-height: 1.5em;
              word-break: keep-all;
            }

            a {
              color: ${({ theme }) => theme.color.darkGray};
              font-weight: 700;
              position: relative;
              display: inline-block;
              transition: all 0.5s;

              &:after {
                content: '';
                display: block;
                position: absolute;
                left: 0;
                bottom: -0.5rem;
                margin-top: 0.3rem;
                width: 0;
                height: 2px;
                background-color: ${({ theme }) => theme.color.point};
                transition: all 0.3s;
              }

              &:hover {
                color: ${({ theme }) => theme.color.point};

                &:after {
                  width: 100%;
                }
              }
            }
          }
        }

        .be {
          .profile-info {
            text-align: right;

            .position {
              background-color: ${({ theme }) => theme.color.black};
            }
          }
          .profile-img {
            border-color: ${({ theme }) => theme.color.black};
          }
        }
      }
    }
  }

  .with {
    .container {
      flex-direction: column;
      gap: 3rem;

      h3 {
        font-size: ${({ theme }) => theme.fontSize.lgh};
      }

      .img-box {
        width: 50vh;
        height: 50vh;

        img {
          width: 150%;
        }
      }

      button {
        font-size: ${({ theme }) => theme.fontSize.large};
        font-weight: 700;
      }
    }
  }

  @media ${({ theme }) => theme.device.tablet} {
    margin-top: 6rem;

    section {
      height: auto;
      padding: 5rem 0;

      .container {
        width: 98%;
        flex-direction: column;
        gap: 5rem;

        .img-box {
          width: 50vw;
          height: 50vw;
        }

        .txt-box {
          text-align: center;
          width: 100%;

          h3 {
            font-size: ${({ theme }) => theme.fontSize.mdh};
          }

          p {
            font-size: ${({ theme }) => theme.fontSize.large};
          }
        }
      }
    }

    .visual {
      img {
        height: auto;
        width: 100%;
      }

      h2 {
        font-size: 7rem;
      }

      p {
        font-size: ${({ theme }) => theme.fontSize.larger};
      }
    }

    .madeby {
      .container {
        h3 {
          font-size: ${({ theme }) => theme.fontSize.mdh};
        }

        .profile-box {
          flex-direction: column;

          & > div {
            width: 70%;
          }

          .profile {
            .profile-img {
              width: 30%;
            }

            .profile-info {
              width: 65%;
            }
          }

          .be {
            margin-top: 3rem;

            .profile {
              flex-direction: row-reverse;
            }

            .profile-info {
              text-align: left;
            }
          }
        }
      }
    }

    .with {
      .container {
        h3 {
          font-size: ${({ theme }) => theme.fontSize.mdh};
        }

        .img-box {
          width: 50vw;
          height: 50vw;
        }
      }
    }
  }

  @media ${({ theme }) => theme.device.mobile} {
    section {
      .container {
        width: 90%;

        .txt-box {
          h3 {
            font-size: ${({ theme }) => theme.fontSize.smmh};
          }

          p {
            font-size: ${({ theme }) => theme.fontSize.small};
            word-break: keep-all;

            br {
              display: none;
            }
          }
        }
      }
    }

    .visual {
      img {
        width: 170%;
      }

      h2 {
        font-size: 5rem;
      }

      p {
        font-size: ${({ theme }) => theme.fontSize.large};
      }
    }

    .madeby {
      .container {
        h3 {
          font-size: ${({ theme }) => theme.fontSize.smmh};
        }

        .profile-box {
          & > div {
            width: 100%;
          }

          .profile {
            .profile-info {
              .name {
                font-size: ${({ theme }) => theme.fontSize.smh};
              }
            }
          }
        }
      }
    }

    .with {
      .container {
        h3 {
          font-size: ${({ theme }) => theme.fontSize.smmh};
        }
      }
    }
  }
`

const Landing = () => {
  const dev = {
    fe: [
      {
        id: 1,
        img: feImg1,
        position: 'Frontend',
        name: '선유준',
        part: '일기 전체 / 상세조회, 영양성분 아카이브',
        link: 'https://github.com/YujunSun0',
      },
      {
        id: 2,
        img: feImg2,
        position: 'Frontend',
        name: '이진하',
        part: '회원가입, 로그인, 마이페이지',
        link: 'https://github.com/idx123',
      },
      {
        id: 3,
        img: feImg3,
        position: 'Frontend',
        name: '박혜원',
        part: '일기 작성 / 수정, 레시피 아카이브, 랜딩페이지',
        link: 'https://github.com/moondrop0816',
      },
    ],
    be: [
      {
        id: 1,
        img: beImg1,
        position: 'Backend',
        name: '이용석',
        part: '일기, 아카이브, 검색, 통계, AWS 배포, DB 데이터 관리, 추천',
        link: 'https://github.com/021Skyfall',
      },
      {
        id: 2,
        img: beImg2,
        position: 'Backend',
        name: '김석현',
        part: '회원 관리, 회원 이메일 인증, JWT, 추천',
        link: 'https://github.com/kimtjrgus',
      },
      {
        id: 3,
        img: beImg3,
        position: 'Backend',
        name: '임채영',
        part: '회원 이메일 인증, 일기, 통계, 추천',
        link: 'https://github.com/CHEYOUNG-LIM',
      },
    ],
  }

  const navigate = useNavigate()
  const duration = 1000
  const delay = 500

  useEffect(() => {
    AOS.init()
  }, [])

  return (
    <StyledLanding>
      <section className="visual">
        <img
          src={landing1}
          alt="라잇팅 웹사이트가 띄워진 노트북과 스마트폰 두개"
        />
        <div className="txt-box">
          <h2 data-aos="fade-up" data-aos-duration={duration}>
            Wr!eating
          </h2>
          <p
            data-aos="fade-up"
            data-aos-duration={duration}
            data-aos-delay={delay}
          >
            더 건강해질 나를 위한 식단 일기
          </p>
        </div>
      </section>
      <section className="diary">
        <div className="container">
          <div
            className="img-box"
            data-aos="fade-right"
            data-aos-duration={duration}
          >
            <img
              src={landing2}
              alt="식단일기 웹페이지를 보여주고있는 두개의 모니터"
            />
          </div>
          <div className="txt-box">
            <h3
              data-aos="fade-up"
              data-aos-duration={duration}
              data-aos-delay={delay}
            >
              매일매일 기록하는
              <br /> 나만의 식단 일기
            </h3>
            <p
              data-aos="fade-up"
              data-aos-duration={duration}
              data-aos-delay={delay * 1.5}
            >
              매일 먹은 음식을 기록하고 지난 기록을 통계로 볼 수 있어요.
              <br /> 식단 일기의 이모지와 함께 오늘의 일기를 표현해 보세요.
              <br /> 오늘의 메뉴는 고민하지 마세요! 라잇팅이 추천해드릴게요.
            </p>
          </div>
        </div>
      </section>
      <section className="archieve">
        <div className="container">
          <div className="txt-box">
            <h3
              data-aos="fade-up"
              data-aos-duration={duration}
              data-aos-delay={delay}
            >
              오늘 뭐먹지?
              <br /> 고민은 끝!
            </h3>
            <p
              data-aos="fade-up"
              data-aos-duration={duration}
              data-aos-delay={delay * 1.5}
            >
              레시피 아카이브에서 원하는 레시피를 찾아볼 수 있어요. <br />
              검색을 통해 다양한 음식의 칼로리와 영양소 정보도 찾아보세요.{' '}
              <br />더 건강한 식사를 라잇팅이 응원할게요!
            </p>
          </div>
          <div
            className="img-box"
            data-aos="fade-left"
            data-aos-duration={duration}
          >
            <img
              src={landing3}
              alt="레시피 내용을 보여주는 노트북과 음식 영양 성분을 보여주는 노트북"
            />
          </div>
        </div>
      </section>
      <section className="community">
        <div className="container">
          <div
            className="img-box"
            data-aos="fade-right"
            data-aos-duration={duration}
          >
            <img
              src={landing4}
              alt="커뮤니티 게시글들을 보여주고 있는 노트북"
            />
          </div>
          <div className="txt-box">
            <span
              data-aos="fade-up"
              data-aos-duration={duration}
              data-aos-delay={delay}
            >
              업데이트 예정
            </span>
            <h3
              data-aos="fade-up"
              data-aos-duration={duration}
              data-aos-delay={delay}
            >
              함께하니까
              <br /> 오히려 좋아
            </h3>
            <p
              data-aos="fade-up"
              data-aos-duration={duration}
              data-aos-delay={delay * 1.5}
            >
              같은 관심사를 가진 다양한 유저들을 커뮤니티에서 만나보세요.
              <br /> 나만의 레시피 공유, 식습관에 대한 고민상담, 자유로운
              이야기까지!
              <br /> 태그를 통해 간편하게 관심있는 내용만 모아서 찾아볼 수도
              있어요.
            </p>
          </div>
        </div>
      </section>
      <section className="madeby">
        <div className="container">
          <h3 data-aos="fade-up" data-aos-duration={duration}>
            만든 사람들
          </h3>
          <div
            className="profile-box"
            data-aos="fade-up"
            data-aos-duration={duration}
            data-aos-delay={delay}
          >
            <div className="fe">
              {dev.fe.map((item) => {
                return (
                  <div className="profile" key={item.id}>
                    <div className="profile-img">
                      <img src={item.img} alt="프로필 이미지" />
                    </div>
                    <div className="profile-info">
                      <span className="position">{item.position}</span>
                      <p className="name">{item.name}</p>
                      <span className="part">{item.part}</span>
                      <a href={item.link} target="blank">
                        깃허브 바로가기
                      </a>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="be">
              {dev.be.map((item) => {
                return (
                  <div className="profile" key={item.id}>
                    <div className="profile-info">
                      <span className="position">{item.position}</span>
                      <p className="name">{item.name}</p>
                      <span className="part">{item.part}</span>
                      <a href={item.link} target="blank">
                        깃허브 바로가기
                      </a>
                    </div>
                    <div className="profile-img">
                      <img src={item.img} alt="프로필 이미지" />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
      <section className="with">
        <div className="container">
          <h3 data-aos="fade-up" data-aos-duration={duration}>
            라잇팅과 함께하세요!
          </h3>
          <div
            className="img-box"
            data-aos="fade-up"
            data-aos-duration={duration}
            data-aos-delay={delay}
          >
            <img
              src={landing5}
              alt="식단일기 웹페이지를 보여주고있는 노트북과 스마트폰"
            />
          </div>
          <div
            data-aos="fade-up"
            data-aos-duration={duration}
            data-aos-delay={delay * 1.5}
          >
            <Button onClick={() => navigate('/sign-in')}>
              라잇팅 이용하러 가기
            </Button>
          </div>
        </div>
      </section>
    </StyledLanding>
  )
}

export default Landing
