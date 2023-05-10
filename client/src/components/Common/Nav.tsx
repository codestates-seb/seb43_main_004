import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import logo from '../../assets/logo.png'

const StyledNavBg = styled.div`
  width: 100%;
  height: 100vh;
  opacity: 0;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  transition: all 0.5s;
  z-index: -1;
  visibility: hidden;

  &.open {
    visibility: visible;
    opacity: 1;
    z-index: 9;
  }
`

const StyledNav = styled.nav`
  font-family: 'yg-jalnan';
  width: 50%;
  height: 100%;
  padding: 6rem;
  background: ${({ theme }) => theme.color.primary};
  position: fixed;
  top: 0;
  left: -100%;
  display: flex;
  flex-direction: column;
  z-index: 99;
  transition: all 0.5s;

  &.open {
    left: 0;
  }

  .btn-box {
    align-self: flex-end;
    margin-bottom: 4rem;

    button {
      font-size: ${({ theme }) => theme.fontSize.lgl};
    }
  }

  .login-box,
  .user-box {
    display: flex;
    align-items: center;
    border-bottom: 1px solid ${({ theme }) => theme.color.darkGray};
    padding-bottom: 5rem;
    margin-bottom: 5rem;
    gap: 5rem;

    div:first-of-type {
      font-size: 13rem;
      flex-grow: 0;
    }
  }

  .login-box {
    a {
      font-size: ${({ theme }) => theme.fontSize.mdh};
    }
  }

  .user-box {
    .profile {
      border-radius: 50%;
      width: 13rem;
      height: 13rem;
      overflow: hidden;
      display: flex;
      justify-content: center;

      img {
        display: block;
        height: 100%;
      }
    }
    p {
      font-size: ${({ theme }) => theme.fontSize.mdh};
    }

    a {
      color: ${({ theme }) => theme.color.darkGray};
      font-family: 'Pretendard', sans-serif;
      font-size: ${({ theme }) => theme.fontSize.smh};
      font-weight: 700;
      display: flex;
      align-items: center;
      margin-top: 1rem;

      span {
        display: inline-block;
      }
    }
  }

  .depth-1 {
    font-size: ${({ theme }) => theme.fontSize.mdh};

    li {
      margin-bottom: 3.5rem;
      &.active a {
        color: ${({ theme }) => theme.color.point};
        border-bottom: 5px solid ${({ theme }) => theme.color.point};
      }
    }

    a {
      display: inline-block;
      transition: 0.3s;
      &:hover {
        color: ${({ theme }) => theme.color.point};
      }
    }

    .depth-2 {
      font-size: ${({ theme }) => theme.fontSize.smh};
      li {
        margin-top: 3rem;
      }
    }
  }

  @media ${({ theme }) => theme.device.mobile} {
    .btn-box {
      button {
        font-size: ${({ theme }) => theme.fontSize.smmh};
      }
    }

    .login-box,
    .user-box {
      padding-bottom: 2.5rem;
      margin-bottom: 2.5rem;
      gap: 2.5rem;

      div:first-of-type {
        font-size: 7rem;
      }
    }

    .login-box {
      a {
        font-size: ${({ theme }) => theme.fontSize.smh};
      }
    }

    .user-box {
      .profile {
        width: 7rem;
        height: 7rem;
      }

      p {
        font-size: ${({ theme }) => theme.fontSize.smh};
      }

      a {
        font-size: ${({ theme }) => theme.fontSize.large};
      }
    }

    .depth-1 {
      font-size: ${({ theme }) => theme.fontSize.smmh};

      li {
        margin-bottom: 2.5rem;
      }

      .depth-2 {
        font-size: ${({ theme }) => theme.fontSize.smh};

        li {
          margin-top: 2rem;
        }
      }
    }
  }
`

interface NavProps {
  menuOpen: boolean
  handleMenu(): void
}

const Nav = ({ menuOpen, handleMenu }: NavProps) => {
  // 확인용 임시 state
  const [isLogin, setIsLogin] = useState(true)
  return (
    <>
      <StyledNavBg className={menuOpen ? 'open' : ''} onClick={handleMenu} />
      <StyledNav className={menuOpen ? 'open' : ''}>
        <div className="btn-box">
          {isLogin && (
            <button
              type="button"
              className="btn-logout"
              onClick={() => setIsLogin(false)}
            >
              <span className="material-icons-round">power_settings_new</span>
            </button>
          )}
          <button type="button" className="btn-nav-close" onClick={handleMenu}>
            <span className="material-icons-round">close</span>
          </button>
        </div>
        {isLogin ? (
          <div className="user-box">
            <div className="profile">
              <img src={logo} alt="user profile" />
            </div>
            <div>
              <p>고양고양이</p>
              <Link to="/">
                마이페이지
                <span className="material-icons-round">navigate_next</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="login-box">
            <div className="material-icons-round">account_circle</div>
            <Link to="/">로그인</Link>
          </div>
        )}
        <ul className="depth-1">
          <li className="active">
            <Link to="/">식단일기</Link>
          </li>
          <li>
            <Link to="/">통계 보기</Link>
          </li>
          <li>
            <Link to="/">모아보기</Link>
            <ul className="depth-2">
              <li>
                <Link to="/">레시피</Link>
              </li>
              <li>
                <Link to="/">영양성분</Link>
              </li>
            </ul>
          </li>
        </ul>
      </StyledNav>
    </>
  )
}

export default Nav
