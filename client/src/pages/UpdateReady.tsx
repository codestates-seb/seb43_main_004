import React from 'react'
import styled from 'styled-components'
import Button from '../components/Common/Button'
import { useNavigate } from 'react-router-dom'

const StyledUpdateReady = styled.div`
  text-align: center;
  margin: auto 0;

  .material-icons-round {
    font-size: ${({ theme }) => theme.fontSize.sml};
    margin-bottom: 3rem;
  }

  h2 {
    font-size: ${({ theme }) => theme.fontSize.smmh};
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 3rem;
    line-height: 1.5em;
  }
`

const UpdateReady = () => {
  const navigate = useNavigate()
  return (
    <StyledUpdateReady>
      <span className="material-icons-round">pending</span>
      <h2>준비중인 페이지 입니다.</h2>
      <p>
        현재 페이지는 업데이트 준비중입니다. <br />
        빠른 시일 내에 서비스를 제공할 수 있도록 하겠습니다.
      </p>
      <Button type="button" onClick={() => navigate(-1)}>
        이전으로
      </Button>
    </StyledUpdateReady>
  )
}

export default UpdateReady
