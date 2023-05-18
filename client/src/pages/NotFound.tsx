import React from 'react'
import styled from 'styled-components'
import Button from '../components/Common/Button'
import { useNavigate } from 'react-router-dom'

interface Props {
  error: string
}

const NotFound = ({ error }: Props) => {
  const navigate = useNavigate()

  return (
    <ErrorWrapper>
      {error === '404' ? (
        <>
          <Icon className="material-symbols-outlined">error</Icon>
          <h1>404 error</h1>
          <div>
            죄송합니다. 페이지를 찾을 수 없습니다. <br />
            존재하지 않는 주소를 입력하셨거나 <br />
            요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.
          </div>
        </>
      ) : (
        <>
          <Icon className="material-symbols-outlined">pending</Icon>
          <h1>500 error</h1>
          <div>
            예상하지 못한 오류가 발생했습니다. <br />
            서버의 일시적인 장애이거나 네트워크 문제일 수 있습니다. <br />
            잠시 후에 다시 시도해 주세요.
          </div>
        </>
      )}
      <Button onClick={() => navigate(-1)}>이전으로</Button>
    </ErrorWrapper>
  )
}

const Icon = styled.span`
  font-size: 6rem;
`

const ErrorWrapper = styled.div`
  width: 50rem;
  text-align: center;

  h1 {
    font-size: ${(props) => props.theme.fontSize.smmh};
  }

  div {
    line-height: 2rem;
    margin: 1rem 0 1.4rem 0;
  }
`

export default NotFound
