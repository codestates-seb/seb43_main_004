import React from 'react'
import styled from 'styled-components'

interface propType {
  title: string
  children?: React.ReactNode
}

const TabFrame = ({ title, children }: propType) => {
  return (
    <Container>
      <h1>{title}</h1>
      <hr />
      <Wrapper>{children}</Wrapper>
    </Container>
  )
}

const Container = styled.div`
  h1 {
    font-size: ${(props) => props.theme.fontSize.smh};
  }
  hr {
    margin: 1.4rem 0;
    background: var(--color-light-gray);
    height: 1px;
    border: 0;
  }
`

const Wrapper = styled.div`
  min-height: 40rem;
`

export default TabFrame
