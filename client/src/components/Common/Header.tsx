import React, { useState } from 'react'
import { styled } from 'styled-components'
import logo from '../../assets/logo.png'
import Nav from './Nav'

const StyledHeader = styled.header`
  background-color: ${({ theme }) => theme.color.primary};
  padding: 2rem;
  position: fixed;
  top: 0;
  z-index: 800;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;

  .container {
    max-width: 1250px;
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

  @media ${({ theme }) => theme.device.mobile} {
    padding: 1rem;

    .btn-menu {
      font-size: ${({ theme }) => theme.fontSize.lgh};
    }

    h1 {
      width: 5rem;
    }
  }
`

const Header = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const handleMenu = () => setMenuOpen(!menuOpen)

  return (
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
  )
}

export default Header
