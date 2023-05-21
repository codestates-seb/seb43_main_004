import React from 'react'
import styled from 'styled-components'

const FooterWrapper = styled.footer`
  position: relative;
  height: 164px;
  font-weight: 500;
  font-size: 14px;
  width: 100%;
  background-color: var(--color-primary);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;

  p {
    margin-bottom: 5px;
  }

  p:first-child {
    margin-bottom: 9px;
  }

  a {
    font-size: 16px;
    font-weight: 700;
    transition: all 0.2s linear;
  }

  a:hover {
    transform: scale(1.1);
  }

  strong {
    font-weight: 700;
  }
`

const Footer = () => {
  return (
    <FooterWrapper>
      <p>
        <strong>개발자</strong>
      </p>
      <p>프론트 : 선유준 이진하 박혜원</p>
      <p>백엔드 : 이용석 김석현 임채영</p>
      <p>
        <strong>Copyright 2023 모개숲 all rights reserved</strong>
      </p>
      <br />
      <a
        href="https://github.com/codestates-seb/seb43_main_004"
        target="_blank"
        rel="noreferrer"
      >
        프로젝트 깃허브 바로가기
      </a>
    </FooterWrapper>
  )
}

export default Footer
