import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import CalendarPage from '../components/diary/Calendar'
import Stats from '../components/diary/Stats'
import MobileCalendarPage from '../components/diary/MobileCalendar'
import MobileStats from '../components/diary/MobileStats'
import { getCookie } from '../utils/Cookie'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import { setScreenSize } from '../store/slices/screenSizeSlice'
import { debounce } from '../utils/timefunc'

const DiaryCheck = () => {
  const [diaries, setDiaries] = useState<DataResponse | null>(null)
  console.log(diaries)

  const windowWidth = useSelector((state: RootState) => state.screenSize.width)
  const dispatch = useDispatch()

  const fetchData = () => {
    axios
      .get<DataResponse>(
        `${process.env.REACT_APP_SERVER_URL}/diaries?page=1&size=1000`,
        {
          headers: {
            'Content-Type': 'application / json',
            Authorization: `Bearer ${getCookie('access')}`,
            'ngrok-skip-browser-warning': '69420',
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

  useEffect(() => {
    const handleResize = debounce(() => {
      dispatch(setScreenSize({ width: window.innerWidth }))
    }, 200)

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [dispatch])

  return (
    <DiaryPageWrapper>
      <h2>나의 식단일기</h2>
      <ContainerWrapper width={windowWidth}>
        {diaries &&
          (windowWidth > 560 ? (
            <>
              <CalendarPage diaries={diaries} />
              <Stats diaries={diaries} />
            </>
          ) : (
            <>
              <MobileCalendarPage diaries={diaries} />
              <MobileStats diaries={diaries} />
            </>
          ))}
      </ContainerWrapper>
    </DiaryPageWrapper>
  )
}

export const DiaryPageWrapper = styled.div`
  h2 {
    font-size: 28px;
    margin-bottom: 20px;
  }

  @media (max-width: 850px) {
    h2 {
      font-size: 22px;
    }
  }

  @media (max-width: 710px) {
    h2 {
      font-size: 18px;
    }
  }

  @media (max-width: 560px) {
    h2 {
      text-align: center;
    }
  }
`

const ContainerWrapper = styled.div<ContainerWrapperProps>`
  display: flex;

  ${({ width }) =>
    width <= 560 &&
    css`
      flex-direction: column;
      align-items: center;
    `}
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

interface ContainerWrapperProps {
  width: number
}

export default DiaryCheck
