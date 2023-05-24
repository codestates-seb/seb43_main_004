import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import CalendarPage from '../components/diary/Calendar'
import Stats from '../components/diary/Stats'
import { getCookie } from '../utils/Cookie'

const DiaryCheck = () => {
  const [diaries, setDiaries] = useState<DataResponse | null>(null)
  console.log(diaries)

  const fetchData = () => {
    axios
      .get<DataResponse>(
        `${process.env.REACT_APP_SERVER_URL}/diaries?page=1&size=1000`,
        {
          headers: {
            'Content-Type': 'application / json',
            'ngrok-skip-browser-warning': '69420',
            Authorization: `Bearer ${getCookie('access')}`,
          },
        }
      )
      .then((res) => setDiaries(res.data))
      .catch((err) => {
        console.log(err)
      })
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
  salt: number
  [key: string]: number // 인덱스 시그니처 추가
}

export interface DataResponse {
  data: Diary[]
  standardIntakes: Intake[]
  weekList: Intake[]
  comment: string
  pageInfo: {
    page: number
    size: number
    totalElements: number
    totalPages: number
  }
}

export default DiaryCheck
