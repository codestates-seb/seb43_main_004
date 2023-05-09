import React from 'react'
import styled from 'styled-components'

const FooterWrapper = styled.footer`
  font-weight: 500;
  font-size: 14px;
  width: 100%;
  background-color: var(--color-primary);
  height: 164px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  border: 1px solid black;

  p {
    margin-bottom: 5px;
  }
`

const Footer = () => {
  return (
    <FooterWrapper>
      <p>개발자</p>
      <p>프론트 : 선유준 이진하 박혜원</p>
      <p>백엔드 : 이용석 김석현 임채영</p>
      <p>Copyright 2023. 모개숲 all rights reserved.</p>
      <p>프로젝트 깃허브 바로가기</p>
    </FooterWrapper>
  )
}

export default Footer
