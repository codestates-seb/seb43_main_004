import React, { useState } from 'react'
import { styled } from 'styled-components'
import logo from '../../assets/logo.png'
import Nav from './Nav'

const StyledHeader = styled.header`
  background-color: ${({ theme }) => theme.color.primary};
  padding: 1rem;
  position: fixed;
  top: 0;
  z-index: 800;
  width: 100%;

  .container {
    max-width: 1250px;
    display: flex;
    align-items: center;
    margin: 0 auto;
  }

  .btn-menu {
    font-size: ${({ theme }) => theme.fontSize.mdh};
  }

  h1 {
    margin: 0 auto;

    img {
      display: block;
      width: 50%;
    }
  }

  @media ${({ theme }) => theme.device.mobile} {
    padding: 1rem;

    .btn-menu {
      font-size: ${({ theme }) => theme.fontSize.lgh};
    }

    h1 {
      width: 4rem;
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
      </StyledHeader>
      <Nav menuOpen={menuOpen} handleMenu={handleMenu} />
    </>
  )
}

export default Header
