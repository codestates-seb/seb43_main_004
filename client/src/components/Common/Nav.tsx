import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { getCookie } from '../../utils/Cookie'
import { userLogout } from '../../utils/userfunc'
import Modal from './Modal'

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
    z-index: 99;
  }
`

const StyledNav = styled.nav`
  font-family: 'yg-jalnan';
  width: 50%;
  height: 100%;
  padding: 3rem 5rem;
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
    margin-bottom: 3rem;

    button {
      font-size: ${({ theme }) => theme.fontSize.lgh};
    }
  }

  .login-box,
  .user-box {
    display: flex;
    align-items: center;
    border-bottom: 1px solid ${({ theme }) => theme.color.darkGray};
    padding-bottom: 3rem;
    margin-bottom: 3rem;
    gap: 3rem;

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
      flex-shrink: 0;

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
      font-size: ${({ theme }) => theme.fontSize.larger};
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
    font-size: ${({ theme }) => theme.fontSize.smmh};

    li {
      margin-bottom: 3rem;
      word-break: keep-all;
    }

    a {
      display: inline-block;
      transition: 0.3s;
      &:hover {
        color: ${({ theme }) => theme.color.point};
      }
      &.active {
        color: ${({ theme }) => theme.color.point};
        border-bottom: 5px solid ${({ theme }) => theme.color.point};
      }
    }
  }

  @media ${({ theme }) => theme.device.tablet} {
    width: 90%;

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
        font-size: ${({ theme }) => theme.fontSize.middle};
      }
    }

    .depth-1 {
      font-size: ${({ theme }) => theme.fontSize.smh};

      li {
        margin-bottom: 2.5rem;
        a.active {
          border-bottom-width: 3px;
        }
      }
    }
  }

  @media ${({ theme }) => theme.device.mobile} {
    width: 90%;
    padding: 2rem 3rem;

    .btn-box {
      margin-bottom: 1rem;

      button {
        font-size: ${({ theme }) => theme.fontSize.mdh};
      }
    }

    .login-box,
    .user-box {
      padding-bottom: 1rem;
      margin-bottom: 2rem;
      gap: 1.5rem;
    }
  }
`

interface NavProps {
  menuOpen: boolean
  handleMenu(): void
}

interface userType {
  nickName: string
  icon: string
}

const Nav = ({ menuOpen, handleMenu }: NavProps) => {
  const navigate = useNavigate()
  const userInfo = useSelector((state: RootState) => state.profile.data)
  const [user, setUser] = useState<userType>({ nickName: '', icon: '' })
  const { nickName, icon } = user
  const [isLogin, setIsLogin] = useState(false)

  const logout = () => {
    userLogout()
    setIsLogin(false)
    navigate('/sign-in', { replace: true })
  }

  useEffect(() => {
    if (getCookie('access')) {
      setUser(userInfo)
      setIsLogin(true)
    }
  }, [userInfo])

  return (
    <>
      <StyledNavBg className={menuOpen ? 'open' : ''} onClick={handleMenu} />
      <StyledNav className={menuOpen ? 'open' : ''}>
        <div className="btn-box">
          {isLogin && (
            <button type="button" className="btn-logout" onClick={logout}>
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
              <img src={`/icons/${icon}.svg`} alt="user profile" />
            </div>
            <div>
              <p>{nickName}</p>
              <Link to="/userpage" onClick={handleMenu}>
                마이페이지
                <span className="material-icons-round">navigate_next</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="login-box">
            <div className="material-icons-round">account_circle</div>
            <Link to="/sign-in" onClick={handleMenu}>
              로그인
            </Link>
          </div>
        )}
        <ul className="depth-1">
          <li>
            <NavLink
              to={isLogin ? '/diaries' : '/sign-in'}
              onClick={handleMenu}
            >
              식단일기
            </NavLink>
          </li>
          {/* <li>
            <NavLink to="/community" onClick={handleMenu}>
              커뮤니티
            </NavLink>
          </li> */}
          <li>
            <NavLink to="/recipe" onClick={handleMenu}>
              레시피 아카이브
            </NavLink>
          </li>
          <li>
            <NavLink to="/nutrient" onClick={handleMenu}>
              영양성분 아카이브
            </NavLink>
          </li>
        </ul>
      </StyledNav>
    </>
  )
}

export default Nav
