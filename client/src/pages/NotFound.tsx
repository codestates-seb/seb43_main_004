import React from 'react'
import styled from 'styled-components'
import Button from '../components/Common/Button'
import { useNavigate, useParams } from 'react-router-dom'

const errorCase = [
  {
    code: '403',
    icon: 'error',
    title: '페이지에 접근할 수 없습니다.',
    msg: '해당 페이지를 볼 수 있는 권한을 가지고 있지 않습니다.',
  },
  {
    code: '404',
    icon: 'error',
    title: '요청하신 페이지를 찾을 수 없습니다.',
    msg: '입력한 주소가 잘못되었거나 요청하신 페이지의 주소가 삭제되어 찾을 수 없습니다. 서비스 이용에 불편을 드려 죄송합니다.',
  },
  {
    code: '500',
    icon: 'pending',
    title: '페이지를 표시할 수 없습니다.',
    msg: '서버의 일시적인 장애나 네트워크 문제로 인해 예상하지 못한 오류가 발생했습니다. 잠시 후에 다시 시도해 주세요.',
  },
]

const NotFound = () => {
  const { error } = useParams()
  const navigate = useNavigate()

  let code
  switch (error) {
    case undefined:
      code = errorCase[1]
      break
    case '403':
      code = errorCase[0]
      break
    case '404':
      code = errorCase[1]
      break
    case '500':
      code = errorCase[2]
      break
    default:
      code = errorCase[2]
  }

  return (
    <ErrorWrapper>
      <Icon className="material-symbols-outlined">{code.icon}</Icon>
      <h1>{code.title}</h1>
      <div>{code.msg}</div>
      <Button onClick={() => navigate(-1)}>이전으로</Button>
    </ErrorWrapper>
  )
}

const Icon = styled.span`
  font-size: 8rem;
  margin-bottom: 1.6rem;
`

const ErrorWrapper = styled.div`
  width: 55rem;
  text-align: center;

  h1 {
    font-size: ${(props) => props.theme.fontSize.smmh};
    margin: 1.5rem 0;
  }

  div {
    line-height: 2rem;
    margin: 1rem 0 1.6rem 0;
  }
`

export default NotFound
