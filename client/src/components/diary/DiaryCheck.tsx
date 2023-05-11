import React from 'react'
import styled from 'styled-components'
import CalendarPage from './Calendar'
import Stats from './Stats'

const DiaryPageWrapper = styled.div`
  max-width: 1250px;
  margin: 2rem auto;

  h2 {
    font-size: 28px;
    margin-bottom: 20px;
  }
`

const ContainerWrapper = styled.div`
  display: flex;
`

const DiaryCheck = () => {
  return (
    <DiaryPageWrapper>
      <h2>나의 식단일기</h2>
      <ContainerWrapper>
        <CalendarPage />
        <Stats />
      </ContainerWrapper>
    </DiaryPageWrapper>
  )
}

export default DiaryCheck
