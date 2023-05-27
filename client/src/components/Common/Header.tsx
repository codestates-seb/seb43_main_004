import React, { useState } from 'react'
import { styled } from 'styled-components'
import logo from '../../assets/logo.png'
import { getCookie } from '../../utils/Cookie'
import Nav from './Nav'

const StyledHeader = styled.header`
  background-color: ${({ theme }) => theme.color.primary};
  padding: 1rem;
  position: fixed;
  top: 0;
  z-index: 9;
  width: 100%;
  height: 10rem;

  .container {
    max-width: 1250px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    position: relative;
  }

  .btn-menu {
    font-size: ${({ theme }) => theme.fontSize.lgh};
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
  }

  h1 {
    width: 10rem;

    img {
      display: block;
      width: 100%;
    }
  }

  @media ${({ theme }) => theme.device.tablet} {
    padding: 1rem;
    height: 6rem;

    h1 {
      width: 5rem;
    }
  }

  @media ${({ theme }) => theme.device.mobile} {
    .btn-menu {
      font-size: ${({ theme }) => theme.fontSize.mdh};
    }
  }
`

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const handleMenu = () => setMenuOpen(!menuOpen)

  return (
    <>
      <StyledHeader>
        <div className="container">
          <button className="btn-menu" onClick={handleMenu}>
            <span className="material-icons-round">menu</span>
          </button>
          <h1>
            <a href="/">
              <img src={logo} alt="logo" />
            </a>
          </h1>
        </div>
        <Nav menuOpen={menuOpen} handleMenu={handleMenu} />
      </StyledHeader>
    </>
  )
}

export default Header
