import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import CalendarPage from './Calendar'
import Stats from './Stats'

const DiaryCheck = () => {
  const [diaries, setDiaries] = useState<DataResponse | null>(null)

  const fetchData = () => {
    axios
      .get<DataResponse>('http://localhost:4000/diaries')
      .then((res) => setDiaries(res.data))
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <DiaryPageWrapper>
      <h2>나의 식단일기</h2>
      <ContainerWrapper>
        {diaries && (
          <>
            <CalendarPage diaries={diaries} />
            <Stats diaries={diaries} />
          </>
        )}
      </ContainerWrapper>
    </DiaryPageWrapper>
  )
}

export const DiaryPageWrapper = styled.div`
  h2 {
    font-size: 28px;
    margin-bottom: 20px;
  }
`

const ContainerWrapper = styled.div`
  display: flex;
`

export interface Diary {
  diaryId: string
  userDate: string
  diaryStatus: string
}

export interface Intake {
  carbohydrate: number
  protein: number
  fat: number
  kcal: number
  sugar: number
  [key: string]: number // 인덱스 시그니처 추가
}

export interface DataResponse {
  data: Diary[]
  standardIntake: Intake[]
  calcul: Intake[]
  comment: string
  pageInfo: {
    page: number
    size: number
    totalElements: number
    totalPages: number
  }
}

export default DiaryCheck
